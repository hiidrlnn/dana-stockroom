"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

import PageHeader from "@/components/shared/page-header";

import Card from "@/components/ui/card";
import Input from "@/components/ui/input";

import DataTable from "@/components/tabel/data-table";

import { produkData } from "@/data/produk";
import { formatRupiah } from "@/lib/format-rupiah";

import AddProductModal from "@/components/produk/add-product-modal";

type ProductType = {
  id: number;
  nama: string;
  kategori: string;
  size: string;
  harga: number;
  stok: number;
  status: string;
  image?: string;
};

export default function ProdukPage() {
  const [search, setSearch] = useState("");

  const [products, setProducts] = useState<ProductType[]>([]);

  const [editingProduct, setEditingProduct] = useState<ProductType | null>(
    null,
  );

  /* =========================
     LOAD LOCAL STORAGE
  ========================= */
  useEffect(() => {
    const storedProducts = localStorage.getItem("products");

    if (storedProducts) {
      setProducts(JSON.parse(storedProducts));
    } else {
      setProducts(produkData);
    }
  }, []);

  /* =========================
     SAVE LOCAL STORAGE
  ========================= */
  useEffect(() => {
    if (products.length > 0) {
      localStorage.setItem("products", JSON.stringify(products));
    }
  }, [products]);

  /* =========================
     ADD PRODUCT
  ========================= */
  const handleAddProduct = (newProduct: ProductType) => {
    setProducts((prev) => [newProduct, ...prev]);
  };

  /* =========================
     UPDATE PRODUCT
  ========================= */
  const handleUpdateProduct = (updatedProduct: ProductType) => {
    setProducts((prev) =>
      prev.map((item) =>
        item.id === updatedProduct.id ? updatedProduct : item,
      ),
    );

    setEditingProduct(null);
  };

  /* =========================
     DELETE PRODUCT
  ========================= */
  const handleDeleteProduct = (id: number, nama: string) => {
    const confirmDelete = confirm(`Hapus produk ${nama}?`);

    if (confirmDelete) {
      setProducts((prev) => prev.filter((item) => item.id !== id));
    }
  };

  /* =========================
     SEARCH FILTER
  ========================= */
  const filteredProduk = useMemo(() => {
    return products.filter((item) =>
      item.nama.toLowerCase().includes(search.toLowerCase()),
    );
  }, [products, search]);

  return (
    <div>
      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Daftar Produk
        </h1>

        <p className="mt-2 text-gray-500 dark:text-gray-400">
          Kelola semua produk Dana Stockroom
        </p>
      </div>

      {/* CARD */}
      <Card className="border border-gray-200 bg-white shadow-sm dark:border-white/10 dark:bg-[#0F172A]">
        {/* TOP ACTION */}
        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          {/* SEARCH */}
          <div className="w-full md:max-w-sm">
            <input
              type="text"
              placeholder="Cari produk..."
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

          {/* BUTTON */}
          <AddProductModal onAddProduct={handleAddProduct} />
        </div>

        {/* TABLE */}
        <div className="overflow-x-auto">
          <DataTable
            headers={[
              "Produk",
              "Size",
              "Kategori",
              "Harga",
              "Stok",
              "Status",
              "Action",
            ]}>
            {filteredProduk.map((produk) => (
              <tr
                key={produk.id}
                className="border-b border-gray-200 dark:border-white/5">
                {/* PRODUK */}
                <td className="py-5">
                  <div className="flex items-center gap-4">
                    {/* IMAGE */}
                    <div className="relative h-14 w-14 overflow-hidden rounded-xl border border-gray-200 bg-gray-100 dark:border-white/10 dark:bg-[#1E293B]">
                      <Image
                        src={produk.image || "/images/no-image.png"}
                        alt={produk.nama}
                        fill
                        className="object-cover"
                      />
                    </div>

                    {/* NAME */}
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white">
                        {produk.nama}
                      </p>

                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Sepatu Original
                      </p>
                    </div>
                  </div>
                </td>

                {/* SIZE */}
                <td className="py-5 text-gray-700 dark:text-gray-300">
                  {produk.size}
                </td>

                {/* KATEGORI */}
                <td className="py-5 text-gray-700 dark:text-gray-300">
                  {produk.kategori}
                </td>

                {/* HARGA */}
                <td className="py-5 font-medium text-gray-700 dark:text-gray-300">
                  {formatRupiah(produk.harga)}
                </td>

                {/* STOK */}
                <td className="py-5 text-gray-700 dark:text-gray-300">
                  {produk.stok}
                </td>

                {/* STATUS */}
                <td className="py-5">
                  <span
                    className={`
                      rounded-full
                      px-3
                      py-1
                      text-xs
                      font-semibold

                      ${
                        produk.status === "Tersedia"
                          ? "bg-green-100 text-green-600 dark:bg-green-500/20 dark:text-green-400"
                          : produk.status === "Stok Menipis"
                            ? "bg-yellow-100 text-yellow-600 dark:bg-yellow-500/20 dark:text-yellow-400"
                            : "bg-red-100 text-red-600 dark:bg-red-500/20 dark:text-red-400"
                      }
                    `}>
                    {produk.status}
                  </span>
                </td>

                {/* ACTION */}
                <td className="py-5">
                  <div className="flex items-center gap-3">
                    {/* EDIT */}
                    <button
                      onClick={() => setEditingProduct(produk)}
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
                      Edit
                    </button>

                    {/* DELETE */}
                    <button
                      onClick={() =>
                        handleDeleteProduct(produk.id, produk.nama)
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
      </Card>

      {/* =========================
          EDIT MODAL
      ========================= */}
      {editingProduct && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 px-4">
          <div className="w-full max-w-2xl rounded-2xl border border-gray-200 bg-white p-8 shadow-2xl dark:border-white/10 dark:bg-[#0F172A]">
            {/* HEADER */}
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Edit Produk
                </h2>

                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  Update data produk
                </p>
              </div>

              <button
                onClick={() => setEditingProduct(null)}
                className="text-2xl text-gray-500 transition hover:text-black dark:text-gray-400 dark:hover:text-white">
                ×
              </button>
            </div>

            {/* FORM */}
            <div className="space-y-5">
              {/* NAMA */}
              <div>
                <label className="mb-2 block text-sm text-gray-700 dark:text-gray-300">
                  Nama Produk
                </label>

                <input
                  type="text"
                  value={editingProduct.nama}
                  onChange={(e) =>
                    setEditingProduct({
                      ...editingProduct,
                      nama: e.target.value,
                    })
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
                    outline-none
                    transition
                    focus:border-sky-500

                    dark:border-white/10
                    dark:bg-[#1E293B]
                    dark:text-white
                  "
                />
              </div>

              {/* SIZE */}
              <div>
                <label className="mb-2 block text-sm text-gray-700 dark:text-gray-300">
                  Size
                </label>

                <select
                  value={editingProduct.size}
                  onChange={(e) =>
                    setEditingProduct({
                      ...editingProduct,
                      size: e.target.value,
                    })
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
                    outline-none
                    transition
                    focus:border-sky-500

                    dark:border-white/10
                    dark:bg-[#1E293B]
                    dark:text-white
                  ">
                  <option>38</option>
                  <option>39</option>
                  <option>40</option>
                  <option>41</option>
                  <option>42</option>
                  <option>43</option>
                  <option>44</option>
                  <option>45</option>
                </select>
              </div>

              {/* KATEGORI */}
              <div>
                <label className="mb-2 block text-sm text-gray-700 dark:text-gray-300">
                  Kategori
                </label>

                <input
                  type="text"
                  value={editingProduct.kategori}
                  onChange={(e) =>
                    setEditingProduct({
                      ...editingProduct,
                      kategori: e.target.value,
                    })
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
                    outline-none
                    transition
                    focus:border-sky-500

                    dark:border-white/10
                    dark:bg-[#1E293B]
                    dark:text-white
                  "
                />
              </div>

              {/* HARGA */}
              <div>
                <label className="mb-2 block text-sm text-gray-700 dark:text-gray-300">
                  Harga
                </label>

                <input
                  type="number"
                  value={editingProduct.harga}
                  onChange={(e) =>
                    setEditingProduct({
                      ...editingProduct,
                      harga: Number(e.target.value),
                    })
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
                    outline-none
                    transition
                    focus:border-sky-500

                    dark:border-white/10
                    dark:bg-[#1E293B]
                    dark:text-white
                  "
                />
              </div>

              {/* STOK */}
              <div>
                <label className="mb-2 block text-sm text-gray-700 dark:text-gray-300">
                  Stok
                </label>

                <input
                  type="number"
                  value={editingProduct.stok}
                  onChange={(e) => {
                    const stokNumber = Number(e.target.value);

                    setEditingProduct({
                      ...editingProduct,
                      stok: stokNumber,

                      status:
                        stokNumber <= 0
                          ? "Habis"
                          : stokNumber <= 5
                            ? "Stok Menipis"
                            : "Tersedia",
                    });
                  }}
                  className="
                    w-full
                    rounded-xl
                    border
                    border-gray-200
                    bg-gray-100
                    px-4
                    py-3
                    text-gray-900
                    outline-none
                    transition
                    focus:border-sky-500

                    dark:border-white/10
                    dark:bg-[#1E293B]
                    dark:text-white
                  "
                />
              </div>
            </div>

            {/* FOOTER */}
            <div className="mt-8 flex justify-end gap-4">
              <button
                onClick={() => setEditingProduct(null)}
                className="
                  rounded-xl
                  border
                  border-gray-200
                  px-5
                  py-3
                  text-gray-700
                  transition
                  hover:bg-gray-100

                  dark:border-white/10
                  dark:text-gray-300
                  dark:hover:bg-white/5
                ">
                Batal
              </button>

              <button
                onClick={() => handleUpdateProduct(editingProduct)}
                className="rounded-xl bg-sky-500 px-6 py-3 font-semibold text-white transition hover:bg-sky-600">
                Simpan Perubahan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
