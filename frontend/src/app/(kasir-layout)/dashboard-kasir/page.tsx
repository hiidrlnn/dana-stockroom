import { CompactJasaForm } from "@/components/dashboard/kasir/compact-jasa-form";
import { ProductStockTable } from "@/components/dashboard/kasir/product-stock-table";
import { QuickAction } from "@/components/dashboard/kasir/quick-action";
import { RecentTransaction } from "@/components/dashboard/kasir/recent-transaction";
import { StatisticCards } from "@/components/dashboard/kasir/statistic-cards";

export default function DashboardKasirPage() {
  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
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

      {/* STOCK PRODUK */}
      <ProductStockTable />

      {/* TRANSAKSI HARI INI */}
      <RecentTransaction />

      {/* INPUT JASA CEPAT */}
      <CompactJasaForm />
    </div>
  );
}