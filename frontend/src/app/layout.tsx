import "@/css/satoshi.css";
import "@/css/style.css";

import "flatpickr/dist/flatpickr.min.css";
import "jsvectormap/dist/jsvectormap.css";

import type { Metadata } from "next";
import type { PropsWithChildren } from "react";

import { Toaster } from "sonner";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: {
    template: "%s | Dana Stockroom",
    default: "Dana Stockroom",
  },
  description: "Dashboard Admin Dana Stockroom",
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-white text-black transition-colors dark:bg-[#020d1a] dark:text-white">
        <Providers>
          {children}

          <Toaster
            position="bottom-right"
            richColors
            closeButton
            duration={5000}
            toastOptions={{
              className:
                "border border-stroke bg-white text-black dark:border-dark-3 dark:bg-gray-dark dark:text-white",
            }}
          />
        </Providers>
      </body>
    </html>
  );
}
