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
            trx.items?.[0];
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
                detail?.sku || "-",

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
                trx.created_at
              ).toLocaleString("id-ID", {
                day: "2-digit",
                month: "long",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              }),
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

    console.log(data);

    setDetailData(data);
    setShowDetail(true);

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
            w-full
            md:w-auto
            rounded-xl
            bg-sky-500
            px-5
            py-3
            font-semibold
            text-white
            transition
            hover:bg-sky-600
          "
        >
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

{/* MOBILE + TABLET */}
<div className="grid gap-4 xl:hidden">
  {loading ? (
    <Card>
      <p className="text-center text-gray-500 dark:text-gray-400">
        Loading...
      </p>
    </Card>
  ) : filteredTransactions.length === 0 ? (
    <Card>
      <p className="text-center text-gray-500 dark:text-gray-400">
        Belum ada transaksi
      </p>
    </Card>
  ) : (
    filteredTransactions.map((item) => (
      <Card
        key={item.id}
        className="
          border
          border-gray-200
          bg-white
          shadow-sm
          dark:border-white/10
          dark:bg-[#0F172A]
        "
      >
        <div className="space-y-4">

          <div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">
              {item.invoice}
            </h3>

            <p className="text-sm text-gray-500 dark:text-gray-400">
              Dana Stockroom
            </p>
          </div>

          <div className="space-y-3">

            <div className="flex justify-between border-b border-gray-200 pb-2 dark:border-white/5">
              <span className="text-gray-500 dark:text-gray-400">
                Customer
              </span>

              <span className="font-medium text-gray-900 dark:text-white">
                {item.customer}
              </span>
            </div>

            <div className="flex justify-between border-b border-gray-200 pb-2 dark:border-white/5">
              <span className="text-gray-500 dark:text-gray-400">
                Produk
              </span>

              <span className="font-medium text-right text-gray-900 dark:text-white">
                {item.produk}
              </span>
            </div>

            <div className="flex justify-between border-b border-gray-200 pb-2 dark:border-white/5">
              <span className="text-gray-500 dark:text-gray-400">
                Merk
              </span>

              <span className="text-gray-900 dark:text-white">
                {item.merk}
              </span>
            </div>

            <div className="flex justify-between border-b border-gray-200 pb-2 dark:border-white/5">
              <span className="text-gray-500 dark:text-gray-400">
                Kategori
              </span>

              <span className="text-gray-900 dark:text-white">
                {item.kategori}
              </span>
            </div>

            <div className="flex justify-between border-b border-gray-200 pb-2 dark:border-white/5">
              <span className="text-gray-500 dark:text-gray-400">
                Size
              </span>

              <span className="text-gray-900 dark:text-white">
                {item.size}
              </span>
            </div>

            <div className="flex justify-between border-b border-gray-200 pb-2 dark:border-white/5">
              <span className="text-gray-500 dark:text-gray-400">
                Metode
              </span>

              <span className="text-gray-900 dark:text-white uppercase">
                {item.metode}
              </span>
            </div>

            <div className="flex justify-between border-b border-gray-200 pb-2 dark:border-white/5">
              <span className="text-gray-500 dark:text-gray-400">
                Total
              </span>

              <span className="font-bold text-green-600 dark:text-green-400">
                {formatRupiah(item.total)}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-500 dark:text-gray-400">
                Tanggal
              </span>

              <span className="text-right text-gray-700 dark:text-gray-300">
                {item.tanggal}
              </span>
            </div>

          </div>

          <div className="flex flex-col gap-3">

            <span
              className={`w-fit rounded-full px-3 py-1 text-xs font-semibold ${
                item.status === "Selesai"
                  ? "bg-green-100 text-green-600 dark:bg-green-500/20 dark:text-green-400"
                  : item.status === "Pending"
                  ? "bg-yellow-100 text-yellow-600 dark:bg-yellow-500/20 dark:text-yellow-400"
                  : "bg-red-100 text-red-600 dark:bg-red-500/20 dark:text-red-400"
              }`}
            >
              {item.status}
            </span>

            <div className="grid grid-cols-2 gap-3">

              <button
                onClick={() => handleDetail(item.id)}
                className="
                  rounded-xl
                  bg-sky-500
                  py-2.5
                  font-medium
                  text-white
                "
              >
                Detail
              </button>

              <button
                onClick={() =>
                  handleDeleteTransaction(
                    item.id,
                    item.invoice
                  )
                }
                className="
                  rounded-xl
                  bg-red-500
                  py-2.5
                  font-medium
                  text-white
                "
              >
                Hapus
              </button>

            </div>

          </div>

        </div>
      </Card>
    ))
  )}
</div>

{/* DESKTOP */}
<div className="hidden xl:block">
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
        ]}
      >
        {loading ? (
          <tr>
            <td
              colSpan={11}
              className="py-10 text-center text-gray-500 dark:text-gray-400"
            >
              Loading...
            </td>
          </tr>
        ) : filteredTransactions.length === 0 ? (
          <tr>
            <td
              colSpan={11}
              className="py-10 text-center text-gray-500 dark:text-gray-400"
            >
              Belum ada transaksi
            </td>
          </tr>
        ) : (
          filteredTransactions.map((item) => (
            <tr
              key={item.id}
              className="border-b border-gray-200 dark:border-white/5"
            >
              <td className="whitespace-nowrap py-5">
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">
                    {item.invoice}
                  </p>

                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    Dana Stockroom
                  </p>
                </div>
              </td>

              <td className="whitespace-nowrap py-5 text-gray-700 dark:text-gray-300">
                {item.customer}
              </td>

              <td className="py-5 text-gray-700 dark:text-gray-300">
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

              <td className="whitespace-nowrap py-5 font-semibold text-gray-700 dark:text-gray-300">
                {formatRupiah(item.total)}
              </td>

              <td className="whitespace-nowrap py-5 text-gray-700 dark:text-gray-300 uppercase">
                {item.metode}
              </td>

              <td className="whitespace-nowrap py-5">
                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${
                    item.status === "Selesai"
                      ? "bg-green-100 text-green-600 dark:bg-green-500/20 dark:text-green-400"
                      : item.status === "Pending"
                      ? "bg-yellow-100 text-yellow-600 dark:bg-yellow-500/20 dark:text-yellow-400"
                      : "bg-red-100 text-red-600 dark:bg-red-500/20 dark:text-red-400"
                  }`}
                >
                  {item.status}
                </span>
              </td>

              <td className="whitespace-nowrap py-5 text-gray-700 dark:text-gray-300">
                {item.tanggal}
              </td>

              <td className="whitespace-nowrap py-5">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleDetail(item.id)}
                    className="
                      rounded-lg
                      bg-sky-100
                      px-4
                      py-2
                      text-sm
                      font-medium
                      text-sky-600
                      hover:bg-sky-200
                      dark:bg-sky-500/20
                      dark:text-sky-400
                    "
                  >
                    Detail
                  </button>

                  <button
                    onClick={() =>
                      handleDeleteTransaction(
                        item.id,
                        item.invoice
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
                      hover:bg-red-200
                      dark:bg-red-500/20
                      dark:text-red-400
                    "
                  >
                    Hapus
                  </button>
                </div>
              </td>
            </tr>
          ))
        )}
      </DataTable>
    </div>
  </div>
</div>
      </Card>
      {showDetail && detailData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div
            className="
              w-full
              max-w-5xl
              max-h-[90vh]
              overflow-y-auto
              rounded-3xl
              bg-white
              p-4
              md:p-6
              shadow-2xl
              dark:bg-[#0F172A]
            "
          >
            
            <div className="mb-6 flex items-center justify-between border-b border-gray-200 pb-4 dark:border-white/10">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                Detail Transaksi
              </h2>

              <button
                onClick={() => setShowDetail(false)}
                className="rounded-xl px-3 py-1 text-2xl text-gray-500 hover:bg-gray-100 dark:hover:bg-white/10"
              >
                ×
              </button>
            </div>

            {/* INFO TRANSAKSI */}
            <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2">
              
              <div className="rounded-2xl border border-gray-200 p-4 dark:border-white/10">
                <p className="mb-3 text-sm font-semibold text-gray-500">
                  Informasi Transaksi
                </p>

                <div className="space-y-3">
                  <div className="flex flex-col gap-1 sm:flex-row sm:justify-between">
                    <span className="text-gray-500">Invoice</span>
                    <span className="font-semibold text-slate-900 dark:text-white">
                      {detailData.invoice_number}
                    </span>
                  </div>

                  <div className="flex flex-col gap-1 sm:flex-row sm:justify-between">
                    <span className="text-gray-500">Customer</span>
                    <span className="font-semibold text-slate-900 dark:text-white">
                      {detailData.customer_name || "Pelanggan Umum"}
                    </span>
                  </div>

                  <div className="flex flex-col gap-1 sm:flex-row sm:justify-between">
                    <span className="text-gray-500">Status</span>

                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        detailData.status === "Selesai"
                          ? "bg-green-100 text-green-600 dark:bg-green-500/20 dark:text-green-400"
                          : detailData.status === "Pending"
                          ? "bg-yellow-100 text-yellow-600 dark:bg-yellow-500/20 dark:text-yellow-400"
                          : "bg-red-100 text-red-600 dark:bg-red-500/20 dark:text-red-400"
                      }`}
                    >
                      {detailData.status}
                    </span>
                  </div>

                  <div className="flex flex-col gap-1 sm:flex-row sm:justify-between">
                    <span className="text-gray-500">Metode Bayar</span>
                    <span className="font-semibold capitalize text-slate-900 dark:text-white">
                      {detailData.payment_method || "-"}
                    </span>
                  </div>

                  <div className="flex flex-col gap-1 sm:flex-row sm:justify-between">
                    <span className="text-gray-500">Tanggal & Waktu</span>

                    <span className="font-semibold text-slate-900 dark:text-white">
                      {new Date(
                        detailData.created_at
                      ).toLocaleString("id-ID", {
                        day: "2-digit",
                        month: "long",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                        second: "2-digit",
                      })}{" "}
                      WIB
                    </span>
                  </div>
                </div>
              </div>

              {/* TOTAL */}
              <div className="rounded-2xl border border-sky-200 bg-sky-50 p-4 dark:border-sky-500/20 dark:bg-sky-500/10">
                <p className="mb-3 text-sm font-semibold text-sky-600">
                  Ringkasan Pembayaran
                </p>

                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span>Total Transaksi</span>

                    <span className="text-lg sm:text-2xl font-bold text-sky-600">
                      {formatRupiah(
                        Number(detailData.total)
                      )}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span>Jumlah Item</span>

                    <span className="font-semibold">
                      {detailData.items?.length || 0}
                    </span>
                  </div>
                </div>
              </div>
            </div>

{/* DETAIL ITEM */}
<div className="overflow-hidden rounded-2xl border border-gray-200 dark:border-white/10">

  {/* DESKTOP TABLE */}
  <div className="hidden md:block overflow-x-auto">
    <table className="w-full">
      <thead>
        <tr className="bg-gray-50 dark:bg-white/5">
          <th className="px-4 py-4 text-left">
            Produk / Jasa
          </th>

          <th className="px-4 py-4 text-center">
            Qty
          </th>

          <th className="px-4 py-4 text-right">
            Harga
          </th>

          <th className="px-4 py-4 text-right">
            Subtotal
          </th>
        </tr>
      </thead>

      <tbody>
        {detailData.items?.length > 0 ? (
          detailData.items.map(
            (
              detail: any,
              index: number,
            ) => (
              <tr
                key={index}
                className="border-t border-gray-200 dark:border-white/10"
              >
                <td className="px-4 py-4">
                  <div>
                    <p className="font-semibold text-slate-900 dark:text-white">
                      {detail.nama}
                    </p>

                    <p className="text-xs text-gray-500">
                      {detail.sku || "-"}
                    </p>
                  </div>
                </td>

                <td className="px-4 py-4 text-center">
                  {detail.qty}
                </td>

                <td className="px-4 py-4 text-right">
                  {formatRupiah(
                    Number(detail.harga),
                  )}
                </td>

                <td className="px-4 py-4 text-right font-semibold">
                  {formatRupiah(
                    Number(detail.harga) *
                      Number(detail.qty),
                  )}
                </td>
              </tr>
            ),
          )
        ) : (
          <tr>
            <td
              colSpan={4}
              className="py-6 text-center text-gray-500"
            >
              Tidak ada detail transaksi
            </td>
          </tr>
        )}
      </tbody>
    </table>
  </div>

  {/* MOBILE CARD */}
  <div className="space-y-3 p-4 md:hidden">
    {detailData.items?.length > 0 ? (
      detailData.items.map(
        (
          detail: any,
          index: number,
        ) => (
          <div
            key={index}
            className="
              rounded-xl
              border
              border-gray-200
              p-4
              dark:border-white/10
            "
          >
            <div className="mb-3">
              <p className="font-semibold text-slate-900 dark:text-white">
                {detail.nama}
              </p>

              <p className="text-xs text-gray-500">
                {detail.sku || "-"}
              </p>
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Qty</span>
                <span>{detail.qty}</span>
              </div>

              <div className="flex justify-between">
                <span>Harga</span>
                <span>
                  {formatRupiah(
                    Number(detail.harga),
                  )}
                </span>
              </div>

              <div className="flex justify-between font-semibold">
                <span>Subtotal</span>
                <span>
                  {formatRupiah(
                    Number(detail.harga) *
                      Number(detail.qty),
                  )}
                </span>
              </div>
            </div>
          </div>
        ),
      )
    ) : (
      <div className="py-6 text-center text-gray-500">
        Tidak ada detail transaksi
      </div>
    )}
  </div>
</div>

            {/* FOOTER */}
            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setShowDetail(false)}
                className="
                  rounded-xl
                  bg-sky-500
                  px-6
                  py-3
                  font-semibold
                  text-white
                  transition
                  hover:bg-sky-600
                "
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}