"use client";

import Link from "next/link";
import { Suspense, useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import SignupWithPassword from "./signup-with-password";

export function RegisterForm() {
  const [role, setRole] = useState("admin");
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-[#0F172A] text-white">
          Loading...
        </div>
      }>
      <div
        className={`flex min-h-screen items-center justify-center px-4 py-10 transition ${
          darkMode ? "bg-[#0F172A]" : "bg-gray-100"
        }`}>
        {/* Toggle Theme */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className={`absolute right-6 top-6 flex size-12 items-center justify-center rounded-full border transition ${
            darkMode
              ? "border-white/10 bg-[#111C2D] text-white"
              : "border-gray-300 bg-white text-black"
          }`}>
          {darkMode ? <Sun className="size-5" /> : <Moon className="size-5" />}
        </button>

        <div
          className={`w-full max-w-[450px] rounded-2xl border p-8 shadow-2xl transition ${
            darkMode
              ? "border-white/10 bg-[#111C2D]"
              : "border-gray-200 bg-white"
          }`}>
          {/* Logo */}
          <div className="mb-8 text-center">
            <h1
              className={`text-3xl font-extrabold tracking-wide ${
                darkMode ? "text-white" : "text-black"
              }`}>
              DANA
              <span className="text-sky-500">STOCKROOM</span>
            </h1>

            <p
              className={`mt-3 text-sm ${
                darkMode ? "text-gray-400" : "text-gray-500"
              }`}>
              Register Dashboard
            </p>
          </div>

          {/* Switch Role (Sama Persis dengan Login) */}
          <div className="mb-6">
            <p
              className={`mb-3 text-sm font-medium ${
                darkMode ? "text-gray-300" : "text-gray-700"
              }`}>
              Daftar Sebagai
            </p>

            <div
              className={`grid grid-cols-3 gap-2 rounded-xl p-1 ${
                darkMode ? "bg-[#0B1120]" : "bg-gray-200"
              }`}>
              {["admin", "kasir", "owner"].map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setRole(item)}
                  className={`rounded-lg py-2 text-sm font-medium capitalize transition ${
                    role === item
                      ? "bg-sky-500 text-white"
                      : darkMode
                        ? "text-gray-400 hover:text-white"
                        : "text-gray-700 hover:text-black"
                  }`}>
                  {item}
                </button>
              ))}
            </div>
          </div>

          {/* Form Isian Core */}
          <SignupWithPassword role={role} />

          {/* Footer */}
          <div
            className={`mt-6 text-center text-sm ${
              darkMode ? "text-gray-400" : "text-gray-600"
            }`}>
            <p>
              Sudah punya akun?{" "}
              <Link
                href="/login"
                className="font-medium text-sky-500 hover:text-sky-400">
                Masuk
              </Link>
            </p>
          </div>
        </div>
      </div>
    </Suspense>
  );
}