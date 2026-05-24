import {
  Receipt,
  Scissors,
  ShoppingCart,
} from "lucide-react";

export function QuickAction() {
  const actions = [
    {
      title: "Transaksi",
      icon: ShoppingCart,
    },
    {
      title: "Jasa",
      icon: Scissors,
    },
    {
      title: "Cetak",
      icon: Receipt,
    },
  ];

  return (
    <div
      className="
        rounded-3xl
        border
        border-gray-200
        bg-white
        p-6
        shadow-sm

        dark:border-white/10
        dark:bg-[#0F172A]
      ">
      <h2 className="mb-5 text-xl font-bold text-slate-900 dark:text-white">
        Quick Action
      </h2>

      <div className="grid grid-cols-3 gap-4">
        {actions.map((item) => {
          const Icon = item.icon;

          return (
            <button
              key={item.title}
              className="
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
                transition
                hover:border-sky-500

                dark:border-white/10
                dark:bg-[#081028]
              ">
              <Icon
                size={24}
                className="text-sky-500"
              />

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