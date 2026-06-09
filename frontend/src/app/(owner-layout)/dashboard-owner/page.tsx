"use client";

import React, { useEffect, useState } from "react";
import StatisticCards from "@/components/dashboard/owner/statistic-cards";
import RecentActivity from "@/components/dashboard/owner/recent-activity";
import SalesChart from "@/components/dashboard/owner/sales-chart";
import { MaintenanceAlert } from "@/components/dashboard/owner/maintenance-alert";

interface DashboardData {
today_transactions: number;
today_revenue: number;
today_products_sold: number;
today_services: number;
}

export default function DashboardOwnerPage() {
const [dashboard, setDashboard] = useState<DashboardData>({
today_transactions: 0,
today_revenue: 0,
today_products_sold: 0,
today_services: 0,
});

const fetchDashboard = async () => {
try {
const response = await fetch(
"http://127.0.0.1:8000/api/dashboard"
);


  const result = await response.json();

  setDashboard({
    today_transactions: result.today_transactions ?? 0,
    today_revenue: result.today_revenue ?? 0,
    today_products_sold: result.today_products_sold ?? 0,
    today_services: result.today_services ?? 0,
  });
} catch (error) {
  console.error("Gagal mengambil data dashboard:", error);
}


};

useEffect(() => {
fetchDashboard();


const interval = setInterval(() => {
  fetchDashboard();
}, 5000);

return () => clearInterval(interval);


}, []);

return ( <div className="space-y-6 p-6"> <div> <MaintenanceAlert />


    <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
      Dashboard Owner
    </h1>

    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
      Kelola transaksi dan aktivitas owner Dana Stockroom
    </p>
  </div>

  <StatisticCards
    pendapatan={dashboard.today_revenue}
    transaksi={dashboard.today_transactions}
    produkTerjual={dashboard.today_products_sold}
    jasaMasuk={dashboard.today_services}
  />

  <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
    <div className="lg:col-span-2">
      <RecentActivity />
    </div>

    <div className="lg:col-span-1">
      <SalesChart />
    </div>
  </div>
</div>


);
}
