"use client";

import { useEffect, useMemo, useState } from "react";

import Card from "@/components/ui/card";
import { formatRupiah } from "@/lib/format-rupiah";

const API_URL = "http://127.0.0.1:8000/api/transactions";

type TransactionType = {
  id: number;
  invoice: string;
  customer: string;

  produk: string;
  merk: string;
  kategori: string;
  size: string;

  total: number;
  metode: string;
  status: string;
  tanggal: string;
};

export default function TransaksiPenjualanKasirPage() {
  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(true);

  const [transactions, setTransactions] = useState<TransactionType[]>([]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/immutability
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      setLoading(true);

      const response = await fetch(API_URL, {
        cache: "no-store",
      });

      const data = await response.json();

      const mappedData =
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        data.map((trx: any) => {
          const detail = trx.details?.[0];

          return {
            id: trx.id,

            invoice: trx.invoice_number,

            customer: trx.customer_name || "Pelanggan Umum",

            produk: detail?.product?.nama || detail?.jasa_name || "-",

            merk: detail?.product?.merk || "-",

            kategori:
              detail?.product?.kategori || (trx.type === "jasa" ? "Jasa" : "-"),

            size: detail?.product?.size || "-",

            total: Number(trx.total),

            metode: trx.payment_method || "-",

            status: trx.status,

            tanggal: new Date(trx.created_at).toLocaleDateString("id-ID", {
              day: "2-digit",
              month: "long",
              year: "numeric",
            }),
          };
        });

      setTransactions(mappedData);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const filteredTransactions = useMemo(() => {
    return transactions.filter(
      (item) =>
        item.invoice.toLowerCase().includes(search.toLowerCase()) ||
        item.customer.toLowerCase().includes(search.toLowerCase()) ||
        item.produk.toLowerCase().includes(search.toLowerCase()) ||
        item.merk.toLowerCase().includes(search.toLowerCase()),
    );
  }, [transactions, search]);

  const totalPendapatan = transactions.reduce(
    (acc, item) => acc + item.total,
    0,
  );

  const transaksiHariIni = transactions.filter(
    (item) =>
      item.tanggal ===
      new Date().toLocaleDateString("id-ID", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }),
  ).length;

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Transaksi Penjualan
        </h1>

        <p className="mt-2 text-gray-500 dark:text-gray-400">
          Kelola transaksi penjualan kasir Dana Stockroom
        </p>
      </div>

      {/* STATISTIC */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        <Card className="border border-gray-200 bg-white dark:border-white/10 dark:bg-[#0F172A]">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Total Transaksi
          </p>

          <h3 className="mt-3 text-3xl font-bold text-gray-900 dark:text-white">
            {transactions.length}
          </h3>
        </Card>

        <Card className="border border-gray-200 bg-white dark:border-white/10 dark:bg-[#0F172A]">
          <p className="text-sm text-gray-500 dark:text-gray-400">Pendapatan</p>

          <h3 className="mt-3 text-3xl font-bold text-gray-900 dark:text-white">
            {formatRupiah(totalPendapatan)}
          </h3>
        </Card>

        <Card className="border border-gray-200 bg-white dark:border-white/10 dark:bg-[#0F172A]">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Transaksi Hari Ini
          </p>

          <h3 className="mt-3 text-3xl font-bold text-gray-900 dark:text-white">
            {transaksiHariIni}
          </h3>
        </Card>
      </div>

      {/* TABLE */}
      <Card className="border border-gray-200 bg-white dark:border-white/10 dark:bg-[#0F172A]">
        <div className="mb-6">
          <input
            type="text"
            placeholder="Cari invoice, customer, produk..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="
              w-full
              rounded-2xl
              border
              border-gray-200
              bg-gray-100
              px-4
              py-3
              text-gray-900
              outline-none
              transition
              focus:border-sky-500

              dark:border-white/10
              dark:bg-[#1E293B]
              dark:text-white
            "
          />
        </div>

        <div className="-mx-6 overflow-x-auto">
          <div className="min-w-[1200px] px-6">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 dark:border-white/10">
                  <th className="pb-4 text-left text-sm text-gray-500">
                    Invoice
                  </th>
                  <th className="pb-4 text-left text-sm text-gray-500">
                    Customer
                  </th>
                  <th className="pb-4 text-left text-sm text-gray-500">
                    Produk
                  </th>
                  <th className="pb-4 text-left text-sm text-gray-500">Merk</th>
                  <th className="pb-4 text-left text-sm text-gray-500">
                    Kategori
                  </th>
                  <th className="pb-4 text-left text-sm text-gray-500">Size</th>
                  <th className="pb-4 text-left text-sm text-gray-500">
                    Total
                  </th>
                  <th className="pb-4 text-left text-sm text-gray-500">
                    Metode
                  </th>
                  <th className="pb-4 text-left text-sm text-gray-500">
                    Status
                  </th>
                  <th className="pb-4 text-left text-sm text-gray-500">
                    Tanggal
                  </th>
                </tr>
              </thead>

              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={10} className="py-10 text-center text-white">
                      Loading...
                    </td>
                  </tr>
                ) : (
                  filteredTransactions.map((item) => (
                    <tr
                      key={item.id}
                      className="border-b border-gray-200 dark:border-white/5"
                    >
                      <td className="py-5 font-semibold text-white">
                        {item.invoice}
                      </td>

                      <td className="py-5 text-gray-300">{item.customer}</td>

                      <td className="py-5 text-gray-300">{item.produk}</td>

                      <td className="py-5 text-gray-300">{item.merk}</td>

                      <td className="py-5 text-gray-300">{item.kategori}</td>

                      <td className="py-5 text-gray-300">{item.size}</td>

                      <td className="py-5 font-semibold text-white">
                        {formatRupiah(item.total)}
                      </td>

                      <td className="py-5 text-gray-300">{item.metode}</td>

                      <td className="py-5">
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-semibold ${
                            item.status === "Selesai"
                              ? "bg-green-100 text-green-600 dark:bg-green-500/20 dark:text-green-400"
                              : "bg-yellow-100 text-yellow-600 dark:bg-yellow-500/20 dark:text-yellow-400"
                          }`}
                        >
                          {item.status}
                        </span>
                      </td>

                      <td className="py-5 text-gray-300">{item.tanggal}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </Card>
    </div>
  );
}
