"use client";

import { useState } from "react";

import Card from "@/components/ui/card";

export default function PengaturanAkunKasirPage() {
  const [profile, setProfile] = useState({
    nama: "Kasir Utama",
    email: "kasir@danastockroom.com",
    telepon: "081234567890",
    alamat: "Pontianak, Indonesia",
  });

  const [password, setPassword] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [settings, setSettings] = useState({
    darkMode: true,
    notification: true,
  });

  const handleSaveProfile = () => {
    alert("Profil berhasil diperbarui!");
  };

  const handleChangePassword = () => {
    if (
      !password.oldPassword ||
      !password.newPassword ||
      !password.confirmPassword
    ) {
      alert("Lengkapi semua field password!");
      return;
    }

    if (password.newPassword !== password.confirmPassword) {
      alert("Konfirmasi password tidak cocok!");
      return;
    }

    alert("Password berhasil diperbarui!");

    setPassword({
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  };

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Pengaturan Akun
        </h1>

        <p className="mt-2 text-gray-500 dark:text-gray-400">
          Kelola profil akun kasir Dana Stockroom
        </p>
      </div>

      {/* PROFILE CARD */}
      <Card className="border border-gray-200 bg-white dark:border-white/10 dark:bg-[#0F172A]">
        <div className="flex flex-col items-center gap-5 md:flex-row">
          {/* AVATAR */}
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
            ">
            K
          </div>

          {/* INFO */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              {profile.nama}
            </h2>

            <p className="text-gray-500 dark:text-gray-400">
              {profile.email}
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
                ">
                Kasir
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
                ">
                Aktif
              </span>
            </div>
          </div>
        </div>
      </Card>

      {/* EDIT PROFILE */}
      <Card className="border border-gray-200 bg-white dark:border-white/10 dark:bg-[#0F172A]">
        <h2 className="mb-6 text-xl font-semibold text-gray-900 dark:text-white">
          Edit Profil
        </h2>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <input
            type="text"
            placeholder="Nama Lengkap"
            value={profile.nama}
            onChange={(e) =>
              setProfile({
                ...profile,
                nama: e.target.value,
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
            type="email"
            placeholder="Email"
            value={profile.email}
            onChange={(e) =>
              setProfile({
                ...profile,
                email: e.target.value,
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
            type="text"
            placeholder="No Telepon"
            value={profile.telepon}
            onChange={(e) =>
              setProfile({
                ...profile,
                telepon: e.target.value,
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
            type="text"
            placeholder="Alamat"
            value={profile.alamat}
            onChange={(e) =>
              setProfile({
                ...profile,
                alamat: e.target.value,
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
          ">
          Simpan Perubahan
        </button>
      </Card>

      {/* CHANGE PASSWORD */}
      <Card className="border border-gray-200 bg-white dark:border-white/10 dark:bg-[#0F172A]">
        <h2 className="mb-6 text-xl font-semibold text-gray-900 dark:text-white">
          Ganti Password
        </h2>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
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
                confirmPassword: e.target.value,
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
          ">
          Update Password
        </button>
      </Card>

      {/* SETTINGS */}
      <Card className="border border-gray-200 bg-white dark:border-white/10 dark:bg-[#0F172A]">
        <h2 className="mb-6 text-xl font-semibold text-gray-900 dark:text-white">
          Preferensi
        </h2>

        <div className="space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white">
                Dark Mode
              </h4>

              <p className="text-sm text-gray-500 dark:text-gray-400">
                Aktifkan mode gelap dashboard
              </p>
            </div>

            <button
              onClick={() =>
                setSettings({
                  ...settings,
                  darkMode: !settings.darkMode,
                })
              }
              className={`
                h-8
                w-16
                rounded-full
                transition

                ${
                  settings.darkMode
                    ? "bg-sky-500"
                    : "bg-gray-300"
                }
              `}>
              <div
                className={`
                  mt-1
                  h-6
                  w-6
                  rounded-full
                  bg-white
                  transition

                  ${
                    settings.darkMode
                      ? "translate-x-9"
                      : "translate-x-1"
                  }
                `}
              />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white">
                Notifikasi
              </h4>

              <p className="text-sm text-gray-500 dark:text-gray-400">
                Aktifkan notifikasi dashboard
              </p>
            </div>

            <button
              onClick={() =>
                setSettings({
                  ...settings,
                  notification: !settings.notification,
                })
              }
              className={`
                h-8
                w-16
                rounded-full
                transition

                ${
                  settings.notification
                    ? "bg-sky-500"
                    : "bg-gray-300"
                }
              `}>
              <div
                className={`
                  mt-1
                  h-6
                  w-6
                  rounded-full
                  bg-white
                  transition

                  ${
                    settings.notification
                      ? "translate-x-9"
                      : "translate-x-1"
                  }
                `}
              />
            </button>
          </div>
        </div>
      </Card>
    </div>
  );
}