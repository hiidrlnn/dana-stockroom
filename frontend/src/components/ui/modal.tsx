"use client";

import { ReactNode } from "react";

type Props = {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
};

export default function Modal({ open, onClose, title, children }: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-99999 flex items-center justify-center bg-black/60 px-4">
      <div className="w-full max-w-xl rounded-2xl border border-white/10 bg-[#0F172A] p-6 shadow-2xl">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">{title}</h2>

          <button
            onClick={onClose}
            className="text-2xl text-gray-400 transition hover:text-white">
            ×
          </button>
        </div>

        {/* Content */}
        {children}
      </div>
    </div>
  );
}
