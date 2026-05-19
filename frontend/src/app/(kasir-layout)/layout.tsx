"use client";

import { useState } from "react";

import { KasirHeader } from "@/components/layout/kasir/header";
import { KasirSidebar } from "@/components/layout/kasir/sidebar";

type Props = {
  children: React.ReactNode;
};

export default function KasirLayout({
  children,
}: Props) {
  const [sidebarOpen, setSidebarOpen] =
    useState(false);

  return (
    <div
      className="
        flex
        min-h-screen
        bg-gray-100
        transition-colors

        dark:bg-[#020817]
      ">
      {/* SIDEBAR */}
      <KasirSidebar
        isOpen={sidebarOpen}
        onClose={() =>
          setSidebarOpen(false)
        }
      />

      {/* CONTENT */}
      <div className="flex flex-1 flex-col xl:ml-[280px]">
        {/* HEADER */}
        <KasirHeader
          onMenuClick={() =>
            setSidebarOpen(true)
          }
        />

        {/* PAGE */}
        <main
          className="
            flex-1
            bg-gray-100
            p-6
            transition-colors

            dark:bg-[#020817]
          ">
          {children}
        </main>
      </div>
    </div>
  );
}