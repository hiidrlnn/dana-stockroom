import Card from "@/components/ui/card";

interface StatisticCardsProps {
  pendapatan?: number;
  transaksi?: number;
  produkTerjual?: number;
  jasaMasuk?: number;
}

export default function StatisticCards({
  pendapatan = 0,
  transaksi = 0,
  produkTerjual = 0,
  jasaMasuk = 0,
}: StatisticCardsProps) {
  const formatRupiah = (value: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(value);
  };

  const stats = [
    {
      title: "Transaksi Hari Ini",
      value: transaksi.toString(),
    },
    {
      title: "Pendapatan Hari Ini",
      value: formatRupiah(pendapatan),
    },
    {
      title: "Produk Terjual",
      value: produkTerjual.toString(),
    },
    {
      title: "Jasa Masuk",
      value: jasaMasuk.toString(),
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((item) => (
        <Card
          key={item.title}
          className="border border-gray-200 bg-white p-6 dark:border-white/10 dark:bg-[#0F172A]"
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