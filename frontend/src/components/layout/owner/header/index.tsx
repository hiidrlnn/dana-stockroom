"use client";

import { Menu } from "lucide-react";

type Props = {
  onMenuClick: () => void;
};

export function OwnerHeader({
  onMenuClick,
}: Props) {
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

        dark:border-white/10
        dark:bg-[#0F172A]
      ">
      <div className="flex items-center justify-between">
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
          ">
          <Menu size={20} />
        </button>

        <h1 className="text-lg font-semibold text-slate-900 dark:text-white">
          Owner Dashboard
        </h1>
      </div>
    </header>
  );
}