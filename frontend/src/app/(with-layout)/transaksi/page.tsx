"use client";

import { useMemo, useState } from "react";

import Card from "@/components/ui/card";

import DataTable from "@/components/tabel/data-table";

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

export default function TransaksiPage() {
  const [search, setSearch] = useState("");

  const [transactions, setTransactions] = useState<TransactionType[]>([
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
      tanggal: "10 Mei 2026",
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
      tanggal: "10 Mei 2026",
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
      tanggal: "09 Mei 2026",
    },

    {
      id: 4,
      invoice: "INV-004",
      customer: "Rizky",

      produk: "Converse High",
      merk: "Converse",
      kategori: "Classic",
      size: "40",

      total: 950000,
      metode: "QRIS",
      status: "Dibatalkan",
      tanggal: "08 Mei 2026",
    },
  ]);

  /* =========================
     SEARCH FILTER
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
     DELETE TRANSACTION
  ========================= */
  const handleDeleteTransaction = (id: number, invoice: string) => {
    const confirmDelete = confirm(`Hapus transaksi ${invoice}?`);

    if (confirmDelete) {
      setTransactions((prev) => prev.filter((item) => item.id !== id));
    }
  };

  return (
    <div className="w-full overflow-hidden">
      {/* HEADER */}
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Transaksi Penjualan
          </h1>

          <p className="mt-2 text-gray-500 dark:text-gray-400">
            Kelola semua data transaksi Dana Stockroom
          </p>
        </div>

        {/* BUTTON */}
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

      {/* CARD */}
      <Card className="overflow-hidden border border-gray-200 bg-white shadow-sm dark:border-white/10 dark:bg-[#0F172A]">
        {/* SEARCH */}
        <div className="mb-6">
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

        {/* TABLE */}
        <div
          className="
            w-full
            overflow-x-auto
            overflow-y-hidden
            pb-2
          ">
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
              {filteredTransactions.map((item) => (
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

                  {/* MERK */}
                  <td className="whitespace-nowrap py-5 text-gray-700 dark:text-gray-300">
                    {item.merk}
                  </td>

                  {/* KATEGORI */}
                  <td className="whitespace-nowrap py-5 text-gray-700 dark:text-gray-300">
                    {item.kategori}
                  </td>

                  {/* SIZE */}
                  <td className="whitespace-nowrap py-5 text-gray-700 dark:text-gray-300">
                    {item.size}
                  </td>

                  {/* TOTAL */}
                  <td className="whitespace-nowrap py-5 font-semibold text-gray-700 dark:text-gray-300">
                    {formatRupiah(item.total)}
                  </td>

                  {/* METODE */}
                  <td className="whitespace-nowrap py-5 text-gray-700 dark:text-gray-300">
                    {item.metode}
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

                  {/* ACTION */}
                  <td className="whitespace-nowrap py-5">
                    <div className="flex items-center gap-3">
                      {/* DETAIL */}
                      <button
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

                      {/* DELETE */}
                      <button
                        onClick={() =>
                          handleDeleteTransaction(item.id, item.invoice)
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
              ))}
            </DataTable>
          </div>
        </div>
      </Card>
    </div>
  );
}
