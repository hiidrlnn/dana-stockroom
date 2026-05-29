"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";

interface Props {
  role: string;
}

export default function SigninWithPassword({ role }: Props) {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    remember: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const formattedRole = role.charAt(0).toUpperCase() + role.slice(1);

    try {
      const response = await fetch("http://127.0.0.1:8000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          role: formattedRole,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Gagal masuk ke dalam sistem.");
      }

      localStorage.setItem("auth_token", data.access_token);
      localStorage.setItem("user", JSON.stringify(data.user));

      const targetRole = role.toLowerCase();
      if (targetRole === "admin") {
        router.push("/dashboard-admin");
      } else if (targetRole === "kasir") {
        router.push("/dashboard-kasir");
      } else if (targetRole === "owner") {
        router.push("/dashboard-owner");
      } else {
        router.push("/dashboard");
      }
      
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {error && (
        <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-center text-sm text-red-500 dark:text-red-400">
          {error}
        </div>
      )}

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
            className="
            w-full rounded-2xl border
            border-gray-300
            bg-gray-100
            py-4 pl-12 pr-4

            text-gray-800
            placeholder:text-gray-500

            outline-none
            transition-all

            focus:border-sky-500
            focus:bg-white

            dark:border-white/10
            dark:bg-[#1A2336]
            dark:text-white
            dark:placeholder:text-gray-400
          "
          />
        </div>
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
          Password
        </label>

        <div className="relative">
          <Lock className="absolute left-4 top-1/2 z-10 size-5 -translate-y-1/2 text-gray-500 dark:text-gray-400" />

          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Masukkan password"
            value={formData.password}
            onChange={handleChange}
            required
            className="
            w-full rounded-2xl border
            border-gray-300
            bg-gray-100
            py-4 pl-12 pr-12

            text-gray-800
            placeholder:text-gray-500

            outline-none
            transition-all

            focus:border-sky-500
            focus:bg-white

            dark:border-white/10
            dark:bg-[#1A2336]
            dark:text-white
            dark:placeholder:text-gray-400
          "
          />

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="
            absolute right-4 top-1/2
            -translate-y-1/2
            text-gray-500
            hover:text-gray-700

            dark:text-gray-400
            dark:hover:text-white
          ">
            {showPassword ? (
              <EyeOff className="size-5" />
            ) : (
              <Eye className="size-5" />
            )}
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <label className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300 cursor-pointer">
          <input
            type="checkbox"
            name="remember"
            checked={formData.remember}
            onChange={handleChange}
            className="hidden peer"
          />
          <div
            className="
          flex h-5 w-5 items-center justify-center
          rounded border border-gray-400
          bg-white
          transition

          peer-checked:border-sky-500
          peer-checked:bg-sky-500

          dark:border-white/20
          dark:bg-[#1A2336]
        ">
            {formData.remember && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-3 w-3 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={3}>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            )}
          </div>
          Remember me
        </label>

        <button
          type="button"
          className="text-sm text-sky-500 hover:text-sky-400">
          Forgot Password?
        </button>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="
        flex w-full items-center
        justify-center rounded-2xl
        bg-sky-500 py-4
        font-semibold text-white
        transition-all

        hover:bg-sky-400
        disabled:opacity-70
        disabled:cursor-not-allowed
        capitalize
        ">
        {loading ? "Memverifikasi..." : `Masuk Sebagai ${role}`}
      </button>
    </form>
  );
}