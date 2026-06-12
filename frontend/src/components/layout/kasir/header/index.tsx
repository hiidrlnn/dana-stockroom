"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";

import {
  Menu,
  Moon,
  Sun,
  ChevronDown,
  User,
  LogOut,
  Settings,
} from "lucide-react";

type Props = {
  onMenuClick: () => void;
};

export function KasirHeader({ onMenuClick }: Props) {
  const { theme, setTheme } = useTheme();

  const [mounted, setMounted] = useState(false);

  const [openProfile, setOpenProfile] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  const [user, setUser] = useState({
    nama: "Kasir",
    role: "Kasir",
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const userData = localStorage.getItem("user");

    if (userData) {
      try {
        const parsed = JSON.parse(userData);

        setUser({
          nama: parsed.nama || "Kasir",
          role: parsed.role || "Kasir",
        });
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
        setOpenProfile(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    window.location.href = "/login";
  };

  return (
    <header
      className="
      sticky
      top-0
      z-[60]

      border-b
      border-gray-200

      bg-white/95
      backdrop-blur-md

      dark:border-white/10
      dark:bg-[#0F172A]/95

      px-4
      py-4
      sm:px-6
    "
    >
      <div className="flex items-center justify-between">
        {/* LEFT */}
        <div className="flex items-center gap-4">
          <button
            onClick={onMenuClick}
            className="
              flex
              h-11
              w-11
              items-center
              justify-center
              rounded-xl
              bg-gray-100

              dark:bg-white/5

              xl:hidden
            "
          >
            <Menu size={20} />
          </button>

          <div>
            <h1
              className="
                text-lg
                font-bold
                text-slate-900

                dark:text-white
              "
            >
              Dashboard Kasir
            </h1>

            <p
              className="
                hidden
                text-xs
                text-gray-500

                sm:block
              "
            >
              Dana Stockroom
            </p>
          </div>
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-4">
          {mounted && (
            <div
              className="
                flex
                items-center
                gap-2
                rounded-full
                border
                border-gray-200
                bg-gray-100
                p-1.5

                dark:border-white/10
                dark:bg-[#081028]
              "
            >
              <button
                onClick={() => setTheme("light")}
                className={`
                  flex
                  h-9
                  w-9
                  items-center
                  justify-center
                  rounded-full

                  ${
                    theme === "light"
                      ? "bg-sky-500 text-white"
                      : "text-gray-500"
                  }
                `}
              >
                <Sun size={18} />
              </button>

              <button
                onClick={() => setTheme("dark")}
                className={`
                  flex
                  h-9
                  w-9
                  items-center
                  justify-center
                  rounded-full

                  ${
                    theme === "dark" ? "bg-sky-500 text-white" : "text-gray-500"
                  }
                `}
              >
                <Moon size={18} />
              </button>
            </div>
          )}

          {/* PROFILE DESKTOP */}
          <div
            ref={dropdownRef}
            className="
    relative
    hidden
    xl:block
  "
          >
            {/* BUTTON PROFILE */}
            <button
              onClick={() => setOpenProfile(!openProfile)}
              className="
      flex
      items-center
      gap-4

      rounded-2xl
      border
      border-gray-200

      bg-white

      px-4
      py-3

      transition

      hover:border-sky-500/40

      dark:border-white/10
      dark:bg-[#081028]
    "
            >
              <div className="relative">
                <div
                  className="
          flex
          h-12
          w-12
          items-center
          justify-center

          rounded-full
          bg-sky-500

          text-lg
          font-bold
          text-white
        "
                >
                  {user.nama.charAt(0).toUpperCase()}
                </div>

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

          dark:border-[#081028]
        "
                />
              </div>

              <div className="text-left">
                <h4
                  className="
          font-semibold
          text-slate-900

          dark:text-white
        "
                >
                  {user.nama}
                </h4>

                <p
                  className="
          text-xs
          text-gray-500

          dark:text-gray-400
        "
                >
                  {user.role}
                </p>
              </div>

              <ChevronDown
                size={18}
                className={`
        transition
        ${openProfile ? "rotate-180" : ""}
      `}
              />
            </button>

            {/* DROPDOWN */}
            {openProfile && (
              <div
                className="
                absolute
                right-0
                top-[78px]

                z-50
                w-[280px]

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
                <div
                  className="
          border-b
          border-gray-200

          p-6

          dark:border-white/10
        "
                >
                  <div className="flex gap-4">
                    <div className="relative">
                      <div
                        className="
                flex
                h-14
                w-14
                items-center
                justify-center

                rounded-full
                bg-sky-500

                text-xl
                font-bold
                text-white
              "
                      >
                        {user.nama.charAt(0).toUpperCase()}
                      </div>

                      <span
                        className="
                absolute
                bottom-1
                right-1

                h-3
                w-3

                rounded-full

                bg-green-500
              "
                      />
                    </div>

                    <div>
                      <h3
                        className="
                text-lg
                font-bold

                text-slate-900

                dark:text-white
              "
                      >
                        {user.nama}
                      </h3>

                      <p
                        className="
                text-lg
                text-gray-500
              "
                      >
                        {user.role}
                      </p>
                    </div>
                  </div>
                </div>

                {/* MENU */}
                <div className="p-4">
                  <Link
                    href="/view-profile-kasir"
                    className="
            flex
            items-center
            gap-4

            rounded-2xl

            px-4
            py-3
            text-base

            transition

            hover:bg-gray-100

            dark:hover:bg-white/5
          "
                  >
                    <User size={18} />
                    View Profile
                  </Link>

                  <Link
                    href="/pengaturan-akun-kasir"
                    className="
            flex
            items-center
            gap-4

            rounded-2xl

            px-4
            py-4

            text-lg

            transition

            hover:bg-gray-100

            dark:hover:bg-white/5
          "
                  >
                    <Settings size={18} />
                    Pengaturan Akun
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="
            mt-2

            flex
            w-full
            items-center
            gap-4

            rounded-2xl

            px-4
            py-4

            text-lg
            text-red-500

            transition

            hover:bg-red-50

            dark:hover:bg-red-500/10
          "
                  >
                    <LogOut size={22} />
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
