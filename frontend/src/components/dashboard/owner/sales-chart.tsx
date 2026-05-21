"use client";

import React from "react";

const chartData = [
  { day: "Sen", height: "h-24" },
  { day: "Sel", height: "h-40" },
  { day: "Rab", height: "h-28" },
  { day: "Kam", height: "h-48" },
  { day: "Jum", height: "h-36" },
  { day: "Sab", height: "h-52" },
  { day: "Min", height: "h-44" },
];

export default function SalesChart() {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm dark:border-white/5 dark:bg-[#0F172A] h-full">
      <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-6">
        Penjualan Mingguan
      </h3>
      
      {/* CONTAINER GRAFIK */}
      <div className="flex items-end justify-between gap-2 h-60 px-2 border-b border-gray-100 dark:border-white/5 pb-4">
        {chartData.map((item, index) => (
          <div key={index} className="flex flex-col items-center flex-1 group">
            {/* Batang Grafik */}
            <div className={`w-full ${item.height} rounded-t-xl bg-sky-500 transition-all duration-300 group-hover:bg-sky-600 shadow-md shadow-sky-500/10`} />
          </div>
        ))}
      </div>

      {/* LABEL HARI */}
      <div className="flex justify-between gap-2 mt-3 px-2">
        {chartData.map((item, index) => (
          <span key={index} className="flex-1 text-center text-xs font-semibold text-gray-400 dark:text-gray-500">
            {item.day}
          </span>
        ))}
      </div>
    </div>
  );
}