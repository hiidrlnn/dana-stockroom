"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { KasirHeader } from "@/components/layout/kasir/header";
import { KasirSidebar } from "@/components/layout/kasir/sidebar";

type Props = {
  children: React.ReactNode;
};

export default function KasirLayout({
  children,
}: Props) {
  const router = useRouter();

  const [sidebarOpen, setSidebarOpen] =
    useState(false);

  const [isAuthorized, setIsAuthorized] =
    useState(false);

  useEffect(() => {
    const token =
      localStorage.getItem("token");

    if (
      !token ||
      token === "null" ||
      token === "undefined"
    ) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      router.replace("/login");
      return;
    }

    setIsAuthorized(true);
  }, [router]);

  if (!isAuthorized) {
    return null;
  }

  return (
    <div
      className="
        flex
        min-h-screen
        bg-gray-100
        transition-colors
        dark:bg-[#020817]
      "
    >
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
          "
        >
          {children}
        </main>
      </div>
    </div>
  );
}