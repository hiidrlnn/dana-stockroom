"use client";

import React from "react";
import StatisticCards from "@/components/dashboard/owner/statistic-cards";
import QuickAction from "@/components/dashboard/owner/quick-action";
import RecentActivity from "@/components/dashboard/owner/recent-activity";
import SalesChart from "@/components/dashboard/owner/sales-chart";

export default function DashboardOwnerPage() {
  return (
    <div className="space-y-6 p-6">
      {/* HEADER JUDUL */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
          Dashboard Owner
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Kelola transaksi dan aktivitas owner Dana Stockroom
        </p>
      </div>

      {/* 4 CARD STATISTIK */}
      <StatisticCards />

      {/* QUICK ACTIONS */}
      <QuickAction />

      {/* GRID DUA KOLOM: TABEL TRANSAKSI & GRAFIK MINGGUAN */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
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