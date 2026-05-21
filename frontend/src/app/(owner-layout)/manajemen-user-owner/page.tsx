"use client";

import React, { useState } from "react";
import { Users, Search, UserPlus, Shield, Mail, Phone, Trash2, Edit } from "lucide-react";

// Data dummy daftar user / karyawan toko Dana Stockroom
const initialUsers = [
  { id: 1, name: "Dirlan Syah", email: "dirlan@danastockroom.com", role: "Kasir", phone: "081234567891", status: "Aktif" },
  { id: 2, name: "Andi Wijaya", email: "andi.gudang@danastockroom.com", role: "Gudang", phone: "085712345678", status: "Aktif" },
  { id: 3, name: "Budi Santoso", email: "budi.admin@danastockroom.com", role: "Admin", phone: "089987654321", status: "Non-Aktif" },
];

export default function ManajemenUserOwnerPage() {
  const [users, setUsers] = useState(initialUsers);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("Semua");

  // Handler hapus user (Simulasi)
  const handleDeleteUser = (id: number, name: string) => {
    if (confirm(`Apakah Anda yakin ingin menghapus user ${name}?`)) {
      setUsers(users.filter(user => user.id !== id));
    }
  };

  return (
    <div className="space-y-6 p-6">
      {/* HEADER HALAMAN */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Users className="h-6 w-6 text-sky-500" /> Manajemen User
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Kelola hak akses, perbarui informasi, dan pantau status akun staf toko Dana Stockroom
          </p>
        </div>

        {/* Tombol Tambah User */}
        <button className="flex items-center justify-center gap-2 rounded-xl bg-sky-500 px-5 py-3 text-sm font-bold text-white shadow-md shadow-sky-500/10 hover:bg-sky-600 transition-all w-full sm:w-auto">
          <UserPlus className="h-4 w-4" /> Tambah Staf Baru
        </button>
      </div>

      {/* FILTER & FILTER UTILITIES */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between rounded-2xl border border-gray-100 bg-white p-4 shadow-sm dark:border-white/5 dark:bg-[#0F172A]">
        {/* Search Input */}
        <div className="relative w-full sm:max-w-md">
          <Search className="absolute left-4 top-3.5 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Cari nama atau email staf..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl bg-gray-50 pl-11 pr-5 py-3 text-sm font-medium text-slate-800 outline-none ring-sky-500/20 transition-all focus:bg-white focus:ring-4 dark:bg-white/5 dark:text-white dark:focus:bg-transparent"
          />
        </div>

        {/* Filter Dropdown */}
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <span className="text-xs font-bold text-gray-400 uppercase tracking-wider whitespace-nowrap hidden sm:inline">Filter Role:</span>
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="w-full sm:w-40 rounded-xl bg-gray-50 border-r-8 border-transparent px-4 py-3 text-sm font-semibold text-slate-700 outline-none dark:bg-white/5 dark:text-gray-300"
          >
            <option value="Semua">Semua Role</option>
            <option value="Admin">Admin</option>
            <option value="Kasir">Kasir</option>
            <option value="Gudang">Gudang</option>
          </select>
        </div>
      </div>

      {/* WRAPPER DATA TABEL */}
      <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm dark:border-white/5 dark:bg-[#0F172A]">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600 dark:text-gray-400">
            <thead>
              <tr className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase border-b border-gray-50 dark:border-white/5">
                <th className="pb-4 font-medium">Nama Staf</th>
                <th className="pb-4 font-medium">Kontak</th>
                <th className="pb-4 font-medium">Role</th>
                <th className="pb-4 font-medium">Status</th>
                <th className="pb-4 font-medium text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 dark:divide-white/5">
              {users
                .filter((user) => {
                  const matchSearch = user.name.toLowerCase().includes(search.toLowerCase()) || user.email.toLowerCase().includes(search.toLowerCase());
                  const matchRole = roleFilter === "Semua" || user.role === roleFilter;
                  return matchSearch && matchRole;
                })
                .map((row) => (
                  <tr key={row.id} className="hover:bg-gray-50/50 dark:hover:bg-white/5 transition-colors">
                    {/* Kolom Profil Mini */}
                    <td className="py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-sky-500/10 font-bold text-sky-600 dark:bg-sky-500/5 dark:text-sky-400">
                          {row.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-bold text-slate-900 dark:text-white leading-tight">{row.name}</p>
                          <p className="text-xs text-gray-400 mt-0.5">ID Staf: #00{row.id}</p>
                        </div>
                      </div>
                    </td>

                    {/* Kolom Kontak */}
                    <td className="py-4 space-y-1">
                      <p className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
                        <Mail className="h-3 w-3 text-gray-400" /> {row.email}
                      </p>
                      <p className="flex items-center gap-1.5 text-xs text-gray-400">
                        <Phone className="h-3 w-3 text-gray-400" /> {row.phone}
                      </p>
                    </td>

                    {/* Kolom Role dengan Badge */}
                    <td className="py-4">
                      <span className="inline-flex items-center gap-1.5 rounded-xl bg-gray-50 px-3 py-1.5 text-xs font-bold text-slate-700 dark:bg-white/5 dark:text-gray-300">
                        <Shield className="h-3 w-3 text-sky-500" /> {row.role}
                      </span>
                    </td>

                    {/* Kolom Status Akun */}
                    <td className="py-4">
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                          row.status === "Aktif"
                            ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400"
                            : "bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-400"
                        }`}
                      >
                        {row.status}
                      </span>
                    </td>

                    {/* Kolom Tombol Aksi Kelola */}
                    <td className="py-4">
                      <div className="flex items-center justify-center gap-2">
                        <button className="rounded-xl bg-gray-50 p-2 text-slate-600 hover:bg-gray-100 dark:bg-white/5 dark:text-gray-400 dark:hover:bg-white/10 transition-colors">
                          <Edit className="h-4 w-4" />
                        </button>
                        <button 
                          onClick={() => handleDeleteUser(row.id, row.name)}
                          className="rounded-xl bg-red-50 p-2 text-red-600 hover:bg-red-100 dark:bg-red-500/5 dark:text-red-400 dark:hover:bg-red-500/10 transition-colors"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}