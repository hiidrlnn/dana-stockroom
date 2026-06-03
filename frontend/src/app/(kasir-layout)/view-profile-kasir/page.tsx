"use client";

import { useEffect, useState } from "react";

type UserType = {
  nama: string;
  email: string;
  role: string;
  status: string;
};

export default function ViewProfileKasirPage() {
  const [user, setUser] = useState<UserType>({
    nama: "Kasir",
    email: "kasir@danastockroom.com",
    role: "Kasir",
    status: "Aktif",
  });

  useEffect(() => {
    const userData = localStorage.getItem("user");

    if (userData) {
      try {
        const parsed = JSON.parse(userData);

        setUser({
          nama: parsed.nama || "Kasir",
          email: parsed.email || "kasir@danastockroom.com",
          role: parsed.role || "Kasir",
          status: parsed.status || "Aktif",
        });
      } catch (error) {
        console.error(error);
      }
    }
  }, []);

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
          View Profile
        </h1>

        <p className="mt-2 text-gray-500 dark:text-gray-400">
          Informasi akun kasir Dana Stockroom
        </p>
      </div>

      {/* CARD */}
      <div
        className="
          rounded-3xl
          border
          border-gray-200
          bg-white
          p-8
          shadow-sm

          dark:border-white/10
          dark:bg-[#0F172A]
        "
      >
        <div className="flex flex-col gap-8 md:flex-row">
          {/* AVATAR */}
          <div className="flex justify-center">
            <div
              className="
                flex
                h-32
                w-32
                items-center
                justify-center
                rounded-full
                bg-sky-500
                text-5xl
                font-bold
                text-white
              "
            >
              {user.nama.charAt(0).toUpperCase()}
            </div>
          </div>

          {/* INFO */}
          <div className="flex-1 space-y-6">
            <ProfileField
              label="Nama Lengkap"
              value={user.nama}
            />

            <ProfileField
              label="Email"
              value={user.email}
            />

            <ProfileField
              label="Role"
              value={user.role}
            />

            <ProfileField
              label="Status"
              value={user.status}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function ProfileField({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-gray-500 dark:text-gray-400">
        {label}
      </label>

      <div
        className="
          rounded-2xl
          border
          border-gray-200
          bg-gray-50
          px-5
          py-4
          text-slate-900

          dark:border-white/10
          dark:bg-[#081028]
          dark:text-white
        "
      >
        {value}
      </div>
    </div>
  );
}