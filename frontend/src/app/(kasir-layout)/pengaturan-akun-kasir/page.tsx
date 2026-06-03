"use client";

import { useEffect, useState } from "react";

import Card from "@/components/ui/card";

type UserType = {
  nama: string;
  email: string;
  role: string;
  status: string;
};

export default function PengaturanAkunKasirPage() {
  const [user, setUser] = useState<UserType>({
    nama: "",
    email: "",
    role: "",
    status: "",
  });

  const [form, setForm] = useState({
    nama: "",
    email: "",
  });

  const [password, setPassword] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  useEffect(() => {
    const userData = localStorage.getItem("user");

    if (userData) {
      const parsed = JSON.parse(userData);

      setUser(parsed);

      setForm({
        nama: parsed.nama || "",
        email: parsed.email || "",
      });
    }
  }, []);

const handleSaveProfile = async () => {
  try {
    const token =
      localStorage.getItem("token");

    const response = await fetch(
      "http://127.0.0.1:8000/api/update-profile",
      {
        method: "PUT",
        headers: {
          "Content-Type":
            "application/json",
          Accept:
            "application/json",
          Authorization:
            `Bearer ${token}`,
        },
        body: JSON.stringify({
          nama: form.nama,
          email: form.email,
        }),
      }
    );

    const data =
      await response.json();

    if (!response.ok) {
      throw new Error(
        data.message
      );
    }

    localStorage.setItem(
      "user",
      JSON.stringify(data.user)
    );

    alert(
      "Profil berhasil diperbarui"
    );
  } catch (error: any) {
    alert(error.message);
  }
};

const handleChangePassword = async () => {
  try {
    // Validasi field kosong
    if (
      !password.oldPassword ||
      !password.newPassword ||
      !password.confirmPassword
    ) {
      alert("Semua field password wajib diisi!");
      return;
    }

    // Validasi konfirmasi password
    if (
      password.newPassword !==
      password.confirmPassword
    ) {
      alert("Konfirmasi password tidak cocok!");
      return;
    }

    const token =
      localStorage.getItem("token");

    if (!token) {
      alert("Session login tidak ditemukan.");
      return;
    }

    const response = await fetch(
      "http://127.0.0.1:8000/api/change-password",
      {
        method: "PUT",
        headers: {
          "Content-Type":
            "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          current_password:
            password.oldPassword,

          password:
            password.newPassword,

          password_confirmation:
            password.confirmPassword,
        }),
      }
    );

    const data =
      await response.json();

    if (!response.ok) {
      throw new Error(
        data.message ||
          "Gagal mengubah password"
      );
    }

    alert(
      data.message ||
        "Password berhasil diubah"
    );

    // Reset form
    setPassword({
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  } catch (error: any) {
    console.error(error);

    alert(
      error.message ||
        "Terjadi kesalahan"
    );
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
          Kelola informasi akun kasir Dana Stockroom
        </p>
      </div>

      {/* PROFILE CARD */}
      <Card className="mb-6 border border-gray-200 bg-white dark:border-white/10 dark:bg-[#0F172A]">
        <div className="flex flex-col items-center gap-5 md:flex-row">
          <div
            className="
              flex
              h-24
              w-24
              items-center
              justify-center
              rounded-full
              bg-sky-500
              text-3xl
              font-bold
              text-white
            "
          >
            {user.nama
              ? user.nama
                  .charAt(0)
                  .toUpperCase()
              : "K"}
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              {user.nama}
            </h2>

            <p className="text-gray-500 dark:text-gray-400">
              {user.email}
            </p>

            <div className="mt-3 flex flex-wrap gap-3">
              <span
                className="
                  rounded-full
                  bg-sky-100
                  px-4
                  py-1
                  text-sm
                  font-medium
                  text-sky-600

                  dark:bg-sky-500/20
                  dark:text-sky-400
                "
              >
                {user.role}
              </span>

              <span
                className="
                  rounded-full
                  bg-green-100
                  px-4
                  py-1
                  text-sm
                  font-medium
                  text-green-600

                  dark:bg-green-500/20
                  dark:text-green-400
                "
              >
                {user.status}
              </span>
            </div>
          </div>
        </div>
      </Card>

      {/* EDIT PROFILE */}
      <Card className="mb-6 border border-gray-200 bg-white dark:border-white/10 dark:bg-[#0F172A]">
        <h2 className="mb-6 text-xl font-semibold text-gray-900 dark:text-white">
          Edit Profil
        </h2>

        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-500">
              Nama Lengkap
            </label>

            <input
              type="text"
              value={form.nama}
              onChange={(e) =>
                setForm({
                  ...form,
                  nama: e.target.value,
                })
              }
              className="
                w-full
                rounded-2xl
                border
                border-gray-200
                bg-gray-100
                px-4
                py-3
                outline-none

                dark:border-white/10
                dark:bg-[#1E293B]
                dark:text-white
              "
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-500">
              Email
            </label>

            <input
              type="email"
              value={form.email}
              onChange={(e) =>
                setForm({
                  ...form,
                  email: e.target.value,
                })
              }
              className="
                w-full
                rounded-2xl
                border
                border-gray-200
                bg-gray-100
                px-4
                py-3
                outline-none

                dark:border-white/10
                dark:bg-[#1E293B]
                dark:text-white
              "
            />
          </div>
        </div>

        <button
          onClick={handleSaveProfile}
          className="
            mt-6
            rounded-2xl
            bg-sky-500
            px-6
            py-3
            font-semibold
            text-white
            transition
            hover:bg-sky-600
          "
        >
          Simpan Perubahan
        </button>
      </Card>

      {/* PASSWORD */}
      <Card className="border border-gray-200 bg-white dark:border-white/10 dark:bg-[#0F172A]">
        <h2 className="mb-6 text-xl font-semibold text-gray-900 dark:text-white">
          Ganti Password
        </h2>

        <div className="grid gap-5 md:grid-cols-3">
          <input
            type="password"
            placeholder="Password Lama"
            value={password.oldPassword}
            onChange={(e) =>
              setPassword({
                ...password,
                oldPassword: e.target.value,
              })
            }
            className="
              rounded-2xl
              border
              border-gray-200
              bg-gray-100
              px-4
              py-3
              outline-none

              dark:border-white/10
              dark:bg-[#1E293B]
              dark:text-white
            "
          />

          <input
            type="password"
            placeholder="Password Baru"
            value={password.newPassword}
            onChange={(e) =>
              setPassword({
                ...password,
                newPassword: e.target.value,
              })
            }
            className="
              rounded-2xl
              border
              border-gray-200
              bg-gray-100
              px-4
              py-3
              outline-none

              dark:border-white/10
              dark:bg-[#1E293B]
              dark:text-white
            "
          />

          <input
            type="password"
            placeholder="Konfirmasi Password"
            value={password.confirmPassword}
            onChange={(e) =>
              setPassword({
                ...password,
                confirmPassword:
                  e.target.value,
              })
            }
            className="
              rounded-2xl
              border
              border-gray-200
              bg-gray-100
              px-4
              py-3
              outline-none

              dark:border-white/10
              dark:bg-[#1E293B]
              dark:text-white
            "
          />
        </div>

        <button
          onClick={handleChangePassword}
          className="
            mt-6
            rounded-2xl
            bg-green-500
            px-6
            py-3
            font-semibold
            text-white
            transition
            hover:bg-green-600
          "
        >
          Update Password
        </button>
      </Card>
    </div>
  );
}