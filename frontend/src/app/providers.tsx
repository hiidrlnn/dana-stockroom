"use client";

import { ThemeProvider } from "next-themes";
import { type ReactNode } from "react";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider 
      attribute="class" 
      defaultTheme="light" 
      enableSystem={false}
      // Tambahkan ini untuk mencegah masalah rehidrasi atau script error
      disableTransitionOnChange 
    >
      {children}
    </ThemeProvider>
  );
}