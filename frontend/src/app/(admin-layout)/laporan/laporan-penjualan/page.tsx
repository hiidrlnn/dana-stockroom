"use client";

import { useEffect, useMemo, useState } from "react";

import Card from "@/components/ui/card";

import DataTable from "@/components/tabel/data-table";

import { formatRupiah } from "@/lib/format-rupiah";

import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

type ReportType = {
  id: number;
  invoice: string;
  customer: string;
  produk: string;
  metode: string;
  total: number;
  status: string;
  tanggal: string;
  jam: string;
};

export default function LaporanPenjualanPage() {
  const [search, setSearch] = useState("");
  const [reports, setReports] = useState<ReportType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/transactions");

        const data = await response.json();

        const transformed = data.map((item: any) => {
          const date = new Date(item.created_at);

          return {
            id: item.id,
            invoice: item.invoice_number,
            customer: item.customer_name,

            produk:
              item.items?.length > 0
                ? item.items.map((p: any) => p.nama).join(", ")
                : "-",

            metode: item.payment_method?.toUpperCase(),

            total: Number(item.total) || 0,

            status: item.status,

            tanggal: date.toLocaleDateString("id-ID", {
              day: "2-digit",
              month: "long",
              year: "numeric",
            }),

            jam: date.toLocaleTimeString("id-ID", {
              hour: "2-digit",
              minute: "2-digit",
            }),
          };
        });

        setReports(transformed);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  /* =========================
     FILTER
  ========================= */
  const filteredReports = useMemo(() => {
    return reports.filter(
      (item) =>
        item.invoice.toLowerCase().includes(search.toLowerCase()) ||
        item.customer.toLowerCase().includes(search.toLowerCase()) ||
        item.produk.toLowerCase().includes(search.toLowerCase()),
    );
  }, [reports, search]);

  /* =========================
     SUMMARY
  ========================= */
  const totalPendapatan = reports
    .filter((item) => item.status === "Selesai")
    .reduce((acc, item) => acc + Number(item.total || 0), 0);

  const totalTransaksi = reports.length;

  const totalPending = reports.filter(
    (item) => item.status === "Pending",
  ).length;

  const totalDibatalkan = reports.filter(
    (item) => item.status === "Dibatalkan",
  ).length;

  const exportExcel = () => {
    const data = filteredReports.map((item) => ({
      Invoice: item.invoice,
      Customer: item.customer,
      Produk: item.produk,
      Metode: item.metode,
      Total: item.total,
      Status: item.status,
      Tanggal: item.tanggal,
      Jam: `${item.jam} WIB`,
    }));

    const worksheet = XLSX.utils.json_to_sheet(data);

    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workbook, worksheet, "Laporan Penjualan");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    const file = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
    });

    saveAs(file, `laporan-penjualan-${new Date().getTime()}.xlsx`);
  };

  return (
    <div>
      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Laporan Penjualan
        </h1>

        <p className="mt-2 text-gray-500 dark:text-gray-400">
          Ringkasan laporan penjualan Dana Stockroom
        </p>
      </div>

      {/* STATS */}
      <div
        className="
        mb-6
        grid
        grid-cols-1
        sm:grid-cols-2
        xl:grid-cols-4
        gap-5
      "
      >
        {/* PENDAPATAN */}
        <Card className="border border-gray-200 bg-white dark:border-white/10 dark:bg-[#0F172A]">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Total Pendapatan
          </p>

          <h2 className="mt-3 text-3xl font-bold text-gray-900 dark:text-white">
            {formatRupiah(totalPendapatan)}
          </h2>
        </Card>

        {/* TRANSAKSI */}
        <Card className="border border-gray-200 bg-white dark:border-white/10 dark:bg-[#0F172A]">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Total Transaksi
          </p>

          <h2 className="mt-3 text-3xl font-bold text-gray-900 dark:text-white">
            {totalTransaksi}
          </h2>
        </Card>

        {/* PENDING */}
        <Card className="border border-gray-200 bg-white dark:border-white/10 dark:bg-[#0F172A]">
          <p className="text-sm text-gray-500 dark:text-gray-400">Pending</p>

          <h2 className="mt-3 text-3xl font-bold text-yellow-500">
            {totalPending}
          </h2>
        </Card>

        {/* DIBATALKAN */}
        <Card className="border border-gray-200 bg-white dark:border-white/10 dark:bg-[#0F172A]">
          <p className="text-sm text-gray-500 dark:text-gray-400">Dibatalkan</p>

          <h2 className="mt-3 text-3xl font-bold text-red-500">
            {totalDibatalkan}
          </h2>
        </Card>
      </div>

      {/* TABLE */}
      <Card className="border border-gray-200 bg-white dark:border-white/10 dark:bg-[#0F172A]">
        {/* TOP */}
        <div className="mb-6 flex flex-col gap-4 xl:flex-row xl:items-end">
          {/* SEARCH */}
          <div className="flex-1">
            <input
              type="text"
              placeholder="Cari invoice, customer, produk..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
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

          {/* EXPORT */}
          <button
            onClick={exportExcel}
            className="
              w-full
              xl:w-auto
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
            Export Excel
          </button>
        </div>

        {/* MOBILE + TABLET */}
        <div className="grid gap-4 xl:hidden">
          {filteredReports.length === 0 ? (
            <Card
              className="
    border
    border-gray-200
    bg-white
    shadow-sm

    dark:border-white/10
    dark:bg-[#0F172A]
  "
            >
              <p className="text-center text-gray-500 dark:text-gray-400">
                Tidak ada data transaksi
              </p>
            </Card>
          ) : (
            filteredReports.map((item) => (
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
                <div className="space-y-4 text-sm md:text-base">
                  <div>
                    <h3
                      className="
    text-lg
    font-bold
    text-gray-900

    dark:text-white
  "
                    >
                      {item.invoice}
                    </h3>

                    <p
                      className="
    text-sm
    text-gray-500

    dark:text-gray-400
  "
                    >
                      Dana Stockroom
                    </p>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between gap-3">
                      <span
                        className="
    text-gray-500

    dark:text-gray-400
  "
                      >
                        Customer
                      </span>

                      <span className="text-right font-medium">
                        {item.customer}
                      </span>
                    </div>

                    <div className="flex justify-between gap-3">
                      <span
                        className="
    text-gray-500

    dark:text-gray-400
  "
                      >
                        Produk
                      </span>

                      <span
                        className="
                max-w-[60%]
                break-words
                text-right
                text-gray-700

                dark:text-gray-300
              "
                      >
                        {item.produk}
                      </span>
                    </div>

                    <div className="flex justify-between gap-3">
                      <span
                        className="
    text-gray-500

    dark:text-gray-400
  "
                      >
                        Metode
                      </span>

                      <span>
                        <span
                          className="
    text-gray-700

    dark:text-gray-300
  "
                        >
                          <span
                            className="
    text-gray-700

    dark:text-gray-300
  "
                          >
                            {item.metode}
                          </span>
                        </span>
                      </span>
                    </div>

                    <div className="flex justify-between gap-3">
                      <span
                        className="
    text-gray-500

    dark:text-gray-400
  "
                      >
                        Total
                      </span>

                      <span className="font-bold text-green-400">
                        {formatRupiah(item.total)}
                      </span>
                    </div>

                    <div className="flex justify-between gap-3">
                      <span
                        className="
    text-gray-500

    dark:text-gray-400
  "
                      >
                        Tanggal
                      </span>

                      <div className="text-right">
                        <p>{item.tanggal}</p>

                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {item.jam} WIB
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-2">
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
                    : item.status === "Pending"
                      ? "bg-yellow-100 text-yellow-600 dark:bg-yellow-500/20 dark:text-yellow-400"
                      : "bg-red-100 text-red-600 dark:bg-red-500/20 dark:text-red-400"
                }
              `}
                    >
                      {item.status}
                    </span>
                  </div>
                </div>
              </Card>
            ))
          )}
        </div>

        {/* DESKTOP */}
        <div className="hidden xl:block">
          <div className="overflow-x-auto">
            <div className="min-w-[1000px]">
              <DataTable
                headers={[
                  "Invoice",
                  "Customer",
                  "Produk",
                  "Metode",
                  "Total",
                  "Status",
                  "Tanggal",
                ]}
              >
                {filteredReports.length === 0 ? (
                  <tr>
                    <td
                      colSpan={7}
                      className="
                py-10
                text-center
                text-gray-500
                dark:text-gray-400
              "
                    >
                      Tidak ada data transaksi
                    </td>
                  </tr>
                ) : (
                  filteredReports.map((item) => (
                    <tr
                      key={item.id}
                      className="
                border-b
                border-gray-200
                dark:border-white/5
              "
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
                        <span
                          className="
    text-gray-700

    dark:text-gray-300
  "
                        >
                          {item.metode}
                        </span>
                      </td>

                      <td className="whitespace-nowrap py-5 font-semibold text-gray-700 dark:text-gray-300">
                        {formatRupiah(item.total)}
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
                        : item.status === "Pending"
                          ? "bg-yellow-100 text-yellow-600 dark:bg-yellow-500/20 dark:text-yellow-400"
                          : "bg-red-100 text-red-600 dark:bg-red-500/20 dark:text-red-400"
                    }
                  `}
                        >
                          {item.status}
                        </span>
                      </td>

                      <td className="whitespace-nowrap py-5 text-gray-700 dark:text-gray-300">
                        <div>
                          <p>{item.tanggal}</p>

                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {item.jam} WIB
                          </p>
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
    </div>
  );
}
