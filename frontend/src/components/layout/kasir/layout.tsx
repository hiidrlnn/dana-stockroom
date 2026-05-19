"use client";

import { useState } from "react";
import { KasirHeader } from "./header";
import { KasirSidebar } from "./sidebar";

type Props = {
  children: React.ReactNode;
};

export function KasirLayout({ children }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#020817]">
      <KasirSidebar
        isOpen={open}
        onClose={() => setOpen(false)}
      />

      <div className="xl:ml-[280px]">
        <KasirHeader
          onMenuClick={() => setOpen(true)}
        />

        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
}