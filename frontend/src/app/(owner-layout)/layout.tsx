"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import type { ReactNode } from "react";
import { OwnerLayout } from "@/components/layout/owner/layout";

type Props = {
  children: ReactNode;
};

export default function Layout({ children }: Props) {
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

    // Data user tidak ada
    if (!user) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      router.replace("/login");
      return;
    }

    try {
      const userData = JSON.parse(user);

      // Cek role
      if (userData.role !== "Owner") {
        router.replace("/login");
        return;
      }

      // eslint-disable-next-line react-hooks/set-state-in-effect
      setAuthorized(true);
    } catch (error) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      router.replace("/login");
    }
  }, [router]);

  if (!authorized) {
    return null;
  }

  return <OwnerLayout>{children}</OwnerLayout>;
}
