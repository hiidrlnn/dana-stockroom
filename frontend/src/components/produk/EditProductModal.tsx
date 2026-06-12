"use client";

import Image from "next/image";
import { useState } from "react";

type ProductType = {
  id: number;
  sku: string;
  nama: string;
  kategori: string;
  size: string;
  harga_beli: number;
  harga_jual: number;
  stok: number;
  status: string;
  image?: string | File | null;
};

type Props = {
  product: ProductType;
  onClose: () => void;
  onSave: (product: ProductType, image: File | null) => Promise<void>;
};

export default function EditProductModal({ product, onClose, onSave }: Props) {
  const [formData, setFormData] = useState(product);

  const [imageFile, setImageFile] = useState<File | null>(null);

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 px-4">
      <div className="w-full max-w-2xl rounded-2xl bg-white p-8 dark:bg-[#0F172A]">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold dark:text-white">Edit Produk</h2>

          <button onClick={onClose} className="text-2xl text-gray-500">
            ×
          </button>
        </div>

        <div className="grid gap-4">
          <input
            value={formData.nama}
            onChange={(e) =>
              setFormData({
                ...formData,
                nama: e.target.value,
              })
            }
            placeholder="Nama Produk"
            className="rounded-xl border p-3"
          />

          <input
            value={formData.kategori}
            onChange={(e) =>
              setFormData({
                ...formData,
                kategori: e.target.value,
              })
            }
            placeholder="Kategori"
            className="rounded-xl border p-3"
          />

          <input
            value={formData.size}
            onChange={(e) =>
              setFormData({
                ...formData,
                size: e.target.value,
              })
            }
            placeholder="Size"
            className="rounded-xl border p-3"
          />

          <input
            type="number"
            value={formData.harga_beli}
            onChange={(e) =>
              setFormData({
                ...formData,
                harga_beli: Number(e.target.value),
              })
            }
            className="rounded-xl border p-3"
          />

          <input
            type="number"
            value={formData.harga_jual}
            onChange={(e) =>
              setFormData({
                ...formData,
                harga_jual: Number(e.target.value),
              })
            }
            className="rounded-xl border p-3"
          />

          <input
            type="number"
            value={formData.stok}
            onChange={(e) =>
              setFormData({
                ...formData,
                stok: Number(e.target.value),
              })
            }
            className="rounded-xl border p-3"
          />

          {typeof formData.image === "string" && (
            <div className="relative h-32 w-32 overflow-hidden rounded-xl">
              <Image
                src={`http://127.0.0.1:8000/storage/${formData.image}`}
                alt="Preview"
                fill
                className="object-cover"
              />
            </div>
          )}

          <input
            type="file"
            onChange={(e) => setImageFile(e.target.files?.[0] || null)}
          />

          <div className="flex justify-end gap-3">
            <button
              onClick={onClose}
              className="rounded-xl bg-gray-300 px-5 py-2"
            >
              Batal
            </button>

            <button
              onClick={() => onSave(formData, imageFile)}
              className="rounded-xl bg-sky-500 px-5 py-2 text-white"
            >
              Simpan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
