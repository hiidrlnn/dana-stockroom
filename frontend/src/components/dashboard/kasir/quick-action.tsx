"use client";

import { Scissors, ShoppingCart } from "lucide-react";

interface QuickActionProps {
  onOpenTransaction: () => void;
  onOpenJasa: () => void;
}

export function QuickAction({ onOpenTransaction, onOpenJasa }: QuickActionProps) {
  const actions = [
    {
      title: "Transaksi",
      icon: ShoppingCart,
      onClick: onOpenTransaction,
    },
    {
      title: "Jasa",
      icon: Scissors,
      onClick: onOpenJasa,
    },
  ];

  return (
    <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-[#0F172A]">
      <h2 className="mb-5 text-xl font-bold text-slate-900 dark:text-white">
        Quick Action
      </h2>

      <div className="grid grid-cols-2 gap-4">
        {actions.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.title}
              onClick={item.onClick}
              className="flex flex-col items-center justify-center gap-3 rounded-3xl border border-gray-200 bg-gray-50 py-6 transition hover:border-sky-500 hover:bg-sky-50 dark:border-white/10 dark:bg-[#081028] dark:hover:bg-[#1a243d]"
            >
              <Icon size={24} className="text-sky-500" />
              <span className="font-medium text-slate-900 dark:text-white">
                {item.title}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}