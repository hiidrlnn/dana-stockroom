"use client";

import { useEffect, useState } from "react";

import Card from "@/components/ui/card";

export default function ProfilPage() {
  const [user, setUser] = useState({
    nama: "",
    email: "",
    role: "",
    status: "",
  });

  useEffect(() => {
    const savedUser = localStorage.getItem("user");

    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  return (
    <div>
      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Profil Saya
        </h1>

        <p className="mt-2 text-gray-500 dark:text-gray-400">
          Informasi akun pengguna Dana Stockroom
        </p>
      </div>

      {/* CARD */}
      <Card className="border border-gray-200 bg-white dark:border-white/10 dark:bg-[#0F172A]">
        <div className="grid gap-10 lg:grid-cols-[320px_1fr]">

          {/* KIRI */}
          <div className="flex flex-col items-center border-b border-gray-200 pb-8 dark:border-white/10 lg:border-b-0 lg:border-r lg:pb-0 lg:pr-10">

            {/* AVATAR */}
            <div
              className="
                flex
                h-36
                w-36
                items-center
                justify-center
                rounded-full
                bg-sky-500
                text-5xl
                font-bold
                text-white
                shadow-lg
              "
            >
              {user.nama
                ? user.nama.charAt(0).toUpperCase()
                : "A"}
            </div>

            {/* NAMA */}
            <h2 className="mt-6 text-center text-2xl font-bold text-gray-900 dark:text-white">
              {user.nama}
            </h2>

            {/* EMAIL */}
            <p className="mt-2 text-center text-gray-500 dark:text-gray-400">
              {user.email}
            </p>

            {/* ROLE */}
            <span
              className="
                mt-4
                rounded-full
                bg-purple-100
                px-4
                py-2
                text-sm
                font-semibold
                text-purple-600

                dark:bg-purple-500/20
                dark:text-purple-400
              "
            >
              {user.role}
            </span>

            {/* STATUS */}
            <span
              className="
                mt-3
                rounded-full
                bg-green-100
                px-4
                py-2
                text-sm
                font-semibold
                text-green-600

                dark:bg-green-500/20
                dark:text-green-400
              "
            >
              {user.status}
            </span>
          </div>

          {/* KANAN */}
          <div>

            <h3 className="mb-6 text-xl font-bold text-gray-900 dark:text-white">
              Detail Akun
            </h3>

            <div className="grid gap-6">

              {/* ID */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-500 dark:text-gray-400">
                  Nama Lengkap
                </label>

                <div
                  className="
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
                  {user.nama}
                </div>
              </div>

              {/* EMAIL */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-500 dark:text-gray-400">
                  Email
                </label>

                <div
                  className="
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
                  {user.email}
                </div>
              </div>

              {/* ROLE */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-500 dark:text-gray-400">
                  Role
                </label>

                <div
                  className="
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
                  {user.role}
                </div>
              </div>

              {/* STATUS */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-500 dark:text-gray-400">
                  Status Akun
                </label>

                <div
                  className="
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
                  {user.status}
                </div>
              </div>

            </div>
          </div>

        </div>
      </Card>
    </div>
  );
}