"use client";

import { useEffect, useMemo, useState } from "react";

import Card from "@/components/ui/card";

import DataTable from "@/components/tabel/data-table";

import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

type StockType = {
  id: number;
  produk: string;
  kategori: string;
  size: string;
  stok: number;
  status: string;
  update: string;
  jam: string;
};

export default function LaporanStokPage() {
  const [search, setSearch] = useState("");
  const [stocks, setStocks] = useState<StockType[]>([]);
  const [loading, setLoading] = useState(true);

  const [kategoriFilter, setKategoriFilter] = useState("Semua");
  const [statusFilter, setStatusFilter] = useState("Semua");
  const [sortStok, setSortStok] = useState("default");

  useEffect(() => {
    const fetchStocks = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/products");

        const data = await response.json();

        const transformed = data.map((item: any) => {
          const date = new Date(item.updated_at);

          return {
            id: item.id,
            produk: item.nama,
            kategori: item.kategori,
            size: item.size,
            stok: Number(item.stok),
            status: item.status,

            update: date.toLocaleDateString("id-ID", {
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

        setStocks(transformed);
      } catch (error) {
        console.error("Gagal mengambil data stok:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStocks();
  }, []);

  const categories = ["Semua", ...new Set(stocks.map((item) => item.kategori))];

  /* =========================
     FILTER
  ========================= */
  const filteredStocks = useMemo(() => {
    let data = [...stocks];

    data = data.filter(
      (item) =>
        item.produk.toLowerCase().includes(search.toLowerCase()) ||
        item.kategori.toLowerCase().includes(search.toLowerCase()),
    );

    if (kategoriFilter !== "Semua") {
      data = data.filter((item) => item.kategori === kategoriFilter);
    }

    if (statusFilter !== "Semua") {
      data = data.filter((item) => item.status === statusFilter);
    }

    if (sortStok === "terbanyak") {
      data.sort((a, b) => b.stok - a.stok);
    }

    if (sortStok === "tersedikit") {
      data.sort((a, b) => a.stok - b.stok);
    }

    return data;
  }, [stocks, search, kategoriFilter, statusFilter, sortStok]);

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

  const exportExcel = () => {
    const data = filteredStocks.map((item) => ({
      Produk: item.produk,
      Kategori: item.kategori,
      Size: item.size,
      Stok: item.stok,
      Status: item.status,
      Update: item.update,
      Jam: `${item.jam} WIB`,
    }));

    const worksheet = XLSX.utils.json_to_sheet(data);

    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workbook, worksheet, "Laporan Stok");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    const file = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
    });

    saveAs(file, `laporan-stok-${new Date().getTime()}.xlsx`);
  };

  if (loading) {
    return (
      <div className="flex h-[300px] items-center justify-center">
        <p className="text-gray-500 dark:text-gray-400">Memuat data stok...</p>
      </div>
    );
  }

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
        <div className="mb-6 flex flex-col gap-4 xl:flex-row xl:items-end">
          {/* SEARCH */}
          <div
            className="
    flex
    flex-col
    gap-3
    lg:grid
    lg:grid-cols-4
    flex-1
  "
          >
            <input
              type="text"
              placeholder="Cari produk atau kategori..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="
      min-w-0
      rounded-xl
      border
      border-gray-200
      bg-gray-100
      px-4
      py-3
      text-gray-900
      dark:border-white/10
      dark:bg-[#1E293B]
      dark:text-white
    "
            />

            <select
              value={kategoriFilter}
              onChange={(e) => setKategoriFilter(e.target.value)}
              className="
      min-w-0
      rounded-xl
      border
      border-gray-200
      bg-gray-100
      px-4
      py-3
      dark:border-white/10
      dark:bg-[#1E293B]
      dark:text-white
    "
            >
              {categories.map((cat) => (
                <option key={cat}>{cat}</option>
              ))}
            </select>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="
      min-w-0
      rounded-xl
      border
      border-gray-200
      bg-gray-100
      px-4
      py-3
      dark:border-white/10
      dark:bg-[#1E293B]
      dark:text-white
    "
            >
              <option value="Semua">Semua Status</option>
              <option value="Tersedia">Tersedia</option>
              <option value="Stok Menipis">Stok Menipis</option>
              <option value="Habis">Habis</option>
            </select>

            <select
              value={sortStok}
              onChange={(e) => setSortStok(e.target.value)}
              className="
      min-w-0
      rounded-xl
      border
      border-gray-200
      bg-gray-100
      px-4
      py-3
      dark:border-white/10
      dark:bg-[#1E293B]
      dark:text-white
    "
            >
              <option value="default">Urutkan Stok</option>
              <option value="terbanyak">Stok Terbanyak</option>
              <option value="tersedikit">Stok Tersedikit</option>
            </select>
          </div>

          {/* EXPORT */}
          <button
            onClick={exportExcel}
            className="
              w-full
              sm:w-auto
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

        {/* TABLE */}
        <div className="grid gap-4 xl:hidden">
          {filteredStocks.length === 0 ? (
            <Card>
              <p className="text-center text-gray-500 dark:text-gray-400">
                Tidak ada data produk
              </p>
            </Card>
          ) : (
            filteredStocks.map((item) => (
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
                  <h3
                    className="
    text-lg
    font-bold
    text-gray-900

    dark:text-white
  "
                  >
                    {item.produk}
                  </h3>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between border-b border-gray-200 dark:border-white/5 pb-2">
                      <span
                        className="
    text-gray-500

    dark:text-gray-400
  "
                      >
                        Kategori
                      </span>

                      <span
                        className="
    font-medium
    text-gray-900

    dark:text-white
  "
                      >
                        {item.kategori}
                      </span>
                    </div>

                    <div className="flex items-center justify-between border-b border-gray-200 dark:border-white/5 pb-2">
                      <span
                        className="
    text-gray-500

    dark:text-gray-400
  "
                      >
                        Size
                      </span>

                      <span
                        className="
    font-medium
    text-gray-900

    dark:text-white
  "
                      >
                        {item.size}
                      </span>
                    </div>

                    <div className="flex items-center justify-between border-b border-gray-200 dark:border-white/5 pb-2">
                      <span
                        className="
    text-gray-500

    dark:text-gray-400
  "
                      >
                        Stok
                      </span>

                      <span
                        className="
    font-semibold
    text-gray-900

    dark:text-white
  "
                      >
                        {item.stok}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span
                        className="
    text-gray-500

    dark:text-gray-400
  "
                      >
                        Update
                      </span>

                      <div className="text-right">
                        <p
                          className="
      text-gray-700
      dark:text-gray-300
    "
                        >
                          {item.update}
                        </p>

                        <p
                          className="
      text-xs
      text-gray-500
      dark:text-gray-400
    "
                        >
                          {item.jam} WIB
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="pt-2">
                    <span
                      className={`
                  inline-flex
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
        {/* TABLE DESKTOP */}
        <div className="hidden xl:block">
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
                ]}
              >
                {filteredStocks.length === 0 ? (
                  <tr>
                    <td
                      colSpan={6}
                      className="py-10 text-center text-gray-500 dark:text-gray-400"
                    >
                      Tidak ada data produk
                    </td>
                  </tr>
                ) : (
                  filteredStocks.map((item) => (
                    <tr
                      key={item.id}
                      className="border-b border-gray-200 dark:border-white/5"
                    >
                      <td className="whitespace-nowrap py-5 font-semibold text-gray-900 dark:text-white">
                        {item.produk}
                      </td>

                      <td className="whitespace-nowrap py-5 text-gray-700 dark:text-gray-300">
                        {item.kategori}
                      </td>

                      <td className="whitespace-nowrap py-5 text-gray-700 dark:text-gray-300">
                        {item.size}
                      </td>

                      <td className="whitespace-nowrap py-5 font-medium text-gray-700 dark:text-gray-300">
                        {item.stok}
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
                      item.status === "Tersedia"
                        ? "bg-green-100 text-green-600 dark:bg-green-500/20 dark:text-green-400"
                        : item.status === "Stok Menipis"
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
                          <p>{item.update}</p>

                          <p
                            className="
        text-xs
        text-gray-500
        dark:text-gray-400
      "
                          >
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
