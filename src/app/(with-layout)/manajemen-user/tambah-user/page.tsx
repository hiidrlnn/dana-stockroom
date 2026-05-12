"use client";

import { useState } from "react";

import Card from "@/components/ui/card";

export default function TambahUserPage() {
  const [form, setForm] = useState({
    nama: "",
    email: "",
    password: "",
    role: "Kasir",
    status: "Aktif",
  });

  const handleSubmit = () => {
    if (!form.nama || !form.email || !form.password) {
      alert("Semua field wajib diisi");
      return;
    }

    alert("User berhasil ditambahkan");

    setForm({
      nama: "",
      email: "",
      password: "",
      role: "Kasir",
      status: "Aktif",
    });
  };

  return (
    <div>
      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Tambah User
        </h1>

        <p className="mt-2 text-gray-500 dark:text-gray-400">
          Tambahkan user baru ke sistem Dana Stockroom
        </p>
      </div>

      {/* CARD */}
      <Card className="max-w-3xl border border-gray-200 bg-white shadow-sm dark:border-white/10 dark:bg-[#0F172A]">
        <div className="space-y-6">
          {/* NAMA */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Nama Lengkap
            </label>

            <input
              type="text"
              placeholder="Masukkan nama lengkap"
              value={form.nama}
              onChange={(e) =>
                setForm({
                  ...form,
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

          {/* EMAIL */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Email
            </label>

            <input
              type="email"
              placeholder="Masukkan email"
              value={form.email}
              onChange={(e) =>
                setForm({
                  ...form,
                  email: e.target.value,
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

          {/* PASSWORD */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Password
            </label>

            <input
              type="password"
              placeholder="Masukkan password"
              value={form.password}
              onChange={(e) =>
                setForm({
                  ...form,
                  password: e.target.value,
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

          {/* ROLE */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Role
            </label>

            <select
              value={form.role}
              onChange={(e) =>
                setForm({
                  ...form,
                  role: e.target.value,
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
              <option>Owner</option>
              <option>Admin</option>
              <option>Kasir</option>
            </select>
          </div>

          {/* STATUS */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Status
            </label>

            <select
              value={form.status}
              onChange={(e) =>
                setForm({
                  ...form,
                  status: e.target.value,
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
              <option>Aktif</option>
              <option>Nonaktif</option>
            </select>
          </div>

          {/* BUTTON */}
          <div className="flex justify-end">
            <button
              onClick={handleSubmit}
              className="
                rounded-xl
                bg-sky-500
                px-6
                py-3
                font-semibold
                text-white
                transition
                hover:bg-sky-600
              ">
              Simpan User
            </button>
          </div>
        </div>
      </Card>
    </div>
  );
}
