"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { User, Settings, LogOut } from "lucide-react";
import { useTheme } from "next-themes";

import { KASIR_MENU } from "./data";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export function KasirSidebar({ isOpen, onClose }: Props) {
  const pathname = usePathname();

  const { theme } = useTheme();

  const [mounted, setMounted] = useState(false);

  const [user, setUser] = useState({
    nama: "Kasir",
    email: "kasir@danastockroom.com",
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
          email: parsed.email || "kasir@danastockroom.com",
        });
      } catch (error) {
        console.error(error);
      }
    }
  }, []);

  const logoSrc =
    mounted && theme === "dark"
      ? "/images/logo/dana-stockroom-logo-white.png"
      : "/images/logo/dana-stockroom-logo-dark.png";

  return (
    <>
      {/* OVERLAY MOBILE */}
      {isOpen && (
        <div
          className="
          fixed
          inset-0
          z-[60]

          bg-black/70
          backdrop-blur-sm

          xl:hidden
        "
          onClick={onClose}
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`
          fixed
          left-0
          top-0
          z-[70]
          flex
          h-screen
          w-[290px]
          xl:w-[280px]
          flex-col
          border-r
          border-gray-200
          bg-white
          transition-transform
          duration-300

          dark:border-white/10
          dark:bg-[#0F172A]

          xl:translate-x-0
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* LOGO */}
        <div
          className="
          relative
          
          border-b
          border-gray-200
          p-6
          
          dark:border-white/10
          "
        >
          <button
            onClick={onClose}
            className="
            absolute
            right-5
            top-5

            flex
            h-10
            w-10
            items-center
            justify-center

            rounded-xl

            bg-gray-100
            text-slate-900

            dark:bg-white/10
            dark:text-white

            xl:hidden
          "
          >
            ←
          </button>
          <div className="flex flex-col items-center text-center">
            <Link
              href="/dashboard-kasir"
              className="flex flex-col items-center"
            >
              <Image
                src={logoSrc}
                alt="Dana Stockroom"
                width={95}
                height={95}
                priority
                className="mb-4 object-contain"
              />

              <h1
                className="
                  text-2xl
                  font-extrabold
                  tracking-wide
                  text-slate-900

                  dark:text-white
                "
              >
                DANA
                <span className="text-sky-500">STOCKROOM</span>
              </h1>

              <p
                className="
                  mt-3
                  text-[10px]
                  font-medium
                  uppercase
                  tracking-[4px]
                  text-gray-500

                  dark:text-gray-400
                "
              >
                Dashboard Kasir
              </p>
            </Link>
          </div>
        </div>

        {/* MENU */}
        <nav
          className="
            flex-1
            overflow-y-auto
            p-4
            space-y-2

            scrollbar-thin
            scroll-smooth
          "
        >
          {KASIR_MENU.map((item) => {
            const active = pathname === item.url;

            const Icon = item.icon;

            return (
              <Link
                key={item.title}
                href={item.url}
                onClick={() => {
                  if (window.innerWidth < 1280) {
                    onClose();
                  }
                }}
                className={`
                  flex
                  items-center
                  gap-3
                  rounded-2xl
                  px-4
                  py-3
                  font-medium
                  transition-all

                  ${
                    active
                      ? `
                        bg-sky-500
                        text-white
                        shadow-md
                      `
                      : `
                        text-slate-700
                        hover:bg-gray-100

                        dark:text-gray-400
                        dark:hover:bg-white/5
                        dark:hover:text-white
                      `
                  }
                `}
              >
                <Icon className="h-5 w-5 shrink-0" />

                <span>{item.title}</span>
              </Link>
            );
          })}
        </nav>

        <div
          className="
    xl:hidden

    border-t
    border-gray-200
    p-4

    dark:border-white/10
  "
        >
          <div
            className="
        rounded-2xl
        border
        border-gray-200
        bg-gray-50

        p-3

        dark:border-white/10
        dark:bg-[#081028]
      "
          >
            <div className="flex items-center gap-3">
              <div
                className="
          flex
          h-12
          w-12
          items-center
          justify-center
          rounded-full
          bg-sky-500
          font-bold
          text-white
        "
              >
                {user.nama.charAt(0)}
              </div>

              <div className="min-w-0">
                <p
                  className="
                  truncate
                  font-semibold
                  text-sm
                "
                >
                  {user.nama}
                </p>

                <p
                  className="
                  truncate
                  text-[11px]
                  text-gray-500
                  dark:text-gray-400
                "
                >
                  {user.email}
                </p>
              </div>
            </div>

            <div className="mt-4 space-y-1">
              <Link
                href="/view-profile-kasir"
                className="
          flex
          items-center
          gap-3
          rounded-xl
          px-3
          py-2
          text-sm

          text-slate-700
          hover:bg-gray-100

          dark:text-gray-300
          dark:hover:bg-white/5
        "
              >
                <User size={16} />
                View Profile
              </Link>

              <button
                onClick={() => {
                  localStorage.removeItem("token");
                  localStorage.removeItem("user");
                  window.location.href = "/login";
                }}
                className="
          flex
          w-full
          items-center
          gap-3
          rounded-xl
          px-3
          py-2
          text-sm
          text-red-500

          hover:bg-red-50

          dark:hover:bg-red-500/10
        "
              >
                <LogOut size={16} />
                Logout
              </button>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
