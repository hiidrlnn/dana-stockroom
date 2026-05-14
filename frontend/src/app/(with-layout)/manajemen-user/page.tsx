"use client";

import { useMemo, useState } from "react";

import Card from "@/components/ui/card";

import DataTable from "@/components/tabel/data-table";

type UserType = {
  id: number;
  nama: string;
  email: string;
  role: string;
  status: string;
  lastLogin: string;
};

export default function ManajemenUserPage() {
  const [search, setSearch] = useState("");

  const [users, setUsers] = useState<UserType[]>([
    {
      id: 1,
      nama: "Dirlan",
      email: "dirlan@gmail.com",
      role: "Owner",
      status: "Aktif",
      lastLogin: "10 Mei 2026",
    },

    {
      id: 2,
      nama: "Andi Saputra",
      email: "andi@gmail.com",
      role: "Admin",
      status: "Aktif",
      lastLogin: "09 Mei 2026",
    },

    {
      id: 3,
      nama: "Rizky",
      email: "rizky@gmail.com",
      role: "Kasir",
      status: "Nonaktif",
      lastLogin: "07 Mei 2026",
    },

    {
      id: 4,
      nama: "Budi",
      email: "budi@gmail.com",
      role: "Kasir",
      status: "Aktif",
      lastLogin: "06 Mei 2026",
    },
  ]);

  const filteredUsers = useMemo(() => {
    return users.filter(
      (item) =>
        item.nama.toLowerCase().includes(search.toLowerCase()) ||
        item.email.toLowerCase().includes(search.toLowerCase()) ||
        item.role.toLowerCase().includes(search.toLowerCase()),
    );
  }, [users, search]);

  const handleDeleteUser = (id: number, nama: string) => {
    const confirmDelete = confirm(`Hapus user ${nama}?`);

    if (confirmDelete) {
      setUsers((prev) => prev.filter((item) => item.id !== id));
    }
  };

  return (
    <div>
      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Semua User
        </h1>

        <p className="mt-2 text-gray-500 dark:text-gray-400">
          Kelola semua user Dana Stockroom
        </p>
      </div>

      {/* CARD */}
      <Card className="border border-gray-200 bg-white shadow-sm dark:border-white/10 dark:bg-[#0F172A]">
        {/* SEARCH */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Cari nama, email, role..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
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

        {/* TABLE */}
        <div className="overflow-x-auto">
          <div className="min-w-[1000px]">
            <DataTable
              headers={[
                "Nama",
                "Email",
                "Role",
                "Status",
                "Last Login",
                "Action",
              ]}>
              {filteredUsers.map((user) => (
                <tr
                  key={user.id}
                  className="border-b border-gray-200 dark:border-white/5">
                  {/* NAMA */}
                  <td className="py-5">
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-sky-500 text-lg font-bold text-white">
                        {user.nama.charAt(0)}
                      </div>

                      <div>
                        <p className="font-semibold text-gray-900 dark:text-white">
                          {user.nama}
                        </p>

                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                          Dana Stockroom
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* EMAIL */}
                  <td className="py-5 text-gray-700 dark:text-gray-300">
                    {user.email}
                  </td>

                  {/* ROLE */}
                  <td className="py-5">
                    <span
                      className={`
                        rounded-full
                        px-3
                        py-1
                        text-xs
                        font-semibold

                        ${
                          user.role === "Owner"
                            ? "bg-purple-100 text-purple-600 dark:bg-purple-500/20 dark:text-purple-400"
                            : user.role === "Admin"
                              ? "bg-red-100 text-red-600 dark:bg-red-500/20 dark:text-red-400"
                              : "bg-sky-100 text-sky-600 dark:bg-sky-500/20 dark:text-sky-400"
                        }
                      `}>
                      {user.role}
                    </span>
                  </td>

                  {/* STATUS */}
                  <td className="py-5">
                    <span
                      className={`
                        rounded-full
                        px-3
                        py-1
                        text-xs
                        font-semibold

                        ${
                          user.status === "Aktif"
                            ? "bg-green-100 text-green-600 dark:bg-green-500/20 dark:text-green-400"
                            : "bg-gray-200 text-gray-600 dark:bg-gray-500/20 dark:text-gray-300"
                        }
                      `}>
                      {user.status}
                    </span>
                  </td>

                  {/* LAST LOGIN */}
                  <td className="py-5 text-gray-700 dark:text-gray-300">
                    {user.lastLogin}
                  </td>

                  {/* ACTION */}
                  <td className="py-5">
                    <div className="flex items-center gap-3">
                      <button
                        className="
                          rounded-lg
                          bg-sky-100
                          px-4
                          py-2
                          text-sm
                          font-medium
                          text-sky-600
                          transition
                          hover:bg-sky-200

                          dark:bg-sky-500/20
                          dark:text-sky-400
                          dark:hover:bg-sky-500/30
                        ">
                        Edit
                      </button>

                      <button
                        onClick={() => handleDeleteUser(user.id, user.nama)}
                        className="
                          rounded-lg
                          bg-red-100
                          px-4
                          py-2
                          text-sm
                          font-medium
                          text-red-600
                          transition
                          hover:bg-red-200

                          dark:bg-red-500/20
                          dark:text-red-400
                          dark:hover:bg-red-500/30
                        ">
                        Hapus
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </DataTable>
          </div>
        </div>
      </Card>
    </div>
  );
}
