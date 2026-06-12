"use client";

import { Scissors, ShoppingCart } from "lucide-react";

interface QuickActionProps {
  onOpenTransaction: () => void;
  onOpenJasa: () => void;
}

export function QuickAction({
  onOpenTransaction,
  onOpenJasa,
}: QuickActionProps) {
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
    <div
      className="
        rounded-3xl
        border
        border-gray-200
        bg-white

        p-4
        sm:p-6

        shadow-sm

        dark:border-white/10
        dark:bg-[#0F172A]
      "
    >
      <h2
        className="
          mb-4
          text-lg
          font-bold

          text-slate-900

          sm:mb-5
          sm:text-xl

          dark:text-white
        "
      >
        Quick Action
      </h2>

      <div
        className="
          grid
          grid-cols-1
          gap-3

          sm:grid-cols-2
          sm:gap-4
        "
      >
        {actions.map((item) => {
          const Icon = item.icon;

          return (
            <button
              key={item.title}
              onClick={item.onClick}
              className="
                group

                flex
                flex-col
                items-center
                justify-center

                gap-3

                rounded-3xl
                border
                border-gray-200

                bg-gray-50

                py-6
                px-4

                transition-all
                duration-200

                hover:-translate-y-1
                hover:border-sky-500
                hover:bg-sky-50

                dark:border-white/10
                dark:bg-[#081028]
                dark:hover:bg-[#111C34]
              "
            >
              <div
                className="
                  flex
                  h-12
                  w-12
                  items-center
                  justify-center

                  rounded-2xl

                  bg-sky-500/10

                  transition-all

                  group-hover:bg-sky-500/20
                "
              >
                <Icon
                  size={24}
                  className="
                    text-sky-500
                  "
                />
              </div>

              <span
                className="
                  text-sm
                  font-semibold

                  text-slate-900

                  sm:text-base

                  dark:text-white
                "
              >
                {item.title}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
