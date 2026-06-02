import Card from "@/components/ui/card";

interface StatisticCardsProps {
  pendapatan?: number;
  transaksi?: number;
  produkTerjual?: number;
  jasaMasuk?: number;
}

export function StatisticCards({ 
  pendapatan = 0, 
  transaksi = 0, 
  produkTerjual = 0, 
  jasaMasuk = 0 
}: StatisticCardsProps) {
  
  // Menggunakan nilai default 0 jika data belum ada
  const stats = [
    { title: "Transaksi Hari Ini", value: (transaksi ?? 0).toString() },
    { title: "Pendapatan Hari Ini", value: `Rp ${(pendapatan ?? 0).toLocaleString("id-ID")}` },
    { title: "Produk Terjual", value: (produkTerjual ?? 0).toString() },
    { title: "Jasa Masuk", value: (jasaMasuk ?? 0).toString() },
  ];

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((item) => (
        <Card
          key={item.title}
          className="border border-gray-200 bg-white p-6 dark:border-white/10 dark:bg-[#0F172A]"
        >
          <h3 className="text-sm text-gray-500 dark:text-gray-400">{item.title}</h3>
          <p className="mt-3 text-3xl font-bold text-gray-900 dark:text-white">
            {item.value}
          </p>
        </Card>
      ))}
    </div>
  );
}