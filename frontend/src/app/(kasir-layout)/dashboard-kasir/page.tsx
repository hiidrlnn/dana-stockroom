"use client";

import { useMemo, useState } from "react";

import useSWR, { useSWRConfig } from "swr";

import { fetcher } from "@/lib/fetcher";

import { StatisticCards } from "@/components/dashboard/kasir/statistic-cards";
import { QuickAction } from "@/components/dashboard/kasir/quick-action";
import { ProductStockTable } from "@/components/dashboard/kasir/product-stock-table";
import { RecentTransaction } from "@/components/dashboard/kasir/recent-transaction";

import { TransactionModal } from "@/components/dashboard/kasir/transaction-modal";
import { JasaModal } from "@/components/dashboard/kasir/jasa-modal";

export default function DashboardKasirPage() {
  const { mutate } = useSWRConfig();

  const [isProductOpen, setIsProductOpen] = useState(false);

  const [isJasaSelectOpen, setIsJasaSelectOpen] = useState(false);

  const [isJasaPaymentOpen, setIsJasaPaymentOpen] = useState(false);

  const [selectedJasa, setSelectedJasa] = useState<{
    name: string;
    price: number;
  } | null>(null);

  const { data: productsData, isLoading: loadingProducts } = useSWR(
    "http://127.0.0.1:8000/api/products",
    fetcher,
    {
      refreshInterval: 5000,
    },
  );

  const { data: transactionsData, isLoading: loadingTransactions } = useSWR(
    "http://127.0.0.1:8000/api/transactions",
    fetcher,
    {
      refreshInterval: 5000,
    },
  );

  const products = Array.isArray(productsData)
    ? productsData
    : productsData?.data || [];

  const transactions = Array.isArray(transactionsData)
    ? transactionsData
    : transactionsData?.data || [];

  const stats = useMemo(() => {
    if (!transactions.length) {
      return {
        pendapatan: 0,
        jumlahTransaksi: 0,
        produkTerjual: 0,
        jasaMasuk: 0,
      };
    }

    const today = new Date().toISOString().split("T")[0];

    const todayTransactions = transactions.filter((t: any) =>
      t.created_at?.startsWith(today),
    );

    const pendapatan = todayTransactions.reduce(
      (sum: number, t: any) => sum + Number(t.total || 0),
      0,
    );

    const produkTerjual = todayTransactions
      .filter((t: any) => t.type === "produk")
      .reduce((sum: number, t: any) => {
        const qty = (t.details || []).reduce(
          (subtotal: number, detail: any) =>
            subtotal + Number(detail.quantity || 0),
          0,
        );

        return sum + qty;
      }, 0);

    const jasaMasuk = todayTransactions.filter(
      (t: any) => t.type === "jasa",
    ).length;

    return {
      pendapatan,
      jumlahTransaksi: todayTransactions.length,
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
    <div
      className="
        relative
        z-0

        w-full
        max-w-full

        space-y-4
        sm:space-y-6
      "
    >
      {/* TITLE */}
      <div>
        <h1
          className="
            text-2xl
            font-bold

            text-slate-900

            sm:text-3xl

            dark:text-white
          "
        >
          Dashboard Kasir
        </h1>

        <p
          className="
            mt-1
            text-sm
            text-gray-500

            dark:text-gray-400
          "
        >
          Monitoring transaksi dan stok produk.
        </p>
      </div>

      {/* STATISTIC */}
      <StatisticCards
        pendapatan={stats.pendapatan}
        transaksi={stats.jumlahTransaksi}
        produkTerjual={stats.produkTerjual}
        jasaMasuk={stats.jasaMasuk}
      />

      {/* QUICK ACTION */}
      <QuickAction
        onOpenTransaction={() => setIsProductOpen(true)}
        onOpenJasa={() => setIsJasaSelectOpen(true)}
      />

      {/* STOCK */}
      <ProductStockTable products={products} isLoading={loadingProducts} />

      {/* TRANSACTION */}
      <RecentTransaction
        transactions={transactions}
        isLoading={loadingTransactions}
      />

      {/* MODAL PRODUK */}
      {isProductOpen && (
        <TransactionModal
          mode="produk"
          products={products}
          onClose={() => setIsProductOpen(false)}
          onSuccess={handleTransactionSuccess}
        />
      )}

      {/* MODAL PILIH JASA */}
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

      {/* MODAL PEMBAYARAN JASA */}
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
    </div>
  );
}
