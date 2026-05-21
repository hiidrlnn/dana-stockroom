"use client";

import React from "react";
import StatCard from "./stat-card"; // Mengarah ke stat-card.tsx selevel

export default function StatisticCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      <StatCard 
        title="Transaksi Hari Ini" 
        value="24" 
      />
      <StatCard 
        title="Pendapatan Hari Ini" 
        value="Rp 4.250.000" 
      />
      <StatCard 
        title="Produk Terjual" 
        value="18" 
      />
      <StatCard 
        title="Jasa Masuk" 
        value="6" 
      />
    </div>
  );
}