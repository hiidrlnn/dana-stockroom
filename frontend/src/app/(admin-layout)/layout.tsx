"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { Header } from "@/components/layout/header";
import { Sidebar } from "@/components/layout/sidebar";
import { SidebarProvider } from "@/components/layout/sidebar/sidebar-context";

import type { PropsWithChildren } from "react";

export default function WithLayout({ children }: PropsWithChildren) {
  const router = useRouter();

  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    const user = localStorage.getItem("user");

    // Belum login
    if (!token || token === "null" || token === "undefined") {
      localStorage.removeItem("token");

      localStorage.removeItem("user");

      router.replace("/login");

      return;
    }

    // Tidak ada data user
    if (!user) {
      router.replace("/login");

      return;
    }

    const userData = JSON.parse(user);

    // Bukan Admin
    if (userData.role !== "Admin") {
      router.replace("/login");

      return;
    }

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setAuthorized(true);
  }, [router]);

  if (!authorized) {
    return null;
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-white transition-colors dark:bg-[#020d1a]">
        <Sidebar />

        <div className="w-full">
          <Header />

          <main className="mx-auto w-full max-w-[1600px] p-4 md:p-6 2xl:p-10">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
