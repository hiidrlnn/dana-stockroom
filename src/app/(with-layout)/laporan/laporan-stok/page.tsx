"use client";

import { useMemo, useState } from "react";

import Card from "@/components/ui/card";

import DataTable from "@/components/tabel/data-table";

type StockType = {
  id: number;
  produk: string;
  kategori: string;
  size: string;
  stok: number;
  status: string;
  update: string;
};

export default function LaporanStokPage() {
  const [search, setSearch] = useState("");

  const stocks: StockType[] = [
    {
      id: 1,
      produk: "Nike Air Force 1",
      kategori: "Sneakers",
      size: "42",
      stok: 12,
      status: "Tersedia",
      update: "10 Mei 2026",
    },

    {
      id: 2,
      produk: "Adidas Samba",
      kategori: "Casual",
      size: "41",
      stok: 8,
      status: "Tersedia",
      update: "09 Mei 2026",
    },

    {
      id: 3,
      produk: "New Balance 530",
      kategori: "Running",
      size: "43",
      stok: 3,
      status: "Stok Menipis",
      update: "08 Mei 2026",
    },

    {
      id: 4,
      produk: "Converse High",
      kategori: "Classic",
      size: "40",
      stok: 0,
      status: "Habis",
      update: "07 Mei 2026",
    },
  ];

  /* =========================
     FILTER
  ========================= */
  const filteredStocks = useMemo(() => {
    return stocks.filter(
      (item) =>
        item.produk.toLowerCase().includes(search.toLowerCase()) ||
        item.kategori.toLowerCase().includes(search.toLowerCase()),
    );
  }, [stocks, search]);

  /* =========================
     SUMMARY
  ========================= */
  const totalProduk = stocks.length;

  const stokTersedia = stocks.filter(
    (item) => item.status === "Tersedia",
  ).length;

  const stokMenipis = stocks.filter(
    (item) => item.status === "Stok Menipis",
  ).length;

  const stokHabis = stocks.filter((item) => item.status === "Habis").length;

  return (
    <div>
      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Laporan Stok
        </h1>

        <p className="mt-2 text-gray-500 dark:text-gray-400">
          Monitoring stok produk Dana Stockroom
        </p>
      </div>

      {/* STATS */}
      <div className="mb-6 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
        {/* TOTAL */}
        <Card className="border border-gray-200 bg-white dark:border-white/10 dark:bg-[#0F172A]">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Total Produk
          </p>

          <h2 className="mt-3 text-3xl font-bold text-gray-900 dark:text-white">
            {totalProduk}
          </h2>
        </Card>

        {/* TERSEDIA */}
        <Card className="border border-gray-200 bg-white dark:border-white/10 dark:bg-[#0F172A]">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Stok Tersedia
          </p>

          <h2 className="mt-3 text-3xl font-bold text-green-500">
            {stokTersedia}
          </h2>
        </Card>

        {/* MENIPIS */}
        <Card className="border border-gray-200 bg-white dark:border-white/10 dark:bg-[#0F172A]">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Stok Menipis
          </p>

          <h2 className="mt-3 text-3xl font-bold text-yellow-500">
            {stokMenipis}
          </h2>
        </Card>

        {/* HABIS */}
        <Card className="border border-gray-200 bg-white dark:border-white/10 dark:bg-[#0F172A]">
          <p className="text-sm text-gray-500 dark:text-gray-400">Stok Habis</p>

          <h2 className="mt-3 text-3xl font-bold text-red-500">{stokHabis}</h2>
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
              placeholder="Cari produk atau kategori..."
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
            Export Excel
          </button>
        </div>

        {/* TABLE */}
        <div className="overflow-x-auto">
          <div className="min-w-[900px]">
            <DataTable
              headers={[
                "Produk",
                "Kategori",
                "Size",
                "Stok",
                "Status",
                "Update Terakhir",
              ]}>
              {filteredStocks.map((item) => (
                <tr
                  key={item.id}
                  className="border-b border-gray-200 dark:border-white/5">
                  {/* PRODUK */}
                  <td className="whitespace-nowrap py-5 font-semibold text-gray-900 dark:text-white">
                    {item.produk}
                  </td>

                  {/* KATEGORI */}
                  <td className="whitespace-nowrap py-5 text-gray-700 dark:text-gray-300">
                    {item.kategori}
                  </td>

                  {/* SIZE */}
                  <td className="whitespace-nowrap py-5 text-gray-700 dark:text-gray-300">
                    {item.size}
                  </td>

                  {/* STOK */}
                  <td className="whitespace-nowrap py-5 font-medium text-gray-700 dark:text-gray-300">
                    {item.stok}
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
                          item.status === "Tersedia"
                            ? "bg-green-100 text-green-600 dark:bg-green-500/20 dark:text-green-400"
                            : item.status === "Stok Menipis"
                              ? "bg-yellow-100 text-yellow-600 dark:bg-yellow-500/20 dark:text-yellow-400"
                              : "bg-red-100 text-red-600 dark:bg-red-500/20 dark:text-red-400"
                        }
                      `}>
                      {item.status}
                    </span>
                  </td>

                  {/* UPDATE */}
                  <td className="whitespace-nowrap py-5 text-gray-700 dark:text-gray-300">
                    {item.update}
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
