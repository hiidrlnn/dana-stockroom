"use client";

import { useState } from "react";

interface Product {
  id: number;
  nama: string;
  kategori: string;
  size: string;
  stok: number;
  harga_jual: number;
}

interface ProductStockTableProps {
  products: Product[];
  isLoading: boolean;
}

export function ProductStockTable({ products, isLoading }: ProductStockTableProps) {
  const [search, setSearch] = useState("");

  // Logika Filter Produk
  const filteredProducts = products.filter((p) =>
    p.nama.toLowerCase().includes(search.toLowerCase()) ||
    p.kategori.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-[#0F172A]">
      {/* Header dengan Pencarian */}
      <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            Produk Tersedia
          </h2>
        </div>
        
        <input
          type="text"
          placeholder="Cari produk atau kategori..."
          className="px-4 py-2 rounded-xl border border-gray-200 bg-slate-50 dark:bg-[#1E293B] dark:border-white/10 dark:text-white text-sm"
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="overflow-x-auto">
        {isLoading ? (
          <div className="flex h-40 items-center justify-center text-gray-500">
            <span className="animate-pulse">Memuat data real-time...</span>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="py-10 text-center text-gray-500 italic">
            Produk tidak ditemukan.
          </div>
        ) : (
          <table className="w-full min-w-[700px]">
            <thead>
              <tr className="border-b border-gray-200 dark:border-white/10">
                <th className="py-4 text-left text-sm font-semibold text-gray-500">Produk</th>
                <th className="py-4 text-left text-sm font-semibold text-gray-500">Kategori</th>
                <th className="py-4 text-left text-sm font-semibold text-gray-500">Size</th>
                <th className="py-4 text-left text-sm font-semibold text-gray-500">Stock</th>
                <th className="py-4 text-left text-sm font-semibold text-gray-500">Harga</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product) => (
                <tr
                  key={product.id}
                  className="border-b border-gray-100 transition-colors hover:bg-slate-50 dark:border-white/5 dark:hover:bg-white/5"
                >
                  <td className="py-4 font-semibold text-slate-900 dark:text-white">
                    {product.nama}
                  </td>
                  <td className="py-4 text-gray-600 dark:text-gray-300">
                    {product.kategori}
                  </td>
                  <td className="py-4 text-gray-600 dark:text-gray-300">
                    {product.size}
                  </td>
                  <td className="py-4">
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      product.stok <= 0 ? 'bg-red-100 text-red-800' : 
                      product.stok < 5 ? 'bg-orange-100 text-orange-800' : 'bg-green-100 text-green-800'
                    }`}>
                      {product.stok > 0 ? product.stok : "Habis"}
                    </span>
                  </td>
                  <td className="py-4 font-semibold text-slate-900 dark:text-white">
                    Rp {product.harga_jual.toLocaleString("id-ID")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}