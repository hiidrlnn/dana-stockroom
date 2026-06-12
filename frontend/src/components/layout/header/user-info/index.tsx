"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import {
  ChevronDownIcon,
  LockIcon,
  LogoutIcon,
  SettingsIcon,
  UserIcon,
} from "./icons";

interface UserData {
  nama?: string;
  email?: string;
  role?: string;
}

export function UserInfo() {
  const router = useRouter();

  const [open, setOpen] = useState(false);

  const [user, setUser] = useState<UserData>({
    nama: "Admin Utama",
    email: "admin@danastockroom.com",
    role: "Owner",
  });

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");

    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error(error);
      }
    }
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
    try {
      const token =
        localStorage.getItem("token") ||
        localStorage.getItem("access_token");

      if (token) {
        await fetch("http://127.0.0.1:8000/api/logout", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        });
      }
    } catch (error) {
      console.error("Logout error:", error);
    }

    localStorage.removeItem("token");
    localStorage.removeItem("access_token");
    localStorage.removeItem("user");

    router.push("/login");
  };

  const firstLetter = user.nama?.charAt(0).toUpperCase() || "A";

  return (
    <div
  ref={dropdownRef}
  className="relative z-[9999] hidden lg:block"
>
      {/* BUTTON */}
      <button
        onClick={() => setOpen(!open)}
        className="
          flex
          items-center
          gap-3
          rounded-2xl
          border
          border-gray-200
          bg-white
          px-3
          py-2
          shadow-sm
          transition
          hover:border-sky-500
          dark:border-white/10
          dark:bg-[#0F172A]
        "
      >
        <div
          className="
            relative
            flex
            h-11
            w-11
            items-center
            justify-center
            rounded-full
            bg-sky-500
            font-bold
            text-white
          "
        >
          {firstLetter}

          <span
            className="
              absolute
              bottom-0
              right-0
              h-3
              w-3
              rounded-full
              border-2
              border-white
              bg-green-500
              dark:border-[#0F172A]
            "
          />
        </div>

        <div className="hidden text-left md:block">
          <h4 className="text-sm font-semibold text-gray-900 dark:text-white">
            {user.nama}
          </h4>

          <p className="text-xs text-gray-500 dark:text-gray-400">
            {user.role}
          </p>
        </div>

        <ChevronDownIcon
          className={`size-4 text-gray-500 transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* DROPDOWN */}
      {open && (
        <div
          className="
            absolute
            right-0
            top-[75px]
            z-[9999]
            w-[320px]
            overflow-hidden
            rounded-3xl
            border
            border-gray-200
            bg-white
            shadow-2xl
            dark:border-white/10
            dark:bg-[#0F172A]
          "
        >
          {/* HEADER */}
          <div className="border-b border-gray-200 p-5 dark:border-white/10">
            <div className="flex items-center gap-4">
              <div
                className="
                  flex
                  h-16
                  w-16
                  items-center
                  justify-center
                  rounded-full
                  bg-sky-500
                  text-2xl
                  font-bold
                  text-white
                "
              >
                {firstLetter}
              </div>

              <div className="min-w-0 flex-1">
                <h3 className="truncate text-xl font-bold text-gray-900 dark:text-white">
                  {user.nama}
                </h3>

                <p className="truncate text-sm text-gray-500 dark:text-gray-400">
                  {user.email}
                </p>

                <span
                  className="
                    mt-3
                    inline-flex
                    rounded-full
                    bg-purple-100
                    px-3
                    py-1
                    text-xs
                    font-semibold
                    text-purple-600
                    dark:bg-purple-500/20
                    dark:text-purple-400
                  "
                >
                  {user.role}
                </span>
              </div>
            </div>
          </div>

          {/* MENU */}
          <div className="p-3">
            <Link
              href="/pengaturan/profil"
              onClick={() => setOpen(false)}
              className="
                flex items-center gap-3 rounded-2xl px-4 py-3
                text-gray-700 transition hover:bg-gray-100
                dark:text-gray-300 dark:hover:bg-white/5
              "
            >
              <UserIcon className="size-5" />
              <span className="font-medium">View Profile</span>
            </Link>

            <Link
              href="/pengaturan/pengaturan-akun"
              onClick={() => setOpen(false)}
              className="
                flex items-center gap-3 rounded-2xl px-4 py-3
                text-gray-700 transition hover:bg-gray-100
                dark:text-gray-300 dark:hover:bg-white/5
              "
            >
              <SettingsIcon className="size-5" />
              <span className="font-medium">Pengaturan Akun</span>
            </Link>

            <button
              onClick={handleLogout}
              className="
                mt-2
                flex
                w-full
                items-center
                gap-3
                rounded-2xl
                px-4
                py-3
                text-left
                text-red-500
                transition
                hover:bg-red-50
                dark:hover:bg-red-500/10
              "
            >
              <LogoutIcon className="size-5" />
              <span className="font-medium">Logout</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}