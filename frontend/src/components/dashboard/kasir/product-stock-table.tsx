"use client";

import { useMemo, useState } from "react";

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

export function ProductStockTable({
  products,
  isLoading,
}: ProductStockTableProps) {
  const [search, setSearch] = useState("");

  const filteredProducts = useMemo(() => {
    return products.filter(
      (p) =>
        p.nama.toLowerCase().includes(search.toLowerCase()) ||
        p.kategori.toLowerCase().includes(search.toLowerCase()),
    );
  }, [products, search]);

  const getStockBadge = (stok: number) => {
    if (stok <= 0) {
      return (
        <span
          className="
            rounded-full
            bg-red-100
            px-3
            py-1
            text-xs
            font-semibold
            text-red-600

            dark:bg-red-500/20
            dark:text-red-400
          "
        >
          Habis
        </span>
      );
    }

    if (stok < 5) {
      return (
        <span
          className="
            rounded-full
            bg-yellow-100
            px-3
            py-1
            text-xs
            font-semibold
            text-yellow-600

            dark:bg-yellow-500/20
            dark:text-yellow-400
          "
        >
          {stok}
        </span>
      );
    }

    return (
      <span
        className="
          rounded-full
          bg-green-100
          px-3
          py-1
          text-xs
          font-semibold
          text-green-600

          dark:bg-green-500/20
          dark:text-green-400
        "
      >
        {stok}
      </span>
    );
  };

  return (
    <div
      className="
        rounded-3xl
        border
        border-gray-200
        bg-white
        p-4
        shadow-sm

        sm:p-6

        dark:border-white/10
        dark:bg-[#0F172A]
      "
    >
      {/* HEADER */}
      <div
        className="
          mb-5
          flex
          flex-col
          gap-4

          lg:flex-row
          lg:items-center
          lg:justify-between
        "
      >
        <h2
          className="
            text-xl
            font-bold
            text-slate-900

            dark:text-white
          "
        >
          Produk Tersedia
        </h2>

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
            text-sm

            lg:w-[300px]

            dark:border-white/10
            dark:bg-[#1E293B]
            dark:text-white
          "
        />
      </div>

      {/* LOADING */}
      {isLoading && (
        <div
          className="
            flex
            h-40
            items-center
            justify-center
            text-gray-500
          "
        >
          Memuat data produk...
        </div>
      )}

      {/* EMPTY */}
      {!isLoading && filteredProducts.length === 0 && (
        <div
          className="
              py-10
              text-center
              text-gray-500
            "
        >
          Produk tidak ditemukan.
        </div>
      )}

      {/* MOBILE CARD */}
      <div
        className="
          grid
          gap-4

          xl:hidden
        "
      >
        {!isLoading &&
          filteredProducts.map((product) => (
            <div
              key={product.id}
              className="
                rounded-2xl
                border
                border-gray-200
                bg-white
                p-4

                dark:border-white/10
                dark:bg-[#081028]
              "
            >
              <div className="space-y-3">
                <h3
                  className="
                    text-lg
                    font-bold
                    text-slate-900

                    dark:text-white
                  "
                >
                  {product.nama}
                </h3>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Kategori</span>

                    <span className="font-medium dark:text-white">
                      {product.kategori}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-500">Size</span>

                    <span className="font-medium dark:text-white">
                      {product.size}
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-gray-500">Stok</span>

                    {getStockBadge(product.stok)}
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-500">Harga</span>

                    <span
                      className="
                        font-bold
                        text-slate-900

                        dark:text-white
                      "
                    >
                      Rp {product.harga_jual.toLocaleString("id-ID")}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>

      {/* DESKTOP TABLE */}
      <div
        className="
          hidden
          xl:block
        "
      >
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px]">
            <thead>
              <tr
                className="
                  border-b
                  border-gray-200

                  dark:border-white/10
                "
              >
                <th className="py-4 text-left text-sm text-gray-500">Produk</th>

                <th className="py-4 text-left text-sm text-gray-500">
                  Kategori
                </th>

                <th className="py-4 text-left text-sm text-gray-500">Size</th>

                <th className="py-4 text-left text-sm text-gray-500">Stok</th>

                <th className="py-4 text-left text-sm text-gray-500">Harga</th>
              </tr>
            </thead>

            <tbody>
              {filteredProducts.map((product) => (
                <tr
                  key={product.id}
                  className="
                    border-b
                    border-gray-100

                    transition

                    hover:bg-gray-50

                    dark:border-white/5
                    dark:hover:bg-white/5
                  "
                >
                  <td
                    className="
                      py-5
                      font-semibold

                      text-slate-900

                      dark:text-white
                    "
                  >
                    {product.nama}
                  </td>

                  <td className="py-5 text-gray-600 dark:text-gray-300">
                    {product.kategori}
                  </td>

                  <td className="py-5 text-gray-600 dark:text-gray-300">
                    {product.size}
                  </td>

                  <td className="py-5">{getStockBadge(product.stok)}</td>

                  <td
                    className="
                      py-5
                      font-semibold

                      text-slate-900

                      dark:text-white
                    "
                  >
                    Rp {product.harga_jual.toLocaleString("id-ID")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
