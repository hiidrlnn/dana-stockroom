"use client";

import { useMemo, useState } from "react";

import Card from "@/components/ui/card";
import { formatRupiah } from "@/lib/format-rupiah";

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

  const [transactions] = useState<TransactionType[]>([
    {
      id: 1,
      invoice: "INV-001",
      customer: "Dirlan",
      produk: "Air Force 1",
      merk: "Nike",
      kategori: "Sneakers",
      size: "42",
      total: 3700000,
      metode: "QRIS",
      status: "Selesai",
      tanggal: "20 Mei 2026",
    },

    {
      id: 2,
      invoice: "INV-002",
      customer: "Andi",
      produk: "Samba",
      merk: "Adidas",
      kategori: "Casual",
      size: "41",
      total: 1650000,
      metode: "Cash",
      status: "Pending",
      tanggal: "20 Mei 2026",
    },

    {
      id: 3,
      invoice: "INV-003",
      customer: "Budi",
      produk: "530",
      merk: "New Balance",
      kategori: "Running",
      size: "43",
      total: 2100000,
      metode: "Transfer",
      status: "Selesai",
      tanggal: "19 Mei 2026",
    },
  ]);

  /* =========================
     FILTER
  ========================= */
  const filteredTransactions = useMemo(() => {
    return transactions.filter(
      (item) =>
        item.invoice.toLowerCase().includes(search.toLowerCase()) ||
        item.customer.toLowerCase().includes(search.toLowerCase()) ||
        item.produk.toLowerCase().includes(search.toLowerCase()) ||
        item.merk.toLowerCase().includes(search.toLowerCase()),
    );
  }, [transactions, search]);

  /* =========================
     STATS
  ========================= */
  const totalPendapatan = transactions.reduce(
    (acc, item) => acc + item.total,
    0,
  );

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Transaksi Penjualan
          </h1>

          <p className="mt-2 text-gray-500 dark:text-gray-400">
            Kelola transaksi penjualan kasir Dana Stockroom
          </p>
        </div>

        <button
          className="
            rounded-2xl
            bg-sky-500
            px-5
            py-3
            font-semibold
            text-white
            transition
            hover:bg-sky-600
          ">
          + Transaksi Baru
        </button>
      </div>

      {/* STATISTICS */}
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
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Pendapatan
          </p>

          <h3 className="mt-3 text-3xl font-bold text-gray-900 dark:text-white">
            {formatRupiah(totalPendapatan)}
          </h3>
        </Card>

        <Card className="border border-gray-200 bg-white dark:border-white/10 dark:bg-[#0F172A]">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Transaksi Hari Ini
          </p>

          <h3 className="mt-3 text-3xl font-bold text-gray-900 dark:text-white">
            12
          </h3>
        </Card>
      </div>

      {/* TABLE */}
      <Card className="border border-gray-200 bg-white dark:border-white/10 dark:bg-[#0F172A]">
        {/* SEARCH */}
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

        {/* RESPONSIVE TABLE */}
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

                  <th className="pb-4 text-left text-sm text-gray-500">
                    Merk
                  </th>

                  <th className="pb-4 text-left text-sm text-gray-500">
                    Kategori
                  </th>

                  <th className="pb-4 text-left text-sm text-gray-500">
                    Size
                  </th>

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

                  <th className="pb-4 text-left text-sm text-gray-500">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody>
                {filteredTransactions.map((item) => (
                  <tr
                    key={item.id}
                    className="border-b border-gray-200 dark:border-white/5">
                    <td className="whitespace-nowrap py-5 font-semibold text-gray-900 dark:text-white">
                      {item.invoice}
                    </td>

                    <td className="whitespace-nowrap py-5 text-gray-700 dark:text-gray-300">
                      {item.customer}
                    </td>

                    <td className="whitespace-nowrap py-5 font-medium text-gray-700 dark:text-gray-300">
                      {item.produk}
                    </td>

                    <td className="whitespace-nowrap py-5 text-gray-700 dark:text-gray-300">
                      {item.merk}
                    </td>

                    <td className="whitespace-nowrap py-5 text-gray-700 dark:text-gray-300">
                      {item.kategori}
                    </td>

                    <td className="whitespace-nowrap py-5 text-gray-700 dark:text-gray-300">
                      {item.size}
                    </td>

                    <td className="whitespace-nowrap py-5 font-semibold text-gray-900 dark:text-white">
                      {formatRupiah(item.total)}
                    </td>

                    <td className="whitespace-nowrap py-5 text-gray-700 dark:text-gray-300">
                      {item.metode}
                    </td>

                    <td className="whitespace-nowrap py-5">
                      <span
                        className={`
                          rounded-full
                          px-3
                          py-1
                          text-xs
                          font-semibold

                          ${
                            item.status === "Selesai"
                              ? "bg-green-100 text-green-600 dark:bg-green-500/20 dark:text-green-400"
                              : "bg-yellow-100 text-yellow-600 dark:bg-yellow-500/20 dark:text-yellow-400"
                          }
                        `}>
                        {item.status}
                      </span>
                    </td>

                    <td className="whitespace-nowrap py-5 text-gray-700 dark:text-gray-300">
                      {item.tanggal}
                    </td>

                    <td className="whitespace-nowrap py-5">
                      <div className="flex items-center gap-3">
                        <button
                          className="
                            rounded-xl
                            bg-sky-100
                            px-4
                            py-2
                            text-sm
                            font-medium
                            text-sky-600
                            hover:bg-sky-200

                            dark:bg-sky-500/20
                            dark:text-sky-400
                          ">
                          Detail
                        </button>

                        <button
                          className="
                            rounded-xl
                            bg-green-100
                            px-4
                            py-2
                            text-sm
                            font-medium
                            text-green-600
                            hover:bg-green-200

                            dark:bg-green-500/20
                            dark:text-green-400
                          ">
                          Cetak
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Card>
    </div>
  );
}