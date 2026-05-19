import Card from "@/components/ui/card";

const cards = [
  {
    title: "Transaksi Hari Ini",
    value: "24",
  },
  {
    title: "Pendapatan Hari Ini",
    value: "Rp 4.250.000",
  },
  {
    title: "Produk Terjual",
    value: "18",
  },
  {
    title: "Jasa Masuk",
    value: "6",
  },
];

export function StatisticCards() {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map((item) => (
        <Card
          key={item.title}
          className="border border-gray-200 bg-white dark:border-white/10 dark:bg-[#0F172A]"
        >
          <h3 className="text-sm text-gray-500 dark:text-gray-400">
            {item.title}
          </h3>

          <p className="mt-3 text-3xl font-bold text-gray-900 dark:text-white">
            {item.value}
          </p>
        </Card>
      ))}
    </div>
  );
}