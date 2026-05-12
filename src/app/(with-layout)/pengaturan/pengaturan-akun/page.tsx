"use client";

import { useState } from "react";

import Card from "@/components/ui/card";

export default function PengaturanAkunPage() {
  const [form, setForm] = useState({
    nama: "Dirlan",
    username: "dirlanstore",
    email: "dirlan@gmail.com",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = () => {
    alert("Pengaturan akun berhasil disimpan!");
  };

  return (
    <div>
      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Pengaturan Akun
        </h1>

        <p className="mt-2 text-gray-500 dark:text-gray-400">
          Kelola informasi akun admin Dana Stockroom
        </p>
      </div>

      {/* CARD */}
      <Card className="border border-gray-200 bg-white dark:border-white/10 dark:bg-[#0F172A]">
        <div className="grid gap-10 lg:grid-cols-[280px_1fr]">
          {/* PROFILE */}
          <div className="flex flex-col items-center border-b border-gray-200 pb-8 dark:border-white/10 lg:border-b-0 lg:border-r lg:pb-0 lg:pr-10">
            {/* AVATAR */}
            <div
              className="
                flex
                h-32
                w-32
                items-center
                justify-center
                rounded-full
                bg-sky-500
                text-4xl
                font-bold
                text-white
                shadow-lg
              ">
              D
            </div>

            {/* INFO */}
            <h2 className="mt-5 text-2xl font-bold text-gray-900 dark:text-white">
              {form.nama}
            </h2>

            <p className="mt-2 text-gray-500 dark:text-gray-400">
              Owner Dana Stockroom
            </p>

            {/* BUTTON */}
            <button
              className="
                mt-6
                rounded-xl
                border
                border-gray-200
                px-5
                py-3
                text-sm
                font-medium
                text-gray-700
                transition
                hover:bg-gray-100

                dark:border-white/10
                dark:text-gray-300
                dark:hover:bg-white/5
              ">
              Upload Foto
            </button>
          </div>

          {/* FORM */}
          <div>
            <div className="grid gap-6 md:grid-cols-2">
              {/* NAMA */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Nama Lengkap
                </label>

                <input
                  type="text"
                  name="nama"
                  value={form.nama}
                  onChange={handleChange}
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

              {/* USERNAME */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Username
                </label>

                <input
                  type="text"
                  name="username"
                  value={form.username}
                  onChange={handleChange}
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

              {/* EMAIL */}
              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Email
                </label>

                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
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

              {/* PASSWORD */}
              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Password Baru
                </label>

                <input
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Masukkan password baru"
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
            </div>

            {/* ACTION */}
            <div className="mt-8 flex justify-end">
              <button
                onClick={handleSave}
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
                Simpan Perubahan
              </button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
