"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import type { ReactNode } from "react";
import { OwnerLayout } from "@/components/layout/owner/layout";

type Props = {
  children: ReactNode;
};

export default function Layout({
  children,
}: Props) {
  const router = useRouter();

  const [authorized, setAuthorized] =
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

    setAuthorized(true);
  }, [router]);

  if (!authorized) {
    return null;
  }

  return (
    <OwnerLayout>
      {children}
    </OwnerLayout>
  );
}