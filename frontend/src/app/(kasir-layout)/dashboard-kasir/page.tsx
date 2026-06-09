"use client";

import { useState, useMemo } from "react";
import useSWR, { useSWRConfig } from "swr";
import { fetcher } from "@/lib/fetcher";
import { ProductStockTable } from "@/components/dashboard/kasir/product-stock-table";
import { QuickAction } from "@/components/dashboard/kasir/quick-action";
import { RecentTransaction } from "@/components/dashboard/kasir/recent-transaction";
import { StatisticCards } from "@/components/dashboard/kasir/statistic-cards";
import { TransactionModal } from "@/components/dashboard/kasir/transaction-modal";
import { JasaModal } from "@/components/dashboard/kasir/jasa-modal";

export default function DashboardKasirPage() {
  const { mutate } = useSWRConfig();
  
  const [isProductOpen, setIsProductOpen] = useState(false);
  const [isJasaSelectOpen, setIsJasaSelectOpen] = useState(false);
  const [isJasaPaymentOpen, setIsJasaPaymentOpen] = useState(false);
  const [selectedJasa, setSelectedJasa] = useState<{name: string, price: number} | null>(null);

  const { data: productsData, isLoading: loadingProducts } = useSWR(
    "http://127.0.0.1:8000/api/products", fetcher, { refreshInterval: 5000 }
  );
  const { data: transactionsData, isLoading: loadingTransactions } = useSWR(
    "http://127.0.0.1:8000/api/transactions", fetcher, { refreshInterval: 5000 }
  );

  const products = Array.isArray(productsData) ? productsData : (productsData?.data || []);
  const transactions = Array.isArray(transactionsData) ? transactionsData : (transactionsData?.data || []);

 const stats = useMemo(() => {
  if (!transactions.length) {
    return {
      pendapatan: 0,
      jumlahTransaksi: 0,
      produkTerjual: 0,
      jasaMasuk: 0,
    };
  }

  const today =
    new Date()
      .toISOString()
      .split("T")[0];

  const todayTransactions =
    transactions.filter(
      (t: any) =>
        t.created_at?.startsWith(
          today,
        ),
    );

  const pendapatan =
    todayTransactions.reduce(
      (
        sum: number,
        t: any,
      ) =>
        sum +
        Number(
          t.total || 0,
        ),
      0,
    );

  const produkTerjual =
    todayTransactions
      .filter(
        (t: any) =>
          t.type ===
          "produk",
      )
      .reduce(
        (
          sum: number,
          t: any,
        ) => {
          const qty =
            (
              t.details ||
              []
            ).reduce(
              (
                subtotal: number,
                detail: any,
              ) =>
                subtotal +
                Number(
                  detail.quantity ||
                    0,
                ),
              0,
            );

          return (
            sum + qty
          );
        },
        0,
      );

  const jasaMasuk =
    todayTransactions.filter(
      (t: any) =>
        t.type === "jasa",
    ).length;

  return {
    pendapatan,
    jumlahTransaksi:
      todayTransactions.length,
    produkTerjual,
    jasaMasuk,
  };
}, [transactions]);

  const handleTransactionSuccess = () => {
    mutate("http://127.0.0.1:8000/api/products");
    mutate("http://127.0.0.1:8000/api/transactions");
    setIsProductOpen(false);
    setIsJasaPaymentOpen(false);
    setSelectedJasa(null);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Dashboard Kasir</h1>

      <StatisticCards 
        pendapatan={stats.pendapatan} 
        transaksi={stats.jumlahTransaksi} 
        produkTerjual={stats.produkTerjual} 
        jasaMasuk={stats.jasaMasuk} 
      />

      <QuickAction 
        onOpenTransaction={() => setIsProductOpen(true)} 
        onOpenJasa={() => setIsJasaSelectOpen(true)} 
      />

      {/* Modal Produk */}
      {isProductOpen && (
        <TransactionModal 
          mode="produk"
          products={products}
          onClose={() => setIsProductOpen(false)} 
          onSuccess={handleTransactionSuccess} 
        />
      )}

      {/* Modal Pemilihan Jasa */}
      {isJasaSelectOpen && (
        <JasaModal 
          onClose={() => setIsJasaSelectOpen(false)}
          onSelect={(jasa) => {
            setSelectedJasa(jasa);
            setIsJasaSelectOpen(false);
            setIsJasaPaymentOpen(true);
          }}
        />
      )}

      {/* Modal Pembayaran Jasa */}
      {isJasaPaymentOpen && selectedJasa && (
        <TransactionModal 
          mode="jasa"
          initialData={selectedJasa} 
          products={[]}
          onClose={() => {
            setIsJasaPaymentOpen(false);
            setSelectedJasa(null);
          }} 
          onSuccess={handleTransactionSuccess} 
        />
      )}

      <ProductStockTable products={products} isLoading={loadingProducts} />
      <RecentTransaction transactions={transactions} isLoading={loadingTransactions} />
    </div>
  );
}