import Card from "@/components/ui/card";

export function QuickAction() {
  const actions = [
    "+ Transaksi Baru",
    "+ Input Jasa",
    "Cetak Struk",
  ];

  return (
    <Card className="border border-gray-200 bg-white dark:border-white/10 dark:bg-[#0F172A]">
      <h2 className="mb-5 text-xl font-semibold text-gray-900 dark:text-white">
        Quick Action
      </h2>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {actions.map((action) => (
          <button
            key={action}
            className="
              rounded-2xl
              bg-sky-500
              px-5
              py-5
              font-semibold
              text-white
              transition
              hover:bg-sky-600
            "
          >
            {action}
          </button>
        ))}
      </div>
    </Card>
  );
}