"use client";

import { useEffect, useState } from "react";
import Card from "@/components/ui/card";

export default function PengaturanAkunPage() {
const [profileLoading, setProfileLoading] = useState(false);
const [passwordLoading, setPasswordLoading] = useState(false);

const [message, setMessage] = useState("");
const [error, setError] = useState("");

  const [form, setForm] = useState({
    nama: "",
    email: "",
    role: "",
    status: "",
  });

  const [passwordForm, setPasswordForm] = useState({
    current_password: "",
    password: "",
    password_confirmation: "",
  });

  useEffect(() => {
    const user = localStorage.getItem("user");

    if (user) {
      const data = JSON.parse(user);

      setForm({
        nama: data.nama || "",
        email: data.email || "",
        role: data.role || "",
        status: data.status || "",
      });
    }
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handlePasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPasswordForm({
      ...passwordForm,
      [e.target.name]: e.target.value,
    });
  };

const handleSave = async () => {
  try {
    setProfileLoading(true);
    setError("");
    setMessage("");

    const token = localStorage.getItem("token");

    if (!token) {
      throw new Error("Session login tidak ditemukan");
    }

    const response = await fetch(
      "http://127.0.0.1:8000/api/profile",
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nama: form.nama,
          email: form.email,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.message || "Gagal memperbarui profil"
      );
    }

    localStorage.setItem(
      "user",
      JSON.stringify(data.user)
    );

    setForm({
      nama: data.user.nama,
      email: data.user.email,
      role: data.user.role,
      status: data.user.status,
    });

    setMessage("Profil berhasil diperbarui");
  } catch (err: any) {
    setError(err.message);
  } finally {
    setProfileLoading(false);
  }
};

 const handleUpdatePassword = async () => {
  try {
    setPasswordLoading(true);
    setError("");
    setMessage("");

    if (
      !passwordForm.current_password ||
      !passwordForm.password ||
      !passwordForm.password_confirmation
    ) {
      throw new Error(
        "Semua field password wajib diisi"
      );
    }

    if (
      passwordForm.password !==
      passwordForm.password_confirmation
    ) {
      throw new Error(
        "Konfirmasi password tidak cocok"
      );
    }

    const token = localStorage.getItem("token");

    if (!token) {
      throw new Error(
        "Session login tidak ditemukan"
      );
    }

    const response = await fetch(
      "http://127.0.0.1:8000/api/password/change",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(passwordForm),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.message || "Gagal mengubah password"
      );
    }

    setPasswordForm({
      current_password: "",
      password: "",
      password_confirmation: "",
    });

    setMessage("Password berhasil diubah");
  } catch (err: any) {
    setError(err.message);
  } finally {
    setPasswordLoading(false);
  }
};

  return (
    <div>
      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Pengaturan Akun
        </h1>

        <p className="mt-2 text-gray-500 dark:text-gray-400">
          Kelola informasi akun Dana Stockroom
        </p>
      </div>

      {/* ALERT */}
      {message && (
        <div className="mb-4 rounded-xl bg-green-500/20 p-4 text-green-500">
          {message}
        </div>
      )}

      {error && (
        <div className="mb-4 rounded-xl bg-red-500/20 p-4 text-red-500">
          {error}
        </div>
      )}

      <Card className="border border-gray-200 bg-white dark:border-white/10 dark:bg-[#0F172A]">
        <div className="grid gap-10 lg:grid-cols-[280px_1fr]">

          {/* PROFILE */}
          <div className="flex flex-col items-center border-b border-gray-200 pb-8 dark:border-white/10 lg:border-b-0 lg:border-r lg:pb-0 lg:pr-10">

            <div
              className="
                flex
                h-32
                w-32
                items-center
                justify-center
                rounded-full
                bg-sky-500
                text-4xl
                font-bold
                text-white
              "
            >
              {form.nama
                ? form.nama.charAt(0).toUpperCase()
                : "A"}
            </div>

            <h2 className="mt-5 text-2xl font-bold text-gray-900 dark:text-white">
              {form.nama}
            </h2>

            <p className="mt-2 text-gray-500 dark:text-gray-400">
              {form.role}
            </p>
          </div>

          {/* FORM */}
          <div>

            {/* PROFIL */}
            <div className="grid gap-6 md:grid-cols-2">

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Nama Lengkap
                </label>

                <input
                  type="text"
                  name="nama"
                  value={form.nama}
                  onChange={handleChange}
                  className="
                    w-full
                    rounded-xl
                    border
                    border-gray-200
                    bg-gray-100
                    px-4
                    py-3
                    dark:border-white/10
                    dark:bg-[#1E293B]
                    dark:text-white
                  "
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Email
                </label>

                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  className="
                    w-full
                    rounded-xl
                    border
                    border-gray-200
                    bg-gray-100
                    px-4
                    py-3
                    dark:border-white/10
                    dark:bg-[#1E293B]
                    dark:text-white
                  "
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Role
                </label>

                <input
                  value={form.role}
                  disabled
                  className="
                    w-full
                    rounded-xl
                    border
                    border-gray-200
                    bg-gray-200
                    px-4
                    py-3
                    dark:border-white/10
                    dark:bg-[#1E293B]
                    dark:text-white
                  "
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Status
                </label>

                <input
                  value={form.status}
                  disabled
                  className="
                    w-full
                    rounded-xl
                    border
                    border-gray-200
                    bg-gray-200
                    px-4
                    py-3
                    dark:border-white/10
                    dark:bg-[#1E293B]
                    dark:text-white
                  "
                />
              </div>
            </div>

            <div className="mt-8 flex justify-end">
              <button
                onClick={handleSave}
                disabled={profileLoading}
                className="
                  rounded-xl
                  bg-sky-500
                  px-6
                  py-3
                  font-semibold
                  text-white
                  hover:bg-sky-600
                "
              >
                Simpan Perubahan
              </button>
            </div>

            {/* PASSWORD */}
            <div className="mt-12 border-t border-gray-200 pt-8 dark:border-white/10">
              <h2 className="mb-6 text-xl font-bold text-gray-900 dark:text-white">
                Ganti Password
              </h2>

              <div className="space-y-5">

              <input
                type="password"
                name="current_password"
                autoComplete="current-password"
                placeholder="Password Lama"
                value={passwordForm.current_password}
                onChange={handlePasswordChange}
                className="
                  w-full
                  rounded-xl
                  border
                  border-gray-200
                  bg-gray-100
                  px-4
                  py-3
                  dark:border-white/10
                  dark:bg-[#1E293B]
                  dark:text-white
                "
              />

              <input
                type="password"
                name="password"
                autoComplete="new-password"
                placeholder="Password Baru"
                value={passwordForm.password}
                onChange={handlePasswordChange}
                className="
                  w-full
                  rounded-xl
                  border
                  border-gray-200
                  bg-gray-100
                  px-4
                  py-3
                  dark:border-white/10
                  dark:bg-[#1E293B]
                  dark:text-white
                "
              />

              <input
                type="password"
                name="password_confirmation"
                autoComplete="new-password"
                placeholder="Konfirmasi Password Baru"
                value={passwordForm.password_confirmation}
                onChange={handlePasswordChange}
                className="
                  w-full
                  rounded-xl
                  border
                  border-gray-200
                  bg-gray-100
                  px-4
                  py-3
                  dark:border-white/10
                  dark:bg-[#1E293B]
                  dark:text-white
                "
              />

                <div className="flex justify-end">
                  <button
                    onClick={handleUpdatePassword}
                    disabled={profileLoading}
                    className="
                      rounded-xl
                      bg-red-500
                      px-6
                      py-3
                      font-semibold
                      text-white
                      hover:bg-red-600
                    "
                  >
                    Ubah Password
                  </button>
                </div>

              </div>
            </div>

          </div>
        </div>
      </Card>
    </div>
  );
}