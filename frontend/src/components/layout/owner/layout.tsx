"use client";

import { useState } from "react";

import { OwnerHeader } from "./header";
import { OwnerSidebar } from "./sidebar";

type Props = {
  children: React.ReactNode;
};

export function OwnerLayout({
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

        dark:bg-[#020817]
      ">
      <OwnerSidebar
        isOpen={sidebarOpen}
        onClose={() =>
          setSidebarOpen(false)
        }
      />

      <div className="flex flex-1 flex-col xl:ml-[280px]">
        <OwnerHeader
          onMenuClick={() =>
            setSidebarOpen(true)
          }
        />

        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}