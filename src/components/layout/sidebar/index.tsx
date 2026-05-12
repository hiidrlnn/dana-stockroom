"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { NAV_DATA } from "./data";

import { ArrowLeftIcon, ChevronUp } from "./icons";

import { MenuItem } from "./menu-item";

import { useSidebarContext } from "./sidebar-context";

export function Sidebar() {
  const pathname = usePathname();

  const { setIsOpen, isOpen, isMobile, toggleSidebar } = useSidebarContext();

  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const toggleExpanded = (title: string) => {
    setExpandedItems((prev) => (prev.includes(title) ? [] : [title]));
  };

  useEffect(() => {
    NAV_DATA.forEach((section) => {
      section.items.forEach((item) => {
        if (!item.items?.length) return;

        const hasActiveSubmenu = item.items.some(
          (subItem) => subItem.url === pathname,
        );

        if (hasActiveSubmenu && !expandedItems.includes(item.title)) {
          setExpandedItems([item.title]);
        }
      });
    });
  }, [pathname]);

  return (
    <>
      {/* BACKDROP MOBILE */}
      {isMobile && isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={cn(
          `
            border-r
            border-stroke
            bg-white
            transition-all
            duration-300

            dark:border-dark-3
            dark:bg-[#0F172A]
          `,

          isMobile
            ? `
                fixed
                inset-y-0
                left-0
                z-50
              `
            : `
                sticky
                top-0
                h-screen
                shrink-0
              `,

          isOpen ? "w-[290px]" : "w-0",

          !isOpen && "overflow-hidden",
        )}
        aria-label="Main navigation">
        <div className="flex h-full flex-col py-8 pl-5 pr-2">
          {/* LOGO */}
          <div className="relative mb-8 pr-4">
            <Link
              href="/dashboard"
              onClick={() => isMobile && toggleSidebar()}
              className="flex items-center gap-2">
              <div className="flex flex-col leading-none">
                <span className="text-2xl font-extrabold tracking-wide text-dark dark:text-white">
                  DANA
                  <span className="text-sky-500">STOCKROOM</span>
                </span>

                <span
                  className="
                    mt-1
                    text-[10px]
                    font-medium
                    uppercase
                    tracking-[4px]
                    text-gray-400
                  ">
                  Admin Dashboard
                </span>
              </div>
            </Link>

            {/* CLOSE MOBILE */}
            {isMobile && (
              <button
                onClick={toggleSidebar}
                className="
                  absolute
                  right-2
                  top-1/2
                  -translate-y-1/2
                ">
                <ArrowLeftIcon className="size-6" />
              </button>
            )}
          </div>

          {/* MENU */}
          <div
            className="
              custom-scrollbar
              flex-1
              overflow-y-auto
              overflow-x-hidden
              pr-2
            ">
            {NAV_DATA.map((section) => (
              <div key={section.label} className="mb-7">
                {/* LABEL */}
                <h2
                  className="
                    mb-4
                    pl-2
                    text-xs
                    font-semibold
                    uppercase
                    tracking-[2px]
                    text-gray-400
                  ">
                  {section.label}
                </h2>

                {/* NAV */}
                <nav aria-label={section.label}>
                  <ul className="space-y-2">
                    {section.items.map((item) => {
                      const hasSubmenu = item.items && item.items.length > 0;

                      /* SUBMENU */
                      if (hasSubmenu) {
                        return (
                          <li key={item.title}>
                            <MenuItem
                              isActive={item.items.some(
                                (subItem) => pathname === subItem.url,
                              )}
                              onClick={() => toggleExpanded(item.title)}>
                              <item.icon
                                className="size-5 shrink-0"
                                aria-hidden="true"
                              />

                              <span>{item.title}</span>

                              <ChevronUp
                                className={cn(
                                  `
                                    ml-auto
                                    rotate-180
                                    transition-transform
                                    duration-200
                                  `,
                                  expandedItems.includes(item.title) &&
                                    "rotate-0",
                                )}
                              />
                            </MenuItem>

                            {/* SUBMENU ITEMS */}
                            {expandedItems.includes(item.title) && (
                              <ul className="ml-8 mt-2 space-y-1">
                                {item.items.map((subItem) => (
                                  <li key={subItem.title}>
                                    <MenuItem
                                      as="link"
                                      href={subItem.url}
                                      isActive={pathname === subItem.url}>
                                      <span>{subItem.title}</span>
                                    </MenuItem>
                                  </li>
                                ))}
                              </ul>
                            )}
                          </li>
                        );
                      }

                      /* SINGLE MENU */
                      const href =
                        item.url ||
                        `/${item.title.toLowerCase().replace(/\s+/g, "-")}`;

                      return (
                        <li key={item.title}>
                          <MenuItem
                            as="link"
                            href={href}
                            isActive={pathname === href}
                            className="
                              flex
                              items-center
                              gap-3
                              py-3
                            ">
                            <item.icon
                              className="size-5 shrink-0"
                              aria-hidden="true"
                            />

                            <span>{item.title}</span>
                          </MenuItem>
                        </li>
                      );
                    })}
                  </ul>
                </nav>
              </div>
            ))}
          </div>
        </div>
      </aside>
    </>
  );
}
