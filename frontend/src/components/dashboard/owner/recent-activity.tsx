"use client";

import React, { useEffect, useState } from "react";

interface Transaction {
id: number;
invoice_number: string;
customer_name: string;
total: number;
status: string;
created_at: string;
}

export default function RecentActivity() {
const [transactions, setTransactions] = useState<Transaction[]>([]);
const [loading, setLoading] = useState(true);

const fetchTransactions = async () => {
try {
const response = await fetch(
"http://127.0.0.1:8000/api/transactions"
);

  const data = await response.json();

  const today = new Date().toISOString().split("T")[0];

  const todayTransactions = data.filter(
    (item: Transaction) =>
      item.created_at?.split("T")[0] === today
  );

  setTransactions(todayTransactions);
} catch (error) {
  console.error("Gagal mengambil transaksi:", error);
} finally {
  setLoading(false);
}


};

useEffect(() => {
fetchTransactions();


const interval = setInterval(() => {
  fetchTransactions();
}, 5000);

return () => clearInterval(interval);


}, []);

return ( <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm dark:border-white/5 dark:bg-[#0F172A] h-full"> <h3 className="mb-5 text-sm font-bold text-slate-900 dark:text-white">
Transaksi Hari Ini </h3>


  {loading ? (
    <div className="py-6 text-center text-gray-500">
      Memuat transaksi...
    </div>
  ) : transactions.length === 0 ? (
    <div className="py-6 text-center text-gray-500">
      Belum ada transaksi hari ini
    </div>
  ) : (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-sm text-slate-600 dark:text-gray-400">
        <thead>
          <tr className="border-b border-gray-50 text-xs font-semibold uppercase text-gray-400 dark:border-white/5 dark:text-gray-500">
            <th className="pb-3 font-medium">Invoice</th>
            <th className="pb-3 font-medium">Customer</th>
            <th className="pb-3 font-medium">Total</th>
            <th className="pb-3 font-medium">Status</th>
            <th className="pb-3 font-medium">Waktu</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-50 dark:divide-white/5">
          {transactions.map((tx) => (
            <tr
              key={tx.id}
              className="transition-colors hover:bg-gray-50/50 dark:hover:bg-white/5"
            >
              <td className="py-4 font-semibold text-slate-900 dark:text-white">
                {tx.invoice_number}
              </td>

              <td className="py-4 text-gray-500 dark:text-gray-400">
                {tx.customer_name}
              </td>

              <td className="py-4 font-bold text-slate-900 dark:text-white">
                Rp {Number(tx.total).toLocaleString("id-ID")}
              </td>

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

              <td className="py-4">
                {new Date(tx.created_at).toLocaleTimeString(
                  "id-ID",
                  {
                    hour: "2-digit",
                    minute: "2-digit",
                  }
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )}
</div>


);
}
