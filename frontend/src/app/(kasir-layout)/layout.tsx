"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { KasirHeader } from "@/components/layout/kasir/header";
import { KasirSidebar } from "@/components/layout/kasir/sidebar";

type Props = {
  children: React.ReactNode;
};

export default function KasirLayout({ children }: Props) {
  const router = useRouter();

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [loading, setLoading] = useState(true);

  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");

    if (!token || token === "null" || token === "undefined") {
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      router.replace("/login");
      return;
    }

    if (!user) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      router.replace("/login");
      return;
    }

    try {
      const userData = JSON.parse(user);

      if (userData.role !== "Kasir") {
        router.replace("/login");
        return;
      }

      setIsAuthorized(true);
    } catch (error) {
      console.error(error);

      localStorage.removeItem("token");
      localStorage.removeItem("user");

      router.replace("/login");
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1280) {
        setSidebarOpen(false);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  if (loading) {
    return (
      <div
        className="
          flex
          min-h-screen
          items-center
          justify-center

          bg-gray-100

          dark:bg-[#020817]
        "
      >
        <p
          className="
            text-gray-500

            dark:text-gray-400
          "
        >
          Memuat Dashboard...
        </p>
      </div>
    );
  }

  if (!isAuthorized) {
    return null;
  }

  return (
    <div
      className="
        relative
        flex

        min-h-screen
        w-full

        bg-gray-100
        transition-colors

        dark:bg-[#020817]
      "
    >
      {/* SIDEBAR */}
      <KasirSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* CONTENT */}
      <div
        className="
          relative

          flex
          flex-1
          flex-col

          min-w-0

          xl:ml-[280px]
        "
      >
        {/* HEADER */}
        <KasirHeader onMenuClick={() => setSidebarOpen(true)} />

        {/* PAGE */}
        <main
          className="
            relative

            flex-1

            min-w-0

            p-4
            sm:p-6

            bg-gray-100
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
