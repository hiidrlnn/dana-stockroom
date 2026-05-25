"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Eye, EyeOff, Lock, Mail, User } from "lucide-react";

interface Props {
  role: string;
}

export default function SignupWithPassword({ role }: Props) {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [formData, setFormData] = useState({
    nama: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    // Format string role (misal: "admin" -> "Admin") agar sesuai ENUM di database MySQL
    const formattedRole = role.charAt(0).toUpperCase() + role.slice(1);

    try {
      const response = await fetch("http://127.0.0.1:8000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify({
          nama: formData.nama,
          email: formData.email,
          password: formData.password,
          role: formattedRole,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Gagal melakukan registrasi akun.");
      }

      setSuccess("Registrasi berhasil! Mengalihkan ke halaman login...");
      
      // Bersihkan input form setelah sukses mendaftar
      setFormData({ nama: "", email: "", password: "" });

      setTimeout(() => {
        router.push("/login");
      }, 2000);

    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* ERROR MESSAGE */}
      {error && (
        <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-center text-sm text-red-500 dark:text-red-400">
          {error}
        </div>
      )}

      {/* SUCCESS MESSAGE */}
      {success && (
        <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-3 text-center text-sm text-emerald-500 dark:text-emerald-400">
          {success}
        </div>
      )}

      {/* NAMA */}
      <div>
        <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
          Nama Lengkap
        </label>
        <div className="relative">
          <User className="absolute left-4 top-1/2 z-10 size-5 -translate-y-1/2 text-gray-500 dark:text-gray-400" />
          <input
            type="text"
            name="nama"
            placeholder="Masukkan nama lengkap"
            value={formData.nama}
            onChange={handleChange}
            required
            className="w-full rounded-2xl border border-gray-300 bg-gray-100 py-4 pl-12 pr-4 text-gray-800 placeholder:text-gray-500 outline-none transition-all focus:border-sky-500 focus:bg-white dark:border-white/10 dark:bg-[#1A2336] dark:text-white dark:placeholder:text-gray-400"
          />
        </div>
      </div>

      {/* EMAIL */}
      <div>
        <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
          Email
        </label>
        <div className="relative">
          <Mail className="absolute left-4 top-1/2 z-10 size-5 -translate-y-1/2 text-gray-500 dark:text-gray-400" />
          <input
            type="email"
            name="email"
            placeholder={`Masukkan email ${role}`}
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full rounded-2xl border border-gray-300 bg-gray-100 py-4 pl-12 pr-4 text-gray-800 placeholder:text-gray-500 outline-none transition-all focus:border-sky-500 focus:bg-white dark:border-white/10 dark:bg-[#1A2336] dark:text-white dark:placeholder:text-gray-400"
          />
        </div>
      </div>

      {/* PASSWORD */}
      <div>
        <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
          Password
        </label>
        <div className="relative">
          <Lock className="absolute left-4 top-1/2 z-10 size-5 -translate-y-1/2 text-gray-500 dark:text-gray-400" />
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Masukkan password baru"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full rounded-2xl border border-gray-300 bg-gray-100 py-4 pl-12 pr-12 text-gray-800 placeholder:text-gray-500 outline-none transition-all focus:border-sky-500 focus:bg-white dark:border-white/10 dark:bg-[#1A2336] dark:text-white dark:placeholder:text-gray-400"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white">
            {showPassword ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
          </button>
        </div>
      </div>

      {/* BUTTON SUBMIT */}
      <button
        type="submit"
        disabled={loading}
        className="flex w-full items-center justify-center rounded-2xl bg-sky-500 py-4 font-semibold text-white transition-all hover:bg-sky-400 disabled:opacity-70 disabled:cursor-not-allowed capitalize">
        {loading ? "Mendaftarkan..." : `Daftar Sebagai ${role}`}
      </button>
    </form>
  );
}