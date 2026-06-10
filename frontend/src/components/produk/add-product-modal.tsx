"use client";

import { useState } from "react";

// Perbaikan: Definisi interface harus sesuai dengan yang di page.tsx
interface AddProductModalProps {
  onAddProduct: (product: {
    nama: string;
    kategori: string;
    size: string;
    harga_beli: number;
    harga_jual: number;
    stok: number;
    // Gunakan union type yang sama agar sinkron
    image?: File | string | null; 
  }) => Promise<void>;
}

export default function AddProductModal({ onAddProduct }: AddProductModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    nama: "",
    kategori: "",
    size: "38",
    harga_beli: "",
    harga_jual: "",
    stok: "",
  });

  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      
      // Mengirimkan data sesuai kontrak interface yang diperbarui
      await onAddProduct({
        nama: formData.nama,
        kategori: formData.kategori,
        size: formData.size,
        harga_beli: Number(formData.harga_beli) || 0,
        harga_jual: Number(formData.harga_jual) || 0,
        stok: Number(formData.stok) || 0,
        image: imageFile, // File | null ini sekarang kompatibel dengan File | string | null | undefined
      });
      
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
      <button
        onClick={() => setIsOpen(true)}
        className="rounded-xl bg-sky-500 px-6 py-3 font-semibold text-white transition hover:bg-sky-600 dark:bg-sky-600 dark:hover:bg-sky-700"
      >
        + Tambah Produk
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 px-4">
          <div className="w-full max-w-2xl rounded-2xl border border-gray-200 bg-white p-8 shadow-2xl dark:border-white/10 dark:bg-[#0F172A]">
            
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Tambah Produk Baru
                </h2>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-2xl text-gray-500 transition hover:text-black dark:text-gray-400 dark:hover:text-white"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* NAMA */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">Nama Produk</label>
                <input
                  type="text"
                  required
                  value={formData.nama}
                  onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
                  className="w-full rounded-xl border border-gray-200 bg-gray-100 px-4 py-3 text-gray-900 outline-none transition focus:border-sky-500 dark:border-white/10 dark:bg-[#1E293B] dark:text-white"
                />
              </div>

              {/* GRID INPUTAN LAINNYA */}
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">Size</label>
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
                  <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">Kategori</label>
                  <input
                    type="text"
                    required
                    value={formData.kategori}
                    onChange={(e) => setFormData({ ...formData, kategori: e.target.value })}
                    className="w-full rounded-xl border border-gray-200 bg-gray-100 px-4 py-3 text-gray-900 outline-none transition focus:border-sky-500 dark:border-white/10 dark:bg-[#1E293B] dark:text-white"
                  />
                </div>
              </div>

              {/* HARGA */}
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">Harga Beli</label>
                  <input
                    type="number"
                    required
                    value={formData.harga_beli}
                    onChange={(e) => setFormData({ ...formData, harga_beli: e.target.value })}
                    className="w-full rounded-xl border border-gray-200 bg-gray-100 px-4 py-3 text-gray-900 outline-none transition focus:border-sky-500 dark:border-white/10 dark:bg-[#1E293B] dark:text-white"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">Harga Jual</label>
                  <input
                    type="number"
                    required
                    value={formData.harga_jual}
                    onChange={(e) => setFormData({ ...formData, harga_jual: e.target.value })}
                    className="w-full rounded-xl border border-gray-200 bg-gray-100 px-4 py-3 text-gray-900 outline-none transition focus:border-sky-500 dark:border-white/10 dark:bg-[#1E293B] dark:text-white"
                  />
                </div>
              </div>

              {/* STOK & FILE */}
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">Stok Awal</label>
                  <input
                    type="number"
                    required
                    value={formData.stok}
                    onChange={(e) => setFormData({ ...formData, stok: e.target.value })}
                    className="w-full rounded-xl border border-gray-200 bg-gray-100 px-4 py-3 text-gray-900 outline-none transition focus:border-sky-500 dark:border-white/10 dark:bg-[#1E293B] dark:text-white"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">Foto Produk</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        setImageFile(e.target.files[0]);
                      }
                    }}
                    className="w-full rounded-xl border border-gray-200 bg-gray-100 px-4 py-[7px] text-gray-900 outline-none transition focus:border-sky-500 dark:border-white/10 dark:bg-[#1E293B] dark:text-white"
                  />
                </div>
              </div>

              <div className="mt-8 flex justify-end gap-4">
                <button type="button" onClick={() => setIsOpen(false)} className="rounded-xl border border-gray-200 px-5 py-3 text-gray-700 dark:border-white/10 dark:text-gray-300">Batal</button>
                <button type="submit" disabled={loading} className="rounded-xl bg-sky-500 px-6 py-3 font-semibold text-white">
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