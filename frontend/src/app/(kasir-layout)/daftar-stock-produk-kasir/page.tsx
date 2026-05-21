"use client";

import { useMemo, useState } from "react";
import Card from "@/components/ui/card";
import { formatRupiah } from "@/lib/format-rupiah";
import { Boxes, Search, AlertTriangle, CheckCircle, PackageSearch } from "lucide-react";

type ProductStockType = {
  id: number;
  sku: string;
  nama: string;
  kategori: string;
  stok: number;
  hargaJual: number;
  statusStok: "Aman" | "Menipis" | "Habis";
};

export default function StokBarangKasirPage() {
  const [search, setSearch] = useState("");
  const [kategoriFilter, setKategoriFilter] = useState("Semua");

  // Data master stok barang Dana Stockroom (Sama persis dengan data di sisi Owner agar sinkron)
  const [stocks] = useState<ProductStockType[]>([
    { id: 1, sku: "INV ", nama: "Nike Air Force 1 Triple White", kategori: "Sneakers", stok: 24, hargaJual: 1750000, statusStok: "Aman" },
    { id: 2, sku: "INV", nama: "Adidas Samba OG Black White", kategori: "Sneakers", stok: 4, hargaJual: 1650000, statusStok: "Menipis" },
    { id: 3, sku: "INV", nama: "New Balance 530 Silver Metallic", kategori: "Sneakers", stok: 12, hargaJual: 1900000, statusStok: "Aman" },
    { id: 4, sku: "INV", nama: "Converse Chuck Taylor All Star High", kategori: "Sneakers", stok: 0, hargaJual: 950000, statusStok: "Habis" },
    { id: 5, sku: "INV", nama: "Kaos Kaki Adidas Cushioned (3-Pack)", kategori: "Aksesoris", stok: 45, hargaJual: 150000, statusStok: "Aman" },
    { id: 6, sku: "INV", nama: "Premium Shoe Cleaner Premium 250ml", kategori: "Perawatan", stok: 3, hargaJual: 850000, statusStok: "Menipis" },
  ]);

  /* =========================
      LOGIKA FILTER BARANG
  ========================= */
  const filteredStocks = useMemo(() => {
    return stocks.filter((item) => {
      const searchMatch =
        item.nama.toLowerCase().includes(search.toLowerCase()) ||
        item.sku.toLowerCase().includes(search.toLowerCase());
      const kategoriMatch = kategoriFilter === "Semua" || item.kategori === kategoriFilter;
      return searchMatch && kategoriMatch;
    });
  }, [stocks, search, kategoriFilter]);

  /* =========================
      RINGKASAN STATISTIK KASIR
  ========================= */
  const totalBarang = stocks.length;
  const stokHabisCount = stocks.filter((item) => item.statusStok === "Habis").length;
  const stokMenipisCount = stocks.filter((item) => item.statusStok === "Menipis").length;

  return (
    <div className="space-y-6">
      {/* HEADER UTAMA */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
          <Boxes className="h-8 w-8 text-sky-500" /> Informasi Stok Barang
        </h1>
        <p className="mt-2 text-gray-500 dark:text-gray-400">
          Cek ketersediaan produk, jumlah stok terkini, dan harga jual secara langsung saat melayani pelanggan.
        </p>
      </div>

      {/* MINI STATS CARD */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        <Card className="border border-gray-200 bg-white dark:border-white/10 dark:bg-[#0F172A]">
          <p className="text-sm text-gray-500 dark:text-gray-400">Total Variasi Produk</p>
          <h3 className="mt-3 text-3xl font-bold text-gray-900 dark:text-white">
            {totalBarang} <span className="text-sm font-normal text-gray-400">Item</span>
          </h3>
        </Card>

        <Card className="border border-gray-200 bg-white dark:border-white/10 dark:bg-[#0F172A]">
          <p className="text-sm text-gray-500 dark:text-gray-400">Stok Menipis (&lt; 5)</p>
          <h3 className="mt-3 text-3xl font-bold text-yellow-500">
            {stokMenipisCount} <span className="text-sm font-normal text-gray-400">Perlu Order</span>
          </h3>
        </Card>

        <Card className="border border-gray-200 bg-white dark:border-white/10 dark:bg-[#0F172A]">
          <p className="text-sm text-gray-500 dark:text-gray-400">Stok Habis (Kosong)</p>
          <h3 className="mt-3 text-3xl font-bold text-red-500">
            {stokHabisCount} <span className="text-sm font-normal text-gray-400">Kosong</span>
          </h3>
        </Card>
      </div>

      {/* UTILITIES: SEARCH + FILTER KATEGORI */}
      <Card className="border border-gray-200 bg-white dark:border-white/10 dark:bg-[#0F172A]">
        <div className="mb-6 flex flex-col gap-4 lg:flex-row p-4 pb-0">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-3.5 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Cari berdasarkan SKU atau nama produk sepatu..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-2xl border border-gray-200 bg-gray-100 pl-11 pr-4 py-3 text-gray-900 outline-none focus:border-sky-500 dark:border-white/10 dark:bg-[#1E293B] dark:text-white"
            />
          </div>

          <select
            value={kategoriFilter}
            onChange={(e) => setKategoriFilter(e.target.value)}
            className="rounded-2xl border border-gray-200 bg-gray-100 px-4 py-3 text-gray-900 outline-none dark:border-white/10 dark:bg-[#1E293B] dark:text-white font-medium"
          >
            <option value="Semua">Semua Kategori</option>
            <option value="Sneakers">Sneakers</option>
            <option value="Aksesoris">Aksesoris</option>
            <option value="Perawatan">Perawatan</option>
          </select>
        </div>

        {/* TABEL VIEW ONLY */}
        <div className="-mx-6 overflow-x-auto">
          <div className="min-w-[1000px] px-6">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 dark:border-white/10">
                  <th className="pb-4 text-left text-sm text-gray-500 pl-4">Invoice</th>
                  <th className="pb-4 text-left text-sm text-gray-500">Nama Barang / Produk</th>
                  <th className="pb-4 text-left text-sm text-gray-500">Kategori</th>
                  <th className="pb-4 text-left text-sm text-gray-500">Harga Satuan</th>
                  <th className="pb-4 text-left text-sm text-gray-500">Sisa Stok</th>
                  <th className="pb-4 text-left text-sm text-gray-500">Status Gudang</th>
                </tr>
              </thead>

              <tbody>
                {filteredStocks.length > 0 ? (
                  filteredStocks.map((stock) => (
                    <tr key={stock.id} className="border-b border-gray-200 dark:border-white/5 hover:bg-gray-50/50 dark:hover:bg-white/5 transition-colors">
                      <td className="py-4 font-mono text-xs font-semibold text-gray-400 dark:text-gray-500 pl-4">
                        {stock.sku}
                      </td>
                      <td className="py-4 font-bold text-gray-900 dark:text-white">
                        {stock.nama}
                      </td>
                      <td className="py-4 text-sm text-gray-700 dark:text-gray-300 font-medium">
                        {stock.kategori}
                      </td>
                      <td className="py-4 font-bold text-gray-900 dark:text-white">
                        {formatRupiah(stock.hargaJual)}
                      </td>
                      <td className="py-4 font-extrabold text-slate-800 dark:text-slate-200">
                        {stock.stok} pcs
                      </td>
                      <td className="py-4">
                        <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${
                          stock.statusStok === "Aman"
                            ? "bg-green-100 text-green-600 dark:bg-green-500/20 dark:text-green-400"
                            : stock.statusStok === "Menipis"
                              ? "bg-yellow-100 text-yellow-600 dark:bg-yellow-500/20 dark:text-yellow-400"
                              : "bg-red-100 text-red-600 dark:bg-red-500/20 dark:text-red-400"
                        }`}>
                          {stock.statusStok === "Aman" && <CheckCircle className="h-3 w-3" />}
                          {stock.statusStok === "Menipis" && <AlertTriangle className="h-3 w-3" />}
                          {stock.statusStok === "Habis" && <AlertTriangle className="h-3 w-3" />}
                          {stock.statusStok}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="py-10 text-center text-gray-400 dark:text-gray-500">
                      <div className="flex flex-col items-center justify-center gap-2">
                        <PackageSearch className="h-8 w-8 text-gray-300" />
                        <p className="text-sm font-medium">Produk atau SKU tidak ditemukan</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </Card>
    </div>
  );
}