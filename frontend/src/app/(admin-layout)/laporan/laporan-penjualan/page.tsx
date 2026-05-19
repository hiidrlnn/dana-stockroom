"use client";

import { useMemo, useState } from "react";

import Card from "@/components/ui/card";

import DataTable from "@/components/tabel/data-table";

import { formatRupiah } from "@/lib/format-rupiah";

type ReportType = {
  id: number;
  invoice: string;
  customer: string;
  produk: string;
  metode: string;
  total: number;
  status: string;
  tanggal: string;
};

export default function LaporanPenjualanPage() {
  const [search, setSearch] = useState("");

  const reports: ReportType[] = [
    {
      id: 1,
      invoice: "INV-001",
      customer: "Dirlan",
      produk: "Nike Air Force 1",
      metode: "QRIS",
      total: 1850000,
      status: "Selesai",
      tanggal: "10 Mei 2026",
    },

    {
      id: 2,
      invoice: "INV-002",
      customer: "Andi",
      produk: "Adidas Samba",
      metode: "Cash",
      total: 1650000,
      status: "Selesai",
      tanggal: "09 Mei 2026",
    },

    {
      id: 3,
      invoice: "INV-003",
      customer: "Budi",
      produk: "New Balance 530",
      metode: "Transfer",
      total: 2100000,
      status: "Pending",
      tanggal: "08 Mei 2026",
    },

    {
      id: 4,
      invoice: "INV-004",
      customer: "Rizky",
      produk: "Converse High",
      metode: "QRIS",
      total: 950000,
      status: "Dibatalkan",
      tanggal: "07 Mei 2026",
    },
  ];

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
    .reduce((acc, item) => acc + item.total, 0);

  const totalTransaksi = reports.length;

  const totalPending = reports.filter(
    (item) => item.status === "Pending",
  ).length;

  const totalDibatalkan = reports.filter(
    (item) => item.status === "Dibatalkan",
  ).length;

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
      <div className="mb-6 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
        {/* TOTAL */}
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
        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          {/* SEARCH */}
          <div className="w-full md:max-w-sm">
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
            Export PDF
          </button>
        </div>

        {/* TABLE */}
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
              ]}>
              {filteredReports.map((item) => (
                <tr
                  key={item.id}
                  className="border-b border-gray-200 dark:border-white/5">
                  {/* INVOICE */}
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

                  {/* CUSTOMER */}
                  <td className="whitespace-nowrap py-5 text-gray-700 dark:text-gray-300">
                    {item.customer}
                  </td>

                  {/* PRODUK */}
                  <td className="whitespace-nowrap py-5 font-medium text-gray-700 dark:text-gray-300">
                    {item.produk}
                  </td>

                  {/* METODE */}
                  <td className="whitespace-nowrap py-5 text-gray-700 dark:text-gray-300">
                    {item.metode}
                  </td>

                  {/* TOTAL */}
                  <td className="whitespace-nowrap py-5 font-semibold text-gray-700 dark:text-gray-300">
                    {formatRupiah(item.total)}
                  </td>

                  {/* STATUS */}
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
                      `}>
                      {item.status}
                    </span>
                  </td>

                  {/* TANGGAL */}
                  <td className="whitespace-nowrap py-5 text-gray-700 dark:text-gray-300">
                    {item.tanggal}
                  </td>
                </tr>
              ))}
            </DataTable>
          </div>
        </div>
      </Card>
    </div>
  );
}
