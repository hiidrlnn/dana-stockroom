"use client";

import { useState } from "react";
import Card from "@/components/ui/card";

const API_URL =
  "http://127.0.0.1:8000/api/users";

export default function TambahUserPage() {
  const [loading, setLoading] =
    useState(false);

  const [form, setForm] =
    useState({
      nama: "",
      email: "",
      password: "",
      role: "Kasir",
      status: "Aktif",
    });

  const handleSubmit = async () => {
    if (
      !form.nama ||
      !form.email ||
      !form.password
    ) {
      alert(
        "Semua field wajib diisi"
      );
      return;
    }

    try {
      setLoading(true);

      const response =
        await fetch(API_URL, {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify(
            form
          ),
        });

      const result =
        await response.json();

      if (!response.ok) {
        throw new Error(
          result.message ||
            "Gagal menambahkan user"
        );
      }

      alert(
        "User berhasil ditambahkan"
      );

      setForm({
        nama: "",
        email: "",
        password: "",
        role: "Kasir",
        status: "Aktif",
      });
    } catch (error: any) {
      console.error(error);

      alert(
        error.message ||
          "Terjadi kesalahan"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Tambah User
        </h1>

        <p className="mt-2 text-gray-500 dark:text-gray-400">
          Tambahkan user baru ke sistem Dana
          Stockroom
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
                outline-none
                focus:border-sky-500

                dark:border-white/10
                dark:bg-[#1E293B]
                dark:text-white
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
                outline-none
                focus:border-sky-500

                dark:border-white/10
                dark:bg-[#1E293B]
                dark:text-white
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
                  password:
                    e.target.value,
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
                focus:border-sky-500

                dark:border-white/10
                dark:bg-[#1E293B]
                dark:text-white
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

                dark:border-white/10
                dark:bg-[#1E293B]
                dark:text-white
              "
            >
              <option value="Owner">
                Owner
              </option>

              <option value="Admin">
                Admin
              </option>

              <option value="Kasir">
                Kasir
              </option>
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
                  status:
                    e.target.value,
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

                dark:border-white/10
                dark:bg-[#1E293B]
                dark:text-white
              "
            >
              <option value="Aktif">
                Aktif
              </option>

              <option value="Nonaktif">
                Nonaktif
              </option>
            </select>
          </div>

          {/* BUTTON */}
          <div className="flex justify-end">
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="
                rounded-xl
                bg-sky-500
                px-6
                py-3
                font-semibold
                text-white
                transition
                hover:bg-sky-600
                disabled:cursor-not-allowed
                disabled:opacity-50
              "
            >
              {loading
                ? "Menyimpan..."
                : "Simpan User"}
            </button>
          </div>

        </div>
      </Card>
    </div>
  );
}