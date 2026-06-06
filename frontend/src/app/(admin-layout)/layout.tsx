"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { Header } from "@/components/layout/header";
import { Sidebar } from "@/components/layout/sidebar";
import { SidebarProvider } from "@/components/layout/sidebar/sidebar-context";

import type { PropsWithChildren } from "react";

export default function WithLayout({
  children,
}: PropsWithChildren) {
  const router = useRouter();

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
    }
  }, [router]);

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