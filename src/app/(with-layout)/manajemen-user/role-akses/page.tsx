"use client";

import Card from "@/components/ui/card";

type RoleType = {
  id: number;
  role: string;
  color: string;
  permissions: string[];
};

export default function RoleHakAksesPage() {
  const roles: RoleType[] = [
    {
      id: 1,
      role: "Owner",
      color: "purple",
      permissions: [
        "Kelola Produk",
        "Kelola Transaksi",
        "Kelola User",
        "Kelola Laporan",
        "Kelola Pengaturan",
      ],
    },

    {
      id: 2,
      role: "Admin",
      color: "red",
      permissions: ["Kelola Produk", "Kelola Transaksi", "Kelola Laporan"],
    },

    {
      id: 3,
      role: "Kasir",
      color: "sky",
      permissions: ["Kelola Transaksi"],
    },
  ];

  return (
    <div>
      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Role & Hak Akses
        </h1>

        <p className="mt-2 text-gray-500 dark:text-gray-400">
          Kelola role dan hak akses user Dana Stockroom
        </p>
      </div>

      {/* GRID */}
      <div className="grid gap-6 lg:grid-cols-3">
        {roles.map((item) => (
          <Card
            key={item.id}
            className="
              border
              border-gray-200
              bg-white
              shadow-sm

              dark:border-white/10
              dark:bg-[#0F172A]
            ">
            {/* ROLE */}
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {item.role}
                </h2>

                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  Hak akses pengguna
                </p>
              </div>

              <span
                className={`
                  rounded-full
                  px-4
                  py-2
                  text-sm
                  font-semibold

                  ${
                    item.color === "purple"
                      ? "bg-purple-100 text-purple-600 dark:bg-purple-500/20 dark:text-purple-400"
                      : item.color === "red"
                        ? "bg-red-100 text-red-600 dark:bg-red-500/20 dark:text-red-400"
                        : "bg-sky-100 text-sky-600 dark:bg-sky-500/20 dark:text-sky-400"
                  }
                `}>
                {item.role}
              </span>
            </div>

            {/* PERMISSION */}
            <div className="space-y-3">
              {item.permissions.map((permission) => (
                <div
                  key={permission}
                  className="
                    flex
                    items-center
                    gap-3
                    rounded-xl
                    border
                    border-gray-200
                    bg-gray-100
                    px-4
                    py-3

                    dark:border-white/10
                    dark:bg-[#1E293B]
                  ">
                  {/* DOT */}
                  <div
                    className={`
                      h-3
                      w-3
                      rounded-full

                      ${
                        item.color === "purple"
                          ? "bg-purple-500"
                          : item.color === "red"
                            ? "bg-red-500"
                            : "bg-sky-500"
                      }
                    `}
                  />

                  {/* TEXT */}
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {permission}
                  </p>
                </div>
              ))}
            </div>

            {/* FOOTER */}
            <div className="mt-8 flex gap-3">
              <button
                className="
                  flex-1
                  rounded-xl
                  bg-sky-500
                  px-4
                  py-3
                  font-semibold
                  text-white
                  transition
                  hover:bg-sky-600
                ">
                Edit Role
              </button>

              <button
                className="
                  rounded-xl
                  border
                  border-gray-200
                  px-4
                  py-3
                  font-semibold
                  text-gray-700
                  transition
                  hover:bg-gray-100

                  dark:border-white/10
                  dark:text-gray-300
                  dark:hover:bg-white/5
                ">
                Hapus
              </button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
