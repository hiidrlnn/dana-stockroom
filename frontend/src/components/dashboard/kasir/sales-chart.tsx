import Card from "@/components/ui/card";

export function SalesChart() {
  const data = [
    100,
    180,
    120,
    240,
    190,
    270,
    210,
  ];

  const days = ["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"];

  return (
    <Card className="border border-gray-200 bg-white dark:border-white/10 dark:bg-[#0F172A]">
      <h2 className="mb-6 text-xl font-semibold text-gray-900 dark:text-white">
        Penjualan Mingguan
      </h2>

      <div className="flex h-[300px] items-end justify-between gap-3">
        {data.map((value, index) => (
          <div
            key={index}
            className="flex flex-1 flex-col items-center gap-3"
          >
            <div
              className="w-full rounded-t-xl bg-sky-500"
              style={{
                height: `${value}px`,
              }}
            />

            <span className="text-sm text-gray-500 dark:text-gray-400">
              {days[index]}
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
}