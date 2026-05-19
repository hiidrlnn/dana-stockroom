"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

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

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 xl:hidden"
          onClick={onClose}
        />
      )}

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
        <div className="border-b border-gray-200 p-6 dark:border-white/10">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
            DANA
            <span className="text-sky-500">
              STOCKROOM
            </span>
          </h1>

          <p className="mt-2 text-xs uppercase tracking-[4px] text-gray-500 dark:text-gray-400">
            Dashboard Owner
          </p>
        </div>

        <nav className="flex-1 space-y-2 p-4">
          {OWNER_MENU.map((item) => {
            const active =
              pathname === item.url;

            const Icon = item.icon;

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
                      ? "bg-sky-500 text-white shadow-md"
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

                <span>{item.title}</span>
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
}