"use client";

import React from "react";

interface StatCardProps {
  title: string;
  value: string;
}

export default function StatCard({ title, value }: StatCardProps) {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm dark:border-white/5 dark:bg-[#0F172A]">
      <p className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
        {title}
      </p>
      <p className="mt-2 text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
        {value}
      </p>
    </div>
  );
}