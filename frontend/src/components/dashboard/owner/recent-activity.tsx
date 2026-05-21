"use client";

import React from "react";

const dummyTransactions = [
  { invoice: "INV-001", customer: "Dirlan", total: "Rp 1.850.000", status: "Selesai" },
  { invoice: "INV-002", customer: "Andi", total: "Rp 1.650.000", status: "Pending" },
  { invoice: "INV-003", customer: "Budi", total: "Rp 950.000", status: "Selesai" },
];

export default function RecentActivity() {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm dark:border-white/5 dark:bg-[#0F172A] h-full">
      <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-5">
        Transaksi Hari Ini
      </h3>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-slate-600 dark:text-gray-400">
          <thead>
            <tr className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase border-b border-gray-50 dark:border-white/5">
              <th className="pb-3 font-medium">Invoice</th>
              <th className="pb-3 font-medium">Customer</th>
              <th className="pb-3 font-medium">Total</th>
              <th className="pb-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50 dark:divide-white/5">
            {dummyTransactions.map((tx) => (
              <tr key={tx.invoice} className="hover:bg-gray-50/50 dark:hover:bg-white/5 transition-colors">
                <td className="py-4 font-semibold text-slate-900 dark:text-white">{tx.invoice}</td>
                <td className="py-4 text-gray-500 dark:text-gray-400">{tx.customer}</td>
                <td className="py-4 font-bold text-slate-900 dark:text-white">{tx.total}</td>
                <td className="py-4">
                  <span
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      tx.status === "Selesai"
                        ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400"
                        : "bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400"
                    }`}
                  >
                    {tx.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}