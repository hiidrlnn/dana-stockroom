"use client";

import { useEffect, useMemo, useState } from "react";

import Card from "@/components/ui/card";
import DataTable from "@/components/tabel/data-table";

const API_URL =
  "http://127.0.0.1:8000/api/users";

type UserType = {
  id: number;
  nama: string;
  email: string;
  role: string;
  status: string;
  lastLogin: string;
};

export default function ManajemenUserPage() {
  const [search, setSearch] =
    useState("");

  const [loading, setLoading] =
    useState(true);

  const [users, setUsers] =
    useState<UserType[]>([]);

    const [showEditModal, setShowEditModal] =
  useState(false);

const [selectedUser, setSelectedUser] =
  useState<any>(null);

const [editForm, setEditForm] =
  useState({
    nama: "",
    email: "",
    role: "Kasir",
    status: "Aktif",
    password: "",
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);

      const response =
        await fetch(API_URL, {
          cache: "no-store",
        });

      if (!response.ok) {
        throw new Error(
          "Gagal mengambil data user"
        );
      }

      const data =
        await response.json();

      const mappedUsers =
        data.map((user: any) => ({
          id: user.id,
          nama: user.nama,
          email: user.email,
          role: user.role,
          status: user.status,

          lastLogin: new Date(
            user.updated_at
          ).toLocaleString("id-ID", {
            day: "2-digit",
            month: "long",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          }),
        }));

      setUsers(mappedUsers);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const filteredUsers =
    useMemo(() => {
      return users.filter(
        (item) =>
          item.nama
            .toLowerCase()
            .includes(
              search.toLowerCase()
            ) ||
          item.email
            .toLowerCase()
            .includes(
              search.toLowerCase()
            ) ||
          item.role
            .toLowerCase()
            .includes(
              search.toLowerCase()
            )
      );
    }, [users, search]);

  const handleDeleteUser =
    async (
      id: number,
      nama: string
    ) => {
      const confirmDelete =
        confirm(
          `Hapus user ${nama}?`
        );

      if (!confirmDelete) return;

      try {
        const response =
          await fetch(
            `${API_URL}/${id}`,
            {
              method: "DELETE",
            }
          );

        if (!response.ok) {
          throw new Error(
            "Gagal menghapus user"
          );
        }

        setUsers((prev) =>
          prev.filter(
            (item) =>
              item.id !== id
          )
        );

        alert(
          "User berhasil dihapus"
        );
      } catch (error) {
        console.error(error);

        alert(
          "Gagal menghapus user"
        );
      }
    };

    const handleEditUser = (
  user: any
) => {
  setSelectedUser(user);

  setEditForm({
    nama: user.nama,
    email: user.email,
    role: user.role,
    status: user.status,
    password: "",
  });

  setShowEditModal(true);
};

const handleUpdateUser =
  async () => {
    try {
      const response =
        await fetch(
          `${API_URL}/${selectedUser.id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type":
                "application/json",
            },
            body: JSON.stringify(
              editForm
            ),
          }
        );

      const result =
        await response.json();

      if (!response.ok) {
        throw new Error(
          result.message
        );
      }

      alert(
        "User berhasil diupdate"
      );

      setShowEditModal(false);

      fetchUsers();
    } catch (error: any) {
      alert(error.message);
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
          Kelola semua user Dana
          Stockroom
        </p>
      </div>

      <Card className="border border-gray-200 bg-white shadow-sm dark:border-white/10 dark:bg-[#0F172A]">
        {/* SEARCH */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Cari nama, email, role..."
            value={search}
            onChange={(e) =>
              setSearch(
                e.target.value
              )
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


{/* MOBILE + TABLET */}
<div className="grid gap-4 xl:hidden">

  {loading ? (

    <Card className="py-10">
      <p className="text-center text-gray-500 dark:text-gray-400">
        Loading...
      </p>
    </Card>

  ) : filteredUsers.length === 0 ? (

    <Card className="py-10">
      <p className="text-center text-gray-500 dark:text-gray-400">
        Tidak ada user
      </p>
    </Card>

  ) : (

    filteredUsers.map((user) => (
      <Card
        key={user.id}
        className="
          border
          border-gray-200
          bg-white
          shadow-sm
          dark:border-white/10
          dark:bg-[#0F172A]
        "
      >
        <div className="space-y-4">

          <div className="flex items-center gap-4">

            <div
              className="
                flex
                h-12
                w-12
                items-center
                justify-center
                rounded-full
                bg-sky-500
                text-lg
                font-bold
                text-white
              "
            >
              {user.nama.charAt(0)}
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white">
                {user.nama}
              </h3>

              <p className="text-sm text-gray-500 dark:text-gray-400">
                Dana Stockroom
              </p>
            </div>

          </div>

          <div className="space-y-3">

            <div className="flex justify-between border-b border-gray-200 pb-2 dark:border-white/5">
              <span className="text-gray-500 dark:text-gray-400">
                Email
              </span>

              <span className="max-w-[60%] text-right text-gray-900 dark:text-white break-words">
                {user.email}
              </span>
            </div>

            <div className="flex justify-between border-b border-gray-200 pb-2 dark:border-white/5">
              <span className="text-gray-500 dark:text-gray-400">
                Last Login
              </span>

              <span className="max-w-[60%] text-right text-gray-700 dark:text-gray-300">
                {user.lastLogin}
              </span>
            </div>

          </div>

          <div className="flex flex-wrap gap-2">

            <span
              className={`rounded-full px-3 py-1 text-xs font-semibold ${
                user.role === "Owner"
                  ? "bg-purple-100 text-purple-600 dark:bg-purple-500/20 dark:text-purple-400"
                  : user.role === "Admin"
                  ? "bg-red-100 text-red-600 dark:bg-red-500/20 dark:text-red-400"
                  : "bg-sky-100 text-sky-600 dark:bg-sky-500/20 dark:text-sky-400"
              }`}
            >
              {user.role}
            </span>

            <span
              className={`rounded-full px-3 py-1 text-xs font-semibold ${
                user.status === "Aktif"
                  ? "bg-green-100 text-green-600 dark:bg-green-500/20 dark:text-green-400"
                  : "bg-gray-200 text-gray-600 dark:bg-gray-500/20 dark:text-gray-300"
              }`}
            >
              {user.status}
            </span>

          </div>

          <div className="grid grid-cols-2 gap-3">

            <button
              onClick={() => handleEditUser(user)}
              className="
                rounded-xl
                bg-sky-500
                py-2.5
                font-medium
                text-white
              "
            >
              Edit
            </button>

            <button
              onClick={() =>
                handleDeleteUser(
                  user.id,
                  user.nama
                )
              }
              className="
                rounded-xl
                bg-red-500
                py-2.5
                font-medium
                text-white
              "
            >
              Hapus
            </button>

          </div>

        </div>
      </Card>
    ))

  )}

</div>


{/* DESKTOP */}
<div className="hidden xl:block">
  <div className="overflow-x-auto">
            <DataTable
              headers={[
                "Nama",
                "Email",
                "Role",
                "Status",
                "Last Login",
                "Action",
              ]}
            >
              {loading ? (
                <tr>
                  <td
                    colSpan={6}
                    className="py-10 text-center text-white"
                  >
                    Loading...
                  </td>
                </tr>
              ) : filteredUsers.length ===
                0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="py-10 text-center text-white"
                  >
                    Tidak ada user
                  </td>
                </tr>
              ) : (
                filteredUsers.map(
                  (user) => (
                    <tr
                      key={user.id}
                      className="border-b border-gray-200 dark:border-white/5"
                    >
                      {/* NAMA */}
                      <td className="py-5">
                        <div className="flex items-center gap-4">
                          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-sky-500 text-lg font-bold text-white">
                            {user.nama.charAt(
                              0
                            )}
                          </div>

                          <div>
                            <p className="font-semibold text-gray-900 dark:text-white">
                              {
                                user.nama
                              }
                            </p>

                            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                              Dana
                              Stockroom
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
                          className={`rounded-full px-3 py-1 text-xs font-semibold ${
                            user.role ===
                            "Owner"
                              ? "bg-purple-100 text-purple-600 dark:bg-purple-500/20 dark:text-purple-400"
                              : user.role ===
                                  "Admin"
                                ? "bg-red-100 text-red-600 dark:bg-red-500/20 dark:text-red-400"
                                : "bg-sky-100 text-sky-600 dark:bg-sky-500/20 dark:text-sky-400"
                          }`}
                        >
                          {user.role}
                        </span>
                      </td>

                      {/* STATUS */}
                      <td className="py-5">
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-semibold ${
                            user.status ===
                            "Aktif"
                              ? "bg-green-100 text-green-600 dark:bg-green-500/20 dark:text-green-400"
                              : "bg-gray-200 text-gray-600 dark:bg-gray-500/20 dark:text-gray-300"
                          }`}
                        >
                          {
                            user.status
                          }
                        </span>
                      </td>

                      {/* LAST LOGIN */}
                      <td className="py-5 text-gray-700 dark:text-gray-300">
                        {
                          user.lastLogin
                        }
                      </td>

                      {/* ACTION */}
                      <td className="py-5">
                        <div className="flex items-center gap-3">
                        <button
                          onClick={() =>
                            handleEditUser(user)
                          }
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
                          "
                        >
                          Edit
                        </button>

                          <button
                            onClick={() =>
                              handleDeleteUser(
                                user.id,
                                user.nama
                              )
                            }
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
                            "
                          >
                            Hapus
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                )
              )}
            </DataTable>
          </div>
        </div>
      </Card>
          {showEditModal && (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
        <div className="w-full max-w-xl rounded-3xl bg-white p-6 dark:bg-[#0F172A]">

          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              Edit User
            </h2>

            <button
              onClick={() =>
                setShowEditModal(false)
              }
              className="text-2xl"
            >
              ×
            </button>
          </div>

          <div className="space-y-4">

            <input
              type="text"
              value={editForm.nama}
              onChange={(e) =>
                setEditForm({
                  ...editForm,
                  nama: e.target.value,
                })
              }
              placeholder="Nama"
              className="w-full rounded-xl border border-gray-200 bg-gray-100 px-4 py-3 dark:border-white/10 dark:bg-[#1E293B] dark:text-white"
            />

            <input
              type="email"
              value={editForm.email}
              onChange={(e) =>
                setEditForm({
                  ...editForm,
                  email: e.target.value,
                })
              }
              placeholder="Email"
              className="w-full rounded-xl border border-gray-200 bg-gray-100 px-4 py-3 dark:border-white/10 dark:bg-[#1E293B] dark:text-white"
            />

            <input
              type="password"
              value={editForm.password}
              onChange={(e) =>
                setEditForm({
                  ...editForm,
                  password: e.target.value,
                })
              }
              placeholder="Password baru (opsional)"
              className="w-full rounded-xl border border-gray-200 bg-gray-100 px-4 py-3 dark:border-white/10 dark:bg-[#1E293B] dark:text-white"
            />

            <select
              value={editForm.role}
              onChange={(e) =>
                setEditForm({
                  ...editForm,
                  role: e.target.value,
                })
              }
              className="w-full rounded-xl border border-gray-200 bg-gray-100 px-4 py-3 dark:border-white/10 dark:bg-[#1E293B] dark:text-white"
            >
              <option>Owner</option>
              <option>Admin</option>
              <option>Kasir</option>
            </select>

            <select
              value={editForm.status}
              onChange={(e) =>
                setEditForm({
                  ...editForm,
                  status: e.target.value,
                })
              }
              className="w-full rounded-xl border border-gray-200 bg-gray-100 px-4 py-3 dark:border-white/10 dark:bg-[#1E293B] dark:text-white"
            >
              <option>Aktif</option>
              <option>Nonaktif</option>
            </select>

            <div className="flex justify-end gap-3 pt-4">

              <button
                onClick={() =>
                  setShowEditModal(false)
                }
                className="rounded-xl border border-gray-300 px-5 py-3"
              >
                Batal
              </button>

              <button
                onClick={handleUpdateUser}
                className="rounded-xl bg-sky-500 px-5 py-3 text-white"
              >
                Simpan
              </button>

            </div>

          </div>

        </div>
      </div>
    )}
    </div>
  );
}