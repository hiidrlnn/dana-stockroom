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

    setLoading(true);

    setTimeout(() => {
      router.push("/dashboard");
    }, 1200);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
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

      {/* REMEMBER */}
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

      {/* BUTTON */}
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
        ">
        {loading ? "Loading..." : `Masuk Sebagai ${role}`}
      </button>
    </form>
  );
}
