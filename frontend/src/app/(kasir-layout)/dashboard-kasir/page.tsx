"use client";

import { useState, useMemo } from "react";
import useSWR, { useSWRConfig } from "swr";
import { fetcher } from "@/lib/fetcher";
import { CompactJasaForm } from "@/components/dashboard/kasir/compact-jasa-form";
import { ProductStockTable } from "@/components/dashboard/kasir/product-stock-table";
import { QuickAction } from "@/components/dashboard/kasir/quick-action";
import { RecentTransaction } from "@/components/dashboard/kasir/recent-transaction";
import { StatisticCards } from "@/components/dashboard/kasir/statistic-cards";
import { TransactionModal } from "@/components/dashboard/kasir/transaction-modal";

export default function DashboardKasirPage() {
  const { mutate } = useSWRConfig();
  const [isTransactionOpen, setIsTransactionOpen] = useState(false);

  const { data: productsData, isLoading: loadingProducts } = useSWR(
    "http://127.0.0.1:8000/api/products", 
    fetcher, 
    { refreshInterval: 5000 }
  );

  const { data: transactionsData, isLoading: loadingTransactions } = useSWR(
    "http://127.0.0.1:8000/api/transactions", 
    fetcher, 
    { refreshInterval: 5000 }
  );

  const products = Array.isArray(productsData) ? productsData : (productsData?.data || []);
  const transactions = Array.isArray(transactionsData) ? transactionsData : (transactionsData?.data || []);

  // LOGIKA HITUNG STATISTIK (Dinamis berdasarkan data hari ini)
  const stats = useMemo(() => {
    const today = new Date().toISOString().split('T')[0];
    const todayTransactions = transactions.filter((t: any) => 
      t.created_at?.startsWith(today)
    );

    const pendapatan = todayTransactions.reduce((sum: number, t: any) => sum + Number(t.total || 0), 0);
    const jumlahTransaksi = todayTransactions.length;
    
    const produkTerjual = todayTransactions.reduce((sum: number, t: any) => {
      const itemsCount = t.items?.reduce((itemSum: number, item: any) => itemSum + (item.quantity || 0), 0) || 0;
      return sum + itemsCount;
    }, 0);

    // Asumsi: Transaksi memiliki field 'type' ('produk' atau 'jasa')
    const jasaMasuk = todayTransactions.filter((t: any) => t.type === 'jasa').length;

    return { pendapatan, jumlahTransaksi, produkTerjual, jasaMasuk };
  }, [transactions]);

  const handleTransactionSuccess = () => {
    mutate("http://127.0.0.1:8000/api/products");
    mutate("http://127.0.0.1:8000/api/transactions");
    setIsTransactionOpen(false);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Dashboard Kasir</h1>
        <p className="mt-2 text-gray-500 dark:text-gray-400">Kelola transaksi dan aktivitas kasir Dana Stockroom</p>
      </div>

      <StatisticCards 
        pendapatan={stats.pendapatan}
        transaksi={stats.jumlahTransaksi}
        produkTerjual={stats.produkTerjual}
        jasaMasuk={stats.jasaMasuk}
      />

      <QuickAction 
        onOpenTransaction={() => setIsTransactionOpen(true)} 
        onOpenJasa={() => console.log("Jasa Modal...")} 
      />

      {isTransactionOpen && (
        <TransactionModal 
          onClose={() => setIsTransactionOpen(false)} 
          onSuccess={handleTransactionSuccess}
          products={products}
        />
      )}

      <ProductStockTable products={products} isLoading={loadingProducts} />
      <RecentTransaction transactions={transactions} isLoading={loadingTransactions} />
      <CompactJasaForm />
    </div>
  );
}