"use client";

import { useMemo, useState } from "react";

import Card from "@/components/ui/card";
import { formatRupiah } from "@/lib/format-rupiah";

type TransactionType = {
  id: number;
  invoice: string;
  kasir: string;
  produk: string;
  metode: string;
  total: number;
  status: string;
  tanggal: string;
};

export default function RiwayatTransaksiKasirPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] =
    useState("Semua");

  const [transactions] =
    useState<TransactionType[]>([
      {
        id: 1,
        invoice: "INV-001",
        kasir: "Kasir A",
        produk: "Nike Air Force 1",
        metode: "QRIS",
        total: 3700000,
        status: "Selesai",
        tanggal: "20 Mei 2026",
      },

      {
        id: 2,
        invoice: "INV-002",
        kasir: "Kasir B",
        produk: "Adidas Samba",
        metode: "Cash",
        total: 1650000,
        status: "Pending",
        tanggal: "20 Mei 2026",
      },

      {
        id: 3,
        invoice: "INV-003",
        kasir: "Kasir A",
        produk: "New Balance 530",
        metode: "Transfer",
        total: 2100000,
        status: "Dibatalkan",
        tanggal: "19 Mei 2026",
      },

      {
        id: 4,
        invoice: "INV-004",
        kasir: "Kasir C",
        produk: "Converse High",
        metode: "QRIS",
        total: 950000,
        status: "Selesai",
        tanggal: "19 Mei 2026",
      },
    ]);

  /* =========================
     FILTER
  ========================= */
  const filteredTransactions =
    useMemo(() => {
      return transactions.filter(
        (item) => {
          const searchMatch =
            item.invoice
              .toLowerCase()
              .includes(
                search.toLowerCase(),
              ) ||
            item.kasir
              .toLowerCase()
              .includes(
                search.toLowerCase(),
              ) ||
            item.produk
              .toLowerCase()
              .includes(
                search.toLowerCase(),
              );

          const statusMatch =
            statusFilter ===
              "Semua" ||
            item.status ===
              statusFilter;

          return (
            searchMatch &&
            statusMatch
          );
        },
      );
    }, [
      transactions,
      search,
      statusFilter,
    ]);

  /* =========================
     STATS
  ========================= */
  const selesaiCount =
    transactions.filter(
      (item) =>
        item.status ===
        "Selesai",
    ).length;

  const pendingCount =
    transactions.filter(
      (item) =>
        item.status ===
        "Pending",
    ).length;

  const cancelCount =
    transactions.filter(
      (item) =>
        item.status ===
        "Dibatalkan",
    ).length;

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Riwayat Transaksi
        </h1>

        <p className="mt-2 text-gray-500 dark:text-gray-400">
          Histori transaksi
          berdasarkan kasir
          bertugas
        </p>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-4">
        <Card className="border border-gray-200 bg-white dark:border-white/10 dark:bg-[#0F172A]">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Total Riwayat
          </p>

          <h3 className="mt-3 text-3xl font-bold text-gray-900 dark:text-white">
            {transactions.length}
          </h3>
        </Card>

        <Card className="border border-gray-200 bg-white dark:border-white/10 dark:bg-[#0F172A]">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Selesai
          </p>

          <h3 className="mt-3 text-3xl font-bold text-green-500">
            {selesaiCount}
          </h3>
        </Card>

        <Card className="border border-gray-200 bg-white dark:border-white/10 dark:bg-[#0F172A]">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Pending
          </p>

          <h3 className="mt-3 text-3xl font-bold text-yellow-500">
            {pendingCount}
          </h3>
        </Card>

        <Card className="border border-gray-200 bg-white dark:border-white/10 dark:bg-[#0F172A]">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Dibatalkan
          </p>

          <h3 className="mt-3 text-3xl font-bold text-red-500">
            {cancelCount}
          </h3>
        </Card>
      </div>

      {/* TABLE */}
      <Card className="border border-gray-200 bg-white dark:border-white/10 dark:bg-[#0F172A]">
        {/* SEARCH + FILTER */}
        <div className="mb-6 flex flex-col gap-4 lg:flex-row">
          <input
            type="text"
            placeholder="Cari invoice, kasir, produk..."
            value={search}
            onChange={(e) =>
              setSearch(
                e.target.value,
              )
            }
            className="
              flex-1
              rounded-2xl
              border
              border-gray-200
              bg-gray-100
              px-4
              py-3
              text-gray-900
              outline-none
              focus:border-sky-500

              dark:border-white/10
              dark:bg-[#1E293B]
              dark:text-white
            "
          />

          <select
            value={statusFilter}
            onChange={(e) =>
              setStatusFilter(
                e.target.value,
              )
            }
            className="
              rounded-2xl
              border
              border-gray-200
              bg-gray-100
              px-4
              py-3
              text-gray-900
              outline-none

              dark:border-white/10
              dark:bg-[#1E293B]
              dark:text-white
            ">
            <option>
              Semua
            </option>
            <option>
              Selesai
            </option>
            <option>
              Pending
            </option>
            <option>
              Dibatalkan
            </option>
          </select>
        </div>

        {/* TABLE */}
        <div className="-mx-6 overflow-x-auto">
          <div className="min-w-[1100px] px-6">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 dark:border-white/10">
                  <th className="pb-4 text-left text-sm text-gray-500">
                    Invoice
                  </th>

                  <th className="pb-4 text-left text-sm text-gray-500">
                    Kasir Bertugas
                  </th>

                  <th className="pb-4 text-left text-sm text-gray-500">
                    Produk
                  </th>

                  <th className="pb-4 text-left text-sm text-gray-500">
                    Metode
                  </th>

                  <th className="pb-4 text-left text-sm text-gray-500">
                    Total
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
                {filteredTransactions.map(
                  (item) => (
                    <tr
                      key={item.id}
                      className="border-b border-gray-200 dark:border-white/5">
                      <td className="py-5 font-semibold text-gray-900 dark:text-white">
                        {
                          item.invoice
                        }
                      </td>

                      <td className="py-5 text-gray-700 dark:text-gray-300">
                        {
                          item.kasir
                        }
                      </td>

                      <td className="py-5 text-gray-700 dark:text-gray-300">
                        {
                          item.produk
                        }
                      </td>

                      <td className="py-5 text-gray-700 dark:text-gray-300">
                        {
                          item.metode
                        }
                      </td>

                      <td className="py-5 font-semibold text-gray-900 dark:text-white">
                        {formatRupiah(
                          item.total,
                        )}
                      </td>

                      <td className="py-5">
                        <span
                          className={`
                            rounded-full
                            px-3
                            py-1
                            text-xs
                            font-semibold
                            ${
                              item.status ===
                              "Selesai"
                                ? "bg-green-100 text-green-600 dark:bg-green-500/20 dark:text-green-400"
                                : item.status ===
                                    "Pending"
                                  ? "bg-yellow-100 text-yellow-600 dark:bg-yellow-500/20 dark:text-yellow-400"
                                  : "bg-red-100 text-red-600 dark:bg-red-500/20 dark:text-red-400"
                            }
                          `}>
                          {
                            item.status
                          }
                        </span>
                      </td>

                      <td className="py-5 text-gray-700 dark:text-gray-300">
                        {
                          item.tanggal
                        }
                      </td>

                      <td className="py-5">
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
                            Cetak Ulang
                          </button>
                        </div>
                      </td>
                    </tr>
                  ),
                )}
              </tbody>
            </table>
          </div>
        </div>
      </Card>
    </div>
  );
}