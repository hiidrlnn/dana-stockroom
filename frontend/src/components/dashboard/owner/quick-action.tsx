"use client";

import React from "react";

export default function QuickAction() {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm dark:border-white/5 dark:bg-[#0F172A]">
      <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-4">
        Quick Action
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <button className="flex items-center justify-center gap-2 rounded-2xl bg-sky-500 py-3.5 text-sm font-bold text-white shadow-md shadow-sky-500/10 hover:bg-sky-600 transition-all">
          + Transaksi Baru
        </button>
        <button className="flex items-center justify-center gap-2 rounded-2xl bg-sky-500 py-3.5 text-sm font-bold text-white shadow-md shadow-sky-500/10 hover:bg-sky-600 transition-all">
          + Input Jasa
        </button>
        <button className="flex items-center justify-center gap-2 rounded-2xl bg-sky-500 py-3.5 text-sm font-bold text-white shadow-md shadow-sky-500/10 hover:bg-sky-600 transition-all">
          Cetak Struk
        </button>
      </div>
    </div>
  );
}