"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

import { OWNER_MENU } from "./data";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export function OwnerSidebar({
  isOpen,
  onClose,
}: Props) {
  const pathname = usePathname();

  const { theme } =
    useTheme();

  const [mounted, setMounted] =
    useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const logoSrc =
    mounted &&
    theme === "dark"
      ? "/images/logo/dana-stockroom-logo-white.png"
      : "/images/logo/dana-stockroom-logo-dark.png";

  return (
    <>
      {/* OVERLAY MOBILE */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 xl:hidden"
          onClick={onClose}
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`
          fixed
          left-0
          top-0
          z-50
          flex
          h-screen
          w-[280px]
          flex-col
          border-r
          border-gray-200
          bg-white
          transition-transform
          duration-300

          dark:border-white/10
          dark:bg-[#0F172A]

          xl:translate-x-0
          ${
            isOpen
              ? "translate-x-0"
              : "-translate-x-full"
          }
        `}>
        {/* HEADER / LOGO */}
        <div
          className="
            border-b
            border-gray-200
            p-6

            dark:border-white/10
          ">
          <div className="flex flex-col items-center text-center">
            <Link
              href="/dashboard-owner"
              className="flex flex-col items-center">
              {/* LOGO */}
              <Image
                src={logoSrc}
                alt="Dana Stockroom"
                width={95}
                height={95}
                priority
                className="mb-4 object-contain"
              />

              {/* BRAND */}
              <h1
                className="
                  text-2xl
                  font-extrabold
                  tracking-wide
                  text-slate-900

                  dark:text-white
                ">
                DANA
                <span className="text-sky-500">
                  STOCKROOM
                </span>
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
                ">
                Dashboard Owner
              </p>
            </Link>
          </div>
        </div>

        {/* MENU */}
        <nav className="flex-1 space-y-2 overflow-y-auto p-4">
          {OWNER_MENU.map((item) => {
            const active =
              pathname === item.url;

            const Icon =
              item.icon;

            return (
              <Link
                key={item.title}
                href={item.url}
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
                `}>
                <Icon className="h-5 w-5 shrink-0" />

                <span>
                  {item.title}
                </span>
              </Link>
            );
          })}
        </nav>

        {/* FOOTER */}
        <div
          className="
            border-t
            border-gray-200
            p-4

            dark:border-white/10
          ">
          <div
            className="
              rounded-2xl
              bg-sky-50
              p-4

              dark:bg-[#081028]
            ">
            <h4
              className="
                font-semibold
                text-slate-900

                dark:text-white
              ">
              Dana Stockroom
            </h4>

            <p
              className="
                mt-1
                text-sm
                text-gray-500

                dark:text-gray-400
              ">
              Dashboard owner untuk
              monitoring, laporan,
              dan pengelolaan sistem.
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}