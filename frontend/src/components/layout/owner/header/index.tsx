"use client";

import { useEffect, useRef, useState } from "react";
import {
  Bell,
  ChevronDown,
  Lock,
  LogOut,
  Menu,
  Moon,
  Search,
  Settings,
  Sun,
  User,
} from "lucide-react";
import Link from "next/link";
import { useTheme } from "next-themes";

type Props = {
  onMenuClick: () => void;
};

export function OwnerHeader({
  onMenuClick,
}: Props) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpenDropdown(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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
      ">
      <div className="flex items-center justify-between gap-5">
        {/* LEFT SECTION */}
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
            ">
            <Menu size={20} />
          </button>

          <div className="relative hidden md:block">
            <Search
              size={18}
              className="
                absolute
                left-4
                top-1/2
                -translate-y-1/2
                text-gray-400
              "
            />

            <input
              type="text"
              placeholder="Cari menu..."
              className="
                w-[280px]
                rounded-2xl
                border
                border-gray-200
                bg-gray-100
                py-3
                pl-12
                pr-4
                text-slate-900
                outline-none
                transition
                placeholder:text-gray-500
                focus:border-sky-500

                dark:border-white/10
                dark:bg-[#1E293B]
                dark:text-white
              "
            />
          </div>
        </div>

        {/* RIGHT SECTION */}
        <div className="flex items-center gap-4">
          {/* THEME TOGGLE CAPSULE */}
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
              ">
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
                `}>
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
                `}>
                <Moon size={18} />
              </button>
            </div>
          )}

          {/* NOTIFICATION BELL */}
          <button
            className="
              relative
              flex
              h-12
              w-12
              items-center
              justify-center
              rounded-full
              border
              border-gray-200
              bg-gray-100

              dark:border-white/10
              dark:bg-[#0B1120]
            ">
            <Bell size={20} />
            <span className="absolute right-3 top-3 h-2.5 w-2.5 rounded-full bg-red-500" />
          </button>

          {/* PROFILE ACCORDING TO USER ROLE */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setOpenDropdown(!openDropdown)}
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
              ">
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
                ">
                O
              </div>

              <div className="hidden text-left md:block">
                <h4 className="font-semibold text-slate-900 dark:text-white">
                  Owner
                </h4>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Dana Stockroom
                </p>
              </div>

              <ChevronDown
                size={18}
                className={`
                  transition
                  ${openDropdown ? "rotate-180" : ""}
                `}
              />
            </button>

            {/* DROPDOWN MENU */}
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
                ">
                {/* USER INFO HEADER */}
                <div className="border-b border-gray-200 p-5 dark:border-white/10">
                  <div className="flex items-center gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-sky-500 text-xl font-bold text-white">
                      O
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold dark:text-white">
                        Owner
                      </h3>
                      <p className="text-sm text-gray-500">
                        owner@danastockroom.com
                      </p>
                    </div>
                  </div>
                </div>

                {/* OWNER NAVIGATION LINKS */}
                <div className="p-3">
                  <DropdownItem
                    href="/view-profile-owner"
                    icon={<User size={18} />}
                    label="View Profile"
                  />

                  <DropdownItem
                    href="/pengaturan-akun-owner"
                    icon={<Settings size={18} />}
                    label="Pengaturan Akun"
                  />

                  <DropdownItem
                    href="/ganti-password-owner"
                    icon={<Lock size={18} />}
                    label="Ganti Password"
                  />

                  <button
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
                      hover:bg-red-50
                      dark:hover:bg-red-500/10
                    ">
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
      ">
      {icon}
      {label}
    </Link>
  );
}