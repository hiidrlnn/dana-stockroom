"use client";

import React, { useState } from "react";
import { User, Lock, Save } from "lucide-react";

export default function PengaturanAkunOwnerPage() {
  // State untuk Form Profil
  const [profileForm, setProfileForm] = useState({
    name: "Owner Dana Stockroom",
    email: "owner@danastockroom.com",
    phone: "081234567890",
  });

  // State untuk Form Ubah Password
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // Handler Submit Profil
  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Profil owner berhasil diperbarui!");
  };

  // Handler Submit Password
  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      alert("Konfirmasi password baru tidak cocok!");
      return;
    }
    alert("Password berhasil diperbarui!");
    setPasswordForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
  };

  return (
    <div className="space-y-6 p-6">
      {/* HEADER HALAMAN */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
          Pengaturan Akun
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Ubah informasi profil dan keamanan akun owner Dana Stockroom
        </p>
      </div>

      {/* GRID DUA FORM UTAMA */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* PANEL 1: UBAH INFORMASI PROFIL */}
        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm dark:border-white/5 dark:bg-[#0F172A]">
          <div className="flex items-center gap-2 border-b border-gray-50 pb-4 mb-5 dark:border-white/5">
            <User className="h-5 w-5 text-sky-500" />
            <h2 className="text-base font-bold text-slate-900 dark:text-white">
              Informasi Profil
            </h2>
          </div>

          <form onSubmit={handleProfileSubmit} className="space-y-4">
            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
                Nama Lengkap
              </label>
              <input
                type="text"
                value={profileForm.name}
                onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                className="w-full rounded-xl border border-gray-100 bg-gray-50/50 px-4 py-3 text-sm text-slate-800 outline-none ring-sky-500/20 transition-all focus:border-sky-500 focus:bg-white focus:ring-4 dark:border-white/5 dark:bg-white/5 dark:text-white dark:focus:bg-transparent"
                required
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
                Email Akun
              </label>
              <input
                type="email"
                value={profileForm.email}
                onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                className="w-full rounded-xl border border-gray-100 bg-gray-50/50 px-4 py-3 text-sm text-slate-800 outline-none ring-sky-500/20 transition-all focus:border-sky-500 focus:bg-white focus:ring-4 dark:border-white/5 dark:bg-white/5 dark:text-white dark:focus:bg-transparent"
                required
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
                Nomor Telepon
              </label>
              <input
                type="text"
                value={profileForm.phone}
                onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                className="w-full rounded-xl border border-gray-100 bg-gray-50/50 px-4 py-3 text-sm text-slate-800 outline-none ring-sky-500/20 transition-all focus:border-sky-500 focus:bg-white focus:ring-4 dark:border-white/5 dark:bg-white/5 dark:text-white dark:focus:bg-transparent"
                required
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="flex items-center justify-center gap-2 rounded-xl bg-sky-500 px-5 py-3 text-sm font-bold text-white shadow-md shadow-sky-500/10 hover:bg-sky-600 transition-all w-full sm:w-auto"
              >
                <Save className="h-4 w-4" /> Simpan Perubahan
              </button>
            </div>
          </form>
        </div>

        {/* PANEL 2: UBAH KEAMANAN / PASSWORD */}
        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm dark:border-white/5 dark:bg-[#0F172A]">
          <div className="flex items-center gap-2 border-b border-gray-50 pb-4 mb-5 dark:border-white/5">
            <Lock className="h-5 w-5 text-sky-500" />
            <h2 className="text-base font-bold text-slate-900 dark:text-white">
              Keamanan Akun
            </h2>
          </div>

          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
                Password Lama
              </label>
              <input
                type="password"
                placeholder="••••••••"
                value={passwordForm.currentPassword}
                onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                className="w-full rounded-xl border border-gray-100 bg-gray-50/50 px-4 py-3 text-sm text-slate-800 outline-none ring-sky-500/20 transition-all focus:border-sky-500 focus:bg-white focus:ring-4 dark:border-white/5 dark:bg-white/5 dark:text-white dark:focus:bg-transparent"
                required
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
                Password Baru
              </label>
              <input
                type="password"
                placeholder="Minimum 8 karakter"
                value={passwordForm.newPassword}
                onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                className="w-full rounded-xl border border-gray-100 bg-gray-50/50 px-4 py-3 text-sm text-slate-800 outline-none ring-sky-500/20 transition-all focus:border-sky-500 focus:bg-white focus:ring-4 dark:border-white/5 dark:bg-white/5 dark:text-white dark:focus:bg-transparent"
                required
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
                Konfirmasi Password Baru
              </label>
              <input
                type="password"
                placeholder="Masukkan ulang password baru"
                value={passwordForm.confirmPassword}
                onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                className="w-full rounded-xl border border-gray-100 bg-gray-50/50 px-4 py-3 text-sm text-slate-800 outline-none ring-sky-500/20 transition-all focus:border-sky-500 focus:bg-white focus:ring-4 dark:border-white/5 dark:bg-white/5 dark:text-white dark:focus:bg-transparent"
                required
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="flex items-center justify-center gap-2 rounded-xl bg-sky-500 px-5 py-3 text-sm font-bold text-white shadow-md shadow-sky-500/10 hover:bg-sky-600 transition-all w-full sm:w-auto"
              >
                <Save className="h-4 w-4" /> Perbarui Password
              </button>
            </div>
          </form>
        </div>

      </div>
    </div>
  );
}