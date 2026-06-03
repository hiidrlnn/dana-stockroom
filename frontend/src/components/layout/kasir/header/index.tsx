"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useTheme } from "next-themes";

import {
  ChevronDown,
  Lock,
  LogOut,
  Menu,
  Moon,
  Settings,
  Sun,
  User,
} from "lucide-react";

type Props = {
  onMenuClick: () => void;
};

type UserData = {
  id?: number;
  nama: string;
  email: string;
  role: string;
  status?: string;
};

export function KasirHeader({ onMenuClick }: Props) {
  const router = useRouter();

  const { theme, setTheme } = useTheme();

  const [mounted, setMounted] = useState(false);

  const [openDropdown, setOpenDropdown] = useState(false);

  const [user, setUser] = useState<UserData>({
    nama: "Kasir",
    email: "kasir@danastockroom.com",
    role: "Kasir",
  });

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const userData = localStorage.getItem("user");

    if (userData) {
      try {
        const parsed = JSON.parse(userData);

        setUser({
          id: parsed.id,
          nama: parsed.nama || "Kasir",
          email: parsed.email || "kasir@danastockroom.com",
          role: parsed.role || "Kasir",
          status: parsed.status,
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
        setOpenDropdown(false);
      }
    }

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("token");

      if (token) {
        await fetch(
          "http://127.0.0.1:8000/api/logout",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/json",
            },
          }
        );
      }
    } catch (error) {
      console.error(error);
    } finally {
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      router.push("/login");
    }
  };

  return (
    <header
      className="
        sticky
        top-0
        z-30
        border-b
        border-gray-200
        bg-white
        px-6
        py-4
        transition-colors

        dark:border-white/10
        dark:bg-[#0F172A]
      "
    >
      <div className="flex items-center justify-between gap-5">
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
              text-slate-900
              transition
              hover:bg-gray-200

              dark:bg-white/5
              dark:text-white
              dark:hover:bg-white/10

              xl:hidden
            "
          >
            <Menu size={20} />
          </button>
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-4">
          {/* THEME */}
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
                p-2

                dark:border-white/10
                dark:bg-[#081028]
              "
            >
              <button
                onClick={() => setTheme("light")}
                className={`
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  rounded-full
                  transition
                  ${
                    theme === "light"
                      ? "bg-sky-500 text-white"
                      : "text-gray-500 dark:text-gray-400"
                  }
                `}
              >
                <Sun size={18} />
              </button>

              <button
                onClick={() => setTheme("dark")}
                className={`
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  rounded-full
                  transition
                  ${
                    theme === "dark"
                      ? "bg-sky-500 text-white"
                      : "text-gray-500 dark:text-gray-400"
                  }
                `}
              >
                <Moon size={18} />
              </button>
            </div>
          )}

          {/* PROFILE */}
          <div
            className="relative"
            ref={dropdownRef}
          >
            <button
              onClick={() =>
                setOpenDropdown(!openDropdown)
              }
              className="
                flex
                items-center
                gap-3
                rounded-2xl
                border
                border-gray-200
                bg-white
                px-4
                py-2

                dark:border-white/10
                dark:bg-[#0B1120]
              "
            >
              <div
                className="
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
                {user.nama.charAt(0).toUpperCase()}
              </div>

              <div className="hidden text-left md:block">
                <h4 className="font-semibold text-slate-900 dark:text-white">
                  {user.nama}
                </h4>

                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {user.role}
                </p>
              </div>

              <ChevronDown
                size={18}
                className={`transition ${
                  openDropdown ? "rotate-180" : ""
                }`}
              />
            </button>

            {openDropdown && (
              <div
                className="
                  absolute
                  right-0
                  top-[78px]
                  z-50
                  w-[290px]
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
                <div className="border-b border-gray-200 p-5 dark:border-white/10">
                  <div className="flex items-center gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-sky-500 text-xl font-bold text-white">
                      {user.nama.charAt(0).toUpperCase()}
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold dark:text-white">
                        {user.nama}
                      </h3>

                      <p className="text-sm text-gray-500">
                        {user.email}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-3">
                  <DropdownItem
                    href="/view-profile-kasir"
                    icon={<User size={18} />}
                    label="View Profile"
                  />

                  <DropdownItem
                    href="/pengaturan-akun-kasir"
                    icon={<Settings size={18} />}
                    label="Pengaturan Akun"
                  />

                  <DropdownItem
                    href="/pengaturan-akun-kasir"
                    icon={<Lock size={18} />}
                    label="Ganti Password"
                  />

                  <button
                    onClick={handleLogout}
                    className="
                      mt-2
                      flex
                      w-full
                      items-center
                      gap-3
                      rounded-xl
                      px-4
                      py-3
                      text-red-500
                      transition
                      hover:bg-red-50
                    "
                  >
                    <LogOut size={18} />
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

function DropdownItem({
  href,
  icon,
  label,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <Link
      href={href}
      className="
        flex
        items-center
        gap-3
        rounded-xl
        px-4
        py-3
        transition
        hover:bg-gray-100
        dark:hover:bg-white/5
      "
    >
      {icon}
      {label}
    </Link>
  );
}