"use client";

import { useEffect, useMemo, useState } from "react";

import Card from "@/components/ui/card";
import DataTable from "@/components/tabel/data-table";
import { formatRupiah } from "@/lib/format-rupiah";

const API_URL =
  "http://127.0.0.1:8000/api/transactions";

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

export default function TransaksiPage() {
  const [search, setSearch] = useState("");

  const [transactions, setTransactions] =
    useState<TransactionType[]>([]);

  const [loading, setLoading] =
    useState(true);

    const [showDetail, setShowDetail] =
  useState(false);

const [detailData, setDetailData] =
  useState<any>(null);

  useEffect(() => {
    fetchTransactions();
  }, []);

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

              customer:
                trx.customer_name ||
                "Pelanggan Umum",

              produk:
                detail?.product?.nama ||
                detail?.jasa_name ||
                "-",

              merk:
                detail?.product?.merk ||
                "-",

              kategori:
                detail?.product?.kategori ||
                (trx.type === "jasa"
                  ? "Jasa"
                  : "-"),

              size:
                detail?.product?.size ||
                "-",

              total: Number(
                trx.total,
              ),

              metode:
                trx.payment_method ||
                "-",

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
          "Gagal mengambil transaksi:",
          error,
        );
      } finally {
        setLoading(false);
      }
    };

  const filteredTransactions =
    useMemo(() => {
      return transactions.filter(
        (item) =>
          item.invoice
            .toLowerCase()
            .includes(
              search.toLowerCase(),
            ) ||
          item.customer
            .toLowerCase()
            .includes(
              search.toLowerCase(),
            ) ||
          item.produk
            .toLowerCase()
            .includes(
              search.toLowerCase(),
            ) ||
          item.merk
            .toLowerCase()
            .includes(
              search.toLowerCase(),
            ),
      );
    }, [transactions, search]);

  const handleDeleteTransaction =
  
    async (
      id: number,
      invoice: string,
    ) => {
      const confirmDelete =
        confirm(
          `Hapus transaksi ${invoice}?`,
        );

      if (!confirmDelete)
        return;

      try {
        const response =
          await fetch(
            `${API_URL}/${id}`,
            {
              method: "DELETE",
            },
          );

        if (!response.ok) {
          throw new Error(
            "Gagal menghapus transaksi",
          );
        }

        setTransactions((prev) =>
          prev.filter(
            (item) =>
              item.id !== id,
          ),
        );

        alert(
          "Transaksi berhasil dihapus",
        );
      } catch (error) {
        console.error(error);

        alert(
          "Gagal menghapus transaksi",
        );
      }
    };
    const handleDetail = async (
  id: number,
) => {
  try {
    const response =
      await fetch(
        `${API_URL}/${id}`,
        {
          cache: "no-store",
        },
      );

    if (!response.ok) {
      throw new Error(
        "Gagal mengambil detail transaksi",
      );
    }

    const data =
      await response.json();

    setDetailData(data);

    setShowDetail(true);

  } catch (error) {
    console.error(error);

    alert(
      "Gagal mengambil detail transaksi",
    );
  }
};

  return (
    <div className="w-full overflow-hidden">
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Transaksi Penjualan
          </h1>

          <p className="mt-2 text-gray-500 dark:text-gray-400">
            Kelola semua data transaksi Dana
            Stockroom
          </p>
        </div>

        <button
          className="
            rounded-xl
            bg-sky-500
            px-5
            py-3
            font-semibold
            text-white
            transition
            hover:bg-sky-600
          ">
          + Tambah Transaksi
        </button>
      </div>

      <Card className="overflow-hidden border border-gray-200 bg-white shadow-sm dark:border-white/10 dark:bg-[#0F172A]">
        <div className="mb-6">
          <input
            type="text"
            placeholder="Cari invoice, customer, produk..."
            value={search}
            onChange={(e) =>
              setSearch(
                e.target.value,
              )
            }
            className="
              w-full
              rounded-xl
              border
              border-gray-200
              bg-gray-100
              px-4
              py-3
              text-gray-900
              placeholder:text-gray-500
              outline-none
              transition
              focus:border-sky-500

              dark:border-white/10
              dark:bg-[#1E293B]
              dark:text-white
              dark:placeholder:text-gray-400
            "
          />
        </div>

        <div className="w-full overflow-x-auto overflow-y-hidden pb-2">
          <div className="min-w-[1200px]">
            <DataTable
              headers={[
                "Invoice",
                "Customer",
                "Produk",
                "Merk",
                "Kategori",
                "Size",
                "Total",
                "Metode",
                "Status",
                "Tanggal",
                "Action",
              ]}>
              {loading ? (
                <tr>
                  <td
                    colSpan={11}
                    className="py-10 text-center text-white">
                    Loading...
                  </td>
                </tr>
              ) : filteredTransactions.length ===
                0 ? (
                <tr>
                  <td
                    colSpan={11}
                    className="py-10 text-center text-white">
                    Belum ada transaksi
                  </td>
                </tr>
              ) : (
                filteredTransactions.map(
                  (item) => (
                    <tr
                      key={item.id}
                      className="border-b border-gray-200 dark:border-white/5">
                      <td className="whitespace-nowrap py-5">
                        <div>
                          <p className="font-semibold text-gray-900 dark:text-white">
                            {
                              item.invoice
                            }
                          </p>

                          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                            Dana
                            Stockroom
                          </p>
                        </div>
                      </td>

                      <td className="whitespace-nowrap py-5 text-gray-700 dark:text-gray-300">
                        {
                          item.customer
                        }
                      </td>

                      <td className="whitespace-nowrap py-5 font-medium text-gray-700 dark:text-gray-300">
                        {item.produk}
                      </td>

                      <td className="whitespace-nowrap py-5 text-gray-700 dark:text-gray-300">
                        {item.merk}
                      </td>

                      <td className="whitespace-nowrap py-5 text-gray-700 dark:text-gray-300">
                        {
                          item.kategori
                        }
                      </td>

                      <td className="whitespace-nowrap py-5 text-gray-700 dark:text-gray-300">
                        {item.size}
                      </td>

                      <td className="whitespace-nowrap py-5 font-semibold text-gray-700 dark:text-gray-300">
                        {formatRupiah(
                          item.total,
                        )}
                      </td>

                      <td className="whitespace-nowrap py-5 text-gray-700 dark:text-gray-300">
                        {
                          item.metode
                        }
                      </td>

                      <td className="whitespace-nowrap py-5">
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

                      <td className="whitespace-nowrap py-5 text-gray-700 dark:text-gray-300">
                        {
                          item.tanggal
                        }
                      </td>

                      <td className="whitespace-nowrap py-5">
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() =>
                              handleDetail(item.id)
                            }
                            className="
                              rounded-lg
                              bg-sky-100
                              px-4
                              py-2
                              text-sm
                              font-medium
                              text-sky-600
                              transition
                              hover:bg-sky-200

                              dark:bg-sky-500/20
                              dark:text-sky-400
                              dark:hover:bg-sky-500/30
                            ">
                            Detail
                          </button>
                              <button
                            onClick={() =>
                              handleDeleteTransaction(
                                item.id,
                                item.invoice,
                              )
                            }
                            className="
                              rounded-lg
                              bg-red-100
                              px-4
                              py-2
                              text-sm
                              font-medium
                              text-red-600
                              transition
                              hover:bg-red-200

                              dark:bg-red-500/20
                              dark:text-red-400
                              dark:hover:bg-red-500/30
                            ">
                            Hapus
                          </button>
                        </div>
                      </td>
                    </tr>
                  ),
                )
              )}
            </DataTable>
          </div>
        </div>
      </Card>
      {showDetail && detailData && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
    <div className="w-full max-w-3xl rounded-2xl bg-white p-6 dark:bg-[#0F172A]">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
          Detail Transaksi
        </h2>

        <button
          onClick={() =>
            setShowDetail(false)
          }
          className="text-2xl text-gray-500">
          ×
        </button>
      </div>

      <div className="mb-6 grid gap-2">
        <p>
          <strong>Invoice:</strong>{" "}
          {detailData.invoice_number}
        </p>

        <p>
          <strong>Customer:</strong>{" "}
          {detailData.customer_name}
        </p>

        <p>
          <strong>Status:</strong>{" "}
          {detailData.status}
        </p>

        <p>
          <strong>Total:</strong>{" "}
          {formatRupiah(
            Number(detailData.total),
          )}
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200 dark:border-white/10">
              <th className="py-3 text-left">
                Produk / Jasa
              </th>

              <th className="py-3 text-left">
                Qty
              </th>

              <th className="py-3 text-left">
                Harga
              </th>

              <th className="py-3 text-left">
                Subtotal
              </th>
            </tr>
          </thead>

          <tbody>
            {detailData.details?.map(
              (detail: any) => (
                <tr
                  key={detail.id}
                  className="border-b border-gray-200 dark:border-white/5">
                  <td className="py-3">
                    {detail.product?.nama ||
                      detail.jasa_name}
                  </td>

                  <td className="py-3">
                    {detail.quantity}
                  </td>

                  <td className="py-3">
                    {formatRupiah(
                      Number(
                        detail.price,
                      ),
                    )}
                  </td>

                  <td className="py-3">
                    {formatRupiah(
                      Number(
                        detail.price,
                      ) *
                        Number(
                          detail.quantity,
                        ),
                    )}
                  </td>
                </tr>
              ),
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-6 flex justify-end">
        <button
          onClick={() =>
            setShowDetail(false)
          }
          className="
            rounded-xl
            bg-sky-500
            px-5
            py-2
            font-semibold
            text-white
          ">
          Tutup
            </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}