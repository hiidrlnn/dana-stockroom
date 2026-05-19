import type { ReactNode } from "react";

import { OwnerLayout } from "@/components/layout/owner/layout";

type Props = {
  children: ReactNode;
};

export default function Layout({
  children,
}: Props) {
  return (
    <OwnerLayout>
      {children}
    </OwnerLayout>
  );
}