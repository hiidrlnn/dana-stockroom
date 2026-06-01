"use client";

import { useState } from "react";

// Tipe data input produk yang dikirim ke fungsi onAddProduct
type ProductInputType = {
  nama: string;
  kategori: string;
  size: string;
  harga_beli: number;
  harga_jual: number;
  stok: number;
  image: File | null; 
};

interface AddProductModalProps {
  onAddProduct: (product: ProductInputType) => Promise<void>;
}

export default function AddProductModal({ onAddProduct }: AddProductModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  
  // State form teks & angka (diinisialisasi string kosong agar input nyaman saat diketik)
  const [formData, setFormData] = useState({
    nama: "",
    kategori: "",
    size: "38",
    harga_beli: "",
    harga_jual: "",
    stok: "",
  });

  // State khusus menampung file gambar binary mentah
  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      
      // Mengirimkan gabungan text input (dikonversi ke Number) beserta file gambar asli ke page utama
      await onAddProduct({
        nama: formData.nama,
        kategori: formData.kategori,
        size: formData.size,
        harga_beli: Number(formData.harga_beli) || 0,
        harga_jual: Number(formData.harga_jual) || 0,
        stok: Number(formData.stok) || 0,
        image: imageFile,
      });
      
      // Reset form & tutup modal jika berhasil
      setFormData({
        nama: "",
        kategori: "",
        size: "38",
        harga_beli: "",
        harga_jual: "",
        stok: "",
      });
      setImageFile(null);
      setIsOpen(false);
    } catch (error) {
      console.error("Gagal menambahkan produk:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* TOMBOL MEMBUKA MODAL */}
      <button
        onClick={() => setIsOpen(true)}
        className="rounded-xl bg-sky-500 px-6 py-3 font-semibold text-white transition hover:bg-sky-600 dark:bg-sky-600 dark:hover:bg-sky-700"
      >
        + Tambah Produk
      </button>

      {/* BACKDROP & MODAL BOX */}
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 px-4">
          <div className="w-full max-w-2xl rounded-2xl border border-gray-200 bg-white p-8 shadow-2xl dark:border-white/10 dark:bg-[#0F172A]">
            
            {/* HEADER */}
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Tambah Produk Baru
                </h2>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  Masukkan data produk baru untuk Dana Stockroom
                </p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-2xl text-gray-500 transition hover:text-black dark:text-gray-400 dark:hover:text-white"
              >
                ×
              </button>
            </div>

            {/* FORM */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* NAMA */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Nama Produk
                </label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Nike Air Jordan 1"
                  value={formData.nama}
                  onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
                  className="w-full rounded-xl border border-gray-200 bg-gray-100 px-4 py-3 text-gray-900 outline-none transition focus:border-sky-500 dark:border-white/10 dark:bg-[#1E293B] dark:text-white"
                />
              </div>

              {/* SIZE & KATEGORI (GRID) */}
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Size
                  </label>
                  <select
                    value={formData.size}
                    onChange={(e) => setFormData({ ...formData, size: e.target.value })}
                    className="w-full rounded-xl border border-gray-200 bg-gray-100 px-4 py-3 text-gray-900 outline-none transition focus:border-sky-500 dark:border-white/10 dark:bg-[#1E293B] dark:text-white"
                  >
                    {["38", "39", "40", "41", "42", "43", "44", "45"].map((sz) => (
                      <option key={sz} value={sz}>{sz}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Kategori
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Sneakers"
                    value={formData.kategori}
                    onChange={(e) => setFormData({ ...formData, kategori: e.target.value })}
                    className="w-full rounded-xl border border-gray-200 bg-gray-100 px-4 py-3 text-gray-900 outline-none transition focus:border-sky-500 dark:border-white/10 dark:bg-[#1E293B] dark:text-white"
                  />
                </div>
              </div>

              {/* HARGA BELI & HARGA JUAL */}
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Harga Beli (Modal HPP)
                  </label>
                  <input
                    type="number"
                    required
                    min="0"
                    placeholder="Masukkan harga beli"
                    value={formData.harga_beli}
                    onChange={(e) => setFormData({ ...formData, harga_beli: e.target.value })}
                    className="w-full rounded-xl border border-gray-200 bg-gray-100 px-4 py-3 text-gray-900 outline-none transition focus:border-sky-500 dark:border-white/10 dark:bg-[#1E293B] dark:text-white"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Harga Jual (Ke Konsumen)
                  </label>
                  <input
                    type="number"
                    required
                    min="0"
                    placeholder="Masukkan harga jual"
                    value={formData.harga_jual}
                    onChange={(e) => setFormData({ ...formData, harga_jual: e.target.value })}
                    className="w-full rounded-xl border border-gray-200 bg-gray-100 px-4 py-3 text-gray-900 outline-none transition focus:border-sky-500 dark:border-white/10 dark:bg-[#1E293B] dark:text-white"
                  />
                </div>
              </div>

              {/* STOK DAN INPUT FILE GAMBAR */}
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Stok Awal
                  </label>
                  <input
                    type="number"
                    required
                    min="0"
                    placeholder="0"
                    value={formData.stok}
                    onChange={(e) => setFormData({ ...formData, stok: e.target.value })}
                    className="w-full rounded-xl border border-gray-200 bg-gray-100 px-4 py-3 text-gray-900 outline-none transition focus:border-sky-500 dark:border-white/10 dark:bg-[#1E293B] dark:text-white"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Foto Produk
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        setImageFile(e.target.files[0]);
                      }
                    }}
                    className="w-full rounded-xl border border-gray-200 bg-gray-100 px-4 py-[7px] text-gray-900 outline-none transition focus:border-sky-500 dark:border-white/10 dark:bg-[#1E293B] dark:text-white file:mr-3 file:rounded-lg file:border-0 file:bg-sky-50 file:px-3 file:py-1.5 file:text-xs file:font-semibold file:text-sky-700 hover:file:bg-sky-100 dark:file:bg-sky-500/10 dark:file:text-sky-400"
                  />
                </div>
              </div>

              {/* FOOTER ACTION */}
              <div className="mt-8 flex justify-end gap-4">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="rounded-xl border border-gray-200 px-5 py-3 text-gray-700 transition hover:bg-gray-100 dark:border-white/10 dark:text-gray-300 dark:hover:bg-white/5"
                >
                  Batal
                </button>

                <button
                  type="submit"
                  disabled={loading}
                  className="rounded-xl bg-sky-500 px-6 py-3 font-semibold text-white transition hover:bg-sky-600 disabled:opacity-50"
                >
                  {loading ? "Menyimpan..." : "Tambah Produk"}
                </button>
              </div>
            </form>

          </div>
        </div>
      )}
    </>
  );
}