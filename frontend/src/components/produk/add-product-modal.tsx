"use client";

import { useRef, useState } from "react";

type ProductType = {
  id: number;
  nama: string;
  kategori: string;
  size: string;
  harga: number;
  stok: number;
  status: string;
};

type Props = {
  onAddProduct: (product: ProductType) => void;
};

export default function AddProductModal({ onAddProduct }: Props) {
  const [open, setOpen] = useState(false);

  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const [form, setForm] = useState({
    nama: "",
    kategori: "Sneakers",
    size: "42",
    harga: "",
    stok: "",
    deskripsi: "",
  });

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      const imageUrl = URL.createObjectURL(file);

      setImagePreview(imageUrl);
    }
  };

  const handleSave = () => {
    const stokNumber = Number(form.stok);

    if (
      !form.nama ||
      !form.kategori ||
      !form.size ||
      !form.harga ||
      !form.stok
    ) {
      alert("Semua field wajib diisi");

      return;
    }

    onAddProduct({
      id: Date.now(),
      nama: form.nama,
      kategori: form.kategori,
      size: form.size,
      harga: Number(form.harga),
      stok: stokNumber,

      status:
        stokNumber <= 0
          ? "Habis"
          : stokNumber <= 5
            ? "Stok Menipis"
            : "Tersedia",
    });

    setForm({
      nama: "",
      kategori: "Sneakers",
      size: "42",
      harga: "",
      stok: "",
      deskripsi: "",
    });

    setImagePreview(null);

    setOpen(false);
  };

  return (
    <>
      {/* Button */}
      <button
        onClick={() => setOpen(true)}
        className="rounded-xl bg-sky-500 px-5 py-3 font-semibold text-white transition hover:bg-sky-600">
        + Tambah Produk
      </button>

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 px-4">
          <div className="w-full max-w-5xl rounded-2xl border border-white/10 bg-[#0F172A] p-8 shadow-2xl">
            {/* Header */}
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-white">Tambah Produk</h2>

                <p className="mt-1 text-sm text-gray-400">
                  Tambahkan produk baru ke sistem
                </p>
              </div>

              <button
                onClick={() => setOpen(false)}
                className="text-2xl text-gray-400 transition hover:text-white">
                ×
              </button>
            </div>

            {/* Content */}
            <div className="grid gap-8 lg:grid-cols-2">
              {/* Form */}
              <div className="space-y-5">
                {/* Nama */}
                <div>
                  <label className="mb-2 block text-sm text-gray-300">
                    Nama Produk
                  </label>

                  <input
                    type="text"
                    placeholder="Nike Air Force 1"
                    value={form.nama}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        nama: e.target.value,
                      })
                    }
                    className="w-full rounded-xl border border-white/10 bg-[#1E293B] px-4 py-3 text-white outline-none transition focus:border-sky-500"
                  />
                </div>

                {/* Kategori */}
                <div>
                  <label className="mb-2 block text-sm text-gray-300">
                    Kategori
                  </label>

                  <select
                    value={form.kategori}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        kategori: e.target.value,
                      })
                    }
                    className="w-full rounded-xl border border-white/10 bg-[#1E293B] px-4 py-3 text-white outline-none transition focus:border-sky-500">
                    <option>Sneakers</option>
                    <option>Running</option>
                    <option>Casual</option>
                    <option>Classic</option>
                  </select>
                </div>

                {/* Size */}
                <div>
                  <label className="mb-2 block text-sm text-gray-300">
                    Size Sepatu
                  </label>

                  <select
                    value={form.size}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        size: e.target.value,
                      })
                    }
                    className="w-full rounded-xl border border-white/10 bg-[#1E293B] px-4 py-3 text-white outline-none transition focus:border-sky-500">
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

                {/* Harga & Stok */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="mb-2 block text-sm text-gray-300">
                      Harga
                    </label>

                    <input
                      type="number"
                      placeholder="1500000"
                      value={form.harga}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          harga: e.target.value,
                        })
                      }
                      className="w-full rounded-xl border border-white/10 bg-[#1E293B] px-4 py-3 text-white outline-none transition focus:border-sky-500"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm text-gray-300">
                      Stok
                    </label>

                    <input
                      type="number"
                      placeholder="10"
                      value={form.stok}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          stok: e.target.value,
                        })
                      }
                      className="w-full rounded-xl border border-white/10 bg-[#1E293B] px-4 py-3 text-white outline-none transition focus:border-sky-500"
                    />
                  </div>
                </div>

                {/* Deskripsi */}
                <div>
                  <label className="mb-2 block text-sm text-gray-300">
                    Deskripsi
                  </label>

                  <textarea
                    rows={5}
                    placeholder="Deskripsi produk..."
                    value={form.deskripsi}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        deskripsi: e.target.value,
                      })
                    }
                    className="w-full rounded-xl border border-white/10 bg-[#1E293B] px-4 py-3 text-white outline-none transition focus:border-sky-500"
                  />
                </div>
              </div>

              {/* Upload */}
              <div>
                <label className="mb-2 block text-sm text-gray-300">
                  Upload Foto Produk
                </label>

                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="flex h-[420px] cursor-pointer items-center justify-center rounded-2xl border-2 border-dashed border-white/10 bg-[#1E293B] transition hover:border-sky-500">
                  {imagePreview ? (
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="h-full w-full rounded-2xl object-cover"
                    />
                  ) : (
                    <div className="text-center">
                      <p className="text-lg font-semibold text-white">
                        Upload Gambar
                      </p>

                      <p className="mt-2 text-sm text-gray-400">
                        Klik untuk upload foto produk
                      </p>
                    </div>
                  )}
                </div>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={handleImageChange}
                />
              </div>
            </div>

            {/* Footer */}
            <div className="mt-8 flex justify-end gap-4">
              <button
                onClick={() => setOpen(false)}
                className="rounded-xl border border-white/10 px-5 py-3 text-gray-300 transition hover:bg-white/5">
                Batal
              </button>

              <button
                onClick={handleSave}
                className="rounded-xl bg-sky-500 px-6 py-3 font-semibold text-white transition hover:bg-sky-600">
                Simpan Produk
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
