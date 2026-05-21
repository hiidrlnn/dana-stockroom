import type { ReactNode } from "react";
import { OwnerLayout } from "@/components/layout/owner/layout"; // Pastikan path ini mengarah ke file layout pembungkus utama komponen sidebar/header Anda

type Props = {
  children: ReactNode;
};

export default function Layout({ children }: Props) {
  return <OwnerLayout>{children}</OwnerLayout>;
}