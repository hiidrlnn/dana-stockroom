"use client";

import Image from "next/image";
import Link from "next/link";

import { useSidebarContext } from "../sidebar/sidebar-context";
import { MenuIcon } from "./icons";
import { ThemeToggleSwitch } from "./theme-toggle";
import { UserInfo } from "./user-info";

export function Header() {
  const { toggleSidebar, isMobile } =
    useSidebarContext();

  return (
    <header
      className="
        sticky
        top-0
        z-30
        flex
        items-center
        justify-between
        border-b
        border-stroke
        bg-white
        px-4
        py-3
        md:py-5
        shadow-1
        transition-colors

        dark:border-stroke-dark
        dark:bg-gray-dark

        md:px-5
        2xl:px-10
      ">
      {/* LEFT */}
      <div className="flex items-center gap-4">
        <button
          onClick={toggleSidebar}
          className="
            rounded-xl
            border
            border-stroke
            bg-white
            px-2
            py-2
            transition
            hover:bg-gray-100

            dark:border-stroke-dark
            dark:bg-[#020D1A]
            dark:hover:bg-[#FFFFFF1A]

            lg:hidden
          ">
          <MenuIcon />

          <span className="sr-only">
            Toggle Sidebar
          </span>
        </button>

        {isMobile && (
          <Link
            href="/"
            className="ml-2 hidden max-[430px]:hidden 2xsm:block">
            <Image
              src="/images/logo/logo-icon.svg"
              width={32}
              height={32}
              alt="Logo"
            />
          </Link>
        )}

        {/* TITLE */}
      <div>
        <h1 className="text-xl font-bold text-dark dark:text-white md:text-heading-5">
          Dashboard
        </h1>

        <p className="hidden text-sm font-medium text-gray-500 dark:text-gray-400 md:block">
          Dashboard Admin Dana Stockroom
        </p>
      </div>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-2 md:gap-4">
        <ThemeToggleSwitch />

      <div className="shrink-0">
        <div className="hidden lg:block">
          <UserInfo />
        </div>
      </div>
      </div>
    </header>
  );
}