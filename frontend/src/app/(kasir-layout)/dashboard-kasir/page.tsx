import { QuickAction } from "@/components/dashboard/kasir/quick-action";
import { RecentTransaction } from "@/components/dashboard/kasir/recent-transaction";
import { SalesChart } from "@/components/dashboard/kasir/sales-chart";
import { StatisticCards } from "@/components/dashboard/kasir/statistic-cards";

export default function DashboardKasirPage() {
  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Dashboard Kasir
        </h1>

        <p className="mt-2 text-gray-500 dark:text-gray-400">
          Kelola transaksi dan aktivitas kasir Dana Stockroom
        </p>
      </div>

      {/* CARD STATISTIC */}
      <StatisticCards />

      {/* QUICK ACTION */}
      <QuickAction />

      {/* GRID */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-12">
        <div className="xl:col-span-7">
          <RecentTransaction />
        </div>

        <div className="xl:col-span-5">
          <SalesChart />
        </div>
      </div>
    </div>
  );
}