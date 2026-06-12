"use client";

import { useEffect, useMemo, useState } from "react";

import Card from "@/components/ui/card";
import { formatRupiah } from "@/lib/format-rupiah";

const API_URL =
  "http://127.0.0.1:8000/api/transactions";

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
  const [search, setSearch] =
    useState("");

  const [statusFilter, setStatusFilter] =
    useState("Semua");

  const [loading, setLoading] =
    useState(true);

  const [transactions, setTransactions] =
    useState<TransactionType[]>([]);

  const [selectedTransaction, setSelectedTransaction] =
  useState<any>(null);

const [isDetailOpen, setIsDetailOpen] =
  useState(false);

  useEffect(() => {
    fetchTransactions();
  }, []);

  const handleDetail = async (
  id: number,
) => {

  try {
    const response =
      await fetch(
        `${API_URL}/${id}`,
      );

    const data =
      await response.json();

      console.log(data);

    setSelectedTransaction(
      data,
    );

    setIsDetailOpen(true);
  } catch (error) {
    console.error(
      "Gagal mengambil detail transaksi:",
      error,
    );

    alert(
      "Gagal mengambil detail transaksi",
    );
  }
};

  const fetchTransactions =
    async () => {
      try {
        setLoading(true);

        const response =
          await fetch(API_URL, {
            cache: "no-store",
          });

        const data =
          await response.json();

        const mappedData =
          data.map((trx: any) => {
            const detail =
              trx.details?.[0];

            return {
              id: trx.id,

              invoice:
                trx.invoice_number,

              kasir:
                trx.cashier_name ||
                "Kasir Utama",

              produk:
                detail?.product?.nama ||
                detail?.jasa_name ||
                "-",

              metode:
                trx.payment_method ||
                "-",

              total: Number(
                trx.total,
              ),

              status:
                trx.status,

              tanggal:
                new Date(
                  trx.created_at,
                ).toLocaleDateString(
                  "id-ID",
                  {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  },
                ),
            };
          });

        setTransactions(
          mappedData,
        );
      } catch (error) {
        console.error(
          "Gagal mengambil riwayat transaksi:",
          error,
        );
      } finally {
        setLoading(false);
      }
    };

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

      <Card className="border border-gray-200 bg-white dark:border-white/10 dark:bg-[#0F172A]">
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
          onChange={(
            e: React.ChangeEvent<HTMLSelectElement>,
          ) => {
            setStatusFilter(
              e.target.value,
            );
          }}
          className="
            rounded-2xl
            border
            border-gray-200
            bg-gray-100
            px-4
            py-3
            text-gray-900

            dark:border-white/10
            dark:bg-[#1E293B]
            dark:text-white
          ">
          <option value="Semua">
            Semua
          </option>

          <option value="Selesai">
            Selesai
          </option>

          <option value="Pending">
            Pending
          </option>

          <option value="Dibatalkan">
            Dibatalkan
          </option>
        </select>
        </div>

        <div className="-mx-6 overflow-x-auto">
          <div className="min-w-[1000px] px-6">
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
                {loading ? (
                  <tr>
                    <td
                      colSpan={8}
                      className="py-10 text-center text-white">
                      Loading...
                    </td>
                  </tr>
                ) : filteredTransactions.length ===
                  0 ? (
                  <tr>
                    <td
                      colSpan={8}
                      className="py-10 text-center text-white">
                      Tidak ada data
                    </td>
                  </tr>
                ) : (
                  filteredTransactions.map(
                    (item) => (
                      <tr
                        key={item.id}
                        className="border-b border-gray-200 dark:border-white/5">
                        <td className="py-5 font-semibold text-white">
                          {
                            item.invoice
                          }
                        </td>

                        <td className="py-5 text-gray-300">
                          {item.kasir}
                        </td>

                        <td className="py-5 text-gray-300">
                          {
                            item.produk
                          }
                        </td>

                        <td className="py-5 text-gray-300">
                          {
                            item.metode
                          }
                        </td>

                        <td className="py-5 font-semibold text-white">
                          {formatRupiah(
                            item.total,
                          )}
                        </td>

                        <td className="py-5">
                          <span
                            className={`rounded-full px-3 py-1 text-xs font-semibold ${
                              item.status ===
                              "Selesai"
                                ? "bg-green-100 text-green-600 dark:bg-green-500/20 dark:text-green-400"
                                : item.status ===
                                    "Pending"
                                  ? "bg-yellow-100 text-yellow-600 dark:bg-yellow-500/20 dark:text-yellow-400"
                                  : "bg-red-100 text-red-600 dark:bg-red-500/20 dark:text-red-400"
                            }`}>
                            {
                              item.status
                            }
                          </span>
                        </td>

                        <td className="py-5 text-gray-300">
                          {
                            item.tanggal
                          }
                        </td>

                        <td className="py-5">
                      <button
                        onClick={() =>
                          handleDetail(
                            item.id,
                          )
                        }
                        className="
                          rounded-xl
                          bg-sky-100
                          px-4
                          py-2
                          text-sm
                          font-medium
                          text-sky-600

                          dark:bg-sky-500/20
                          dark:text-sky-400
                        ">
                        Detail
                      </button>
                        </td>
                      </tr>
                    ),
                  )
                )}
              </tbody>
            </table>
          </div>
        </div>
        {isDetailOpen &&
          selectedTransaction && (
            <div
              className="
                fixed
                inset-0
                z-50
                flex
                items-center
                justify-center
                bg-black/70
                p-4
              ">
            <div
              className="
                w-full
                max-w-5xl
                max-h-[90vh]
                overflow-y-auto
                rounded-3xl
                  border
                  border-white/10
                  bg-[#0F172A]
                  shadow-2xl
                ">
                {/* HEADER */}
                <div
                  className="
                    flex
                    items-center
                    justify-between
                    border-b
                    border-white/10
                    px-8
                    py-5
                  ">
                  <div>
                    <h2 className="text-2xl font-bold text-white">
                      Detail Transaksi
                    </h2>

                    <p className="mt-1 text-sm text-gray-400">
                      Informasi lengkap transaksi
                    </p>
                  </div>

                  <button
                    onClick={() =>
                      setIsDetailOpen(false)
                    }
                    className="
                      rounded-xl
                      bg-white/5
                      px-4
                      py-2
                      text-gray-400
                      hover:bg-white/10
                      hover:text-white
                    ">
                    ✕
                  </button>
                </div>

                {/* CONTENT */}
                <div className="p-8">
                  {/* INFO */}
                  <div className="grid gap-5 md:grid-cols-2">

                    <div className="rounded-2xl border border-white/10 bg-[#1E293B] p-5">
                      <p className="mb-2 text-sm text-gray-400">
                        Invoice
                      </p>

                      <h3 className="text-lg font-bold text-white">
                        {
                          selectedTransaction.invoice_number
                        }
                      </h3>
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-[#1E293B] p-5">
                      <p className="mb-2 text-sm text-gray-400">
                        Customer
                      </p>

                      <h3 className="text-lg font-bold text-white">
                        {selectedTransaction.customer_name || "-"}
                      </h3>
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-[#1E293B] p-5">
                      <p className="mb-2 text-sm text-gray-400">
                        Metode Pembayaran
                      </p>

                      <h3 className="text-lg font-bold text-white capitalize">
                        {
                          selectedTransaction.payment_method
                        }
                      </h3>
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-[#1E293B] p-5">
                      <p className="mb-2 text-sm text-gray-400">
                        Status
                      </p>

                      <span
                        className={`rounded-full px-4 py-2 text-sm font-semibold ${
                          selectedTransaction.status ===
                          "Selesai"
                            ? "bg-green-500/20 text-green-400"
                            : selectedTransaction.status ===
                                "Pending"
                              ? "bg-yellow-500/20 text-yellow-400"
                              : "bg-red-500/20 text-red-400"
                        }`}>
                        {
                          selectedTransaction.status
                        }
                      </span>
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-[#1E293B] p-5">
                      <p className="mb-2 text-sm text-gray-400">
                        Total Pembayaran
                      </p>

                      <h3 className="text-2xl font-bold text-sky-400">
                        {formatRupiah(
                          Number(
                            selectedTransaction.total
                          )
                        )}
                      </h3>
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-[#1E293B] p-5">
                      <p className="mb-2 text-sm text-gray-400">
                        Tanggal Transaksi
                      </p>

                      <h3 className="text-lg font-semibold text-white">
                        {new Date(
                          selectedTransaction.created_at
                        ).toLocaleString(
                          "id-ID"
                        )}
                      </h3>
                    </div>
                  </div>

                  {/* DETAIL ITEM */}
                  <div className="mt-8">
                    <h3 className="mb-4 text-xl font-bold text-white">
                      Detail Produk
                    </h3>

                    <div className="overflow-x-auto rounded-2xl border border-white/10">
                      <table className="min-w-[700px] w-full">
                        <thead className="bg-[#1E293B]">
                          <tr>
                            <th className="px-5 py-4 text-left text-sm text-gray-400">
                              Produk
                            </th>

                            <th className="px-5 py-4 text-left text-sm text-gray-400">
                              Qty
                            </th>

                            <th className="px-5 py-4 text-left text-sm text-gray-400">
                              Harga
                            </th>

                            <th className="px-5 py-4 text-left text-sm text-gray-400">
                              Subtotal
                            </th>
                          </tr>
                        </thead>

                        <tbody>
                          {selectedTransaction.items?.map(
                            (
                              item: any,
                              index: number
                            ) => (
                              <tr
                                key={index}
                                className="border-t border-white/10">
                                  
                                <td className="px-5 py-4">
                                <div>
                                  <p className="font-medium text-white">
                                    {item.nama}
                                  </p>

                                  <p className="mt-1 text-xs text-gray-400">
                                    SKU: {item.sku}
                                  </p>
                                </div>
                              </td>

                                <td className="px-5 py-4 text-gray-300">
                                  {item.qty}
                                </td>

                                <td className="px-5 py-4 text-gray-300">
                                  {formatRupiah(
                                    Number(item.harga)
                                  )}
                                </td>

                                <td className="px-5 py-4 font-semibold text-sky-400">
                                  {formatRupiah(
                                    Number(item.qty) *
                                    Number(item.harga)
                                  )}
                                </td>
                              </tr>
                            )
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        )}
      </Card>
    </div>
    
  );
}