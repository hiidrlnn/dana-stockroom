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
  jasaMasuk = 0,
}: StatisticCardsProps) {
  const stats = [
    {
      title: "Transaksi Hari Ini",
      value: (transaksi ?? 0).toString(),
    },
    {
      title: "Pendapatan Hari Ini",
      value: `Rp ${(pendapatan ?? 0).toLocaleString("id-ID")}`,
    },
    {
      title: "Produk Terjual",
      value: (produkTerjual ?? 0).toString(),
    },
    {
      title: "Jasa Masuk",
      value: (jasaMasuk ?? 0).toString(),
    },
  ];

  return (
    <div
      className="
        grid
        grid-cols-1
        gap-4

        sm:grid-cols-2
        lg:grid-cols-2
        xl:grid-cols-4
      "
    >
      {stats.map((item) => (
        <Card
          key={item.title}
          className="
            border
            border-gray-200

            bg-white

            p-5
            sm:p-6

            transition-all
            duration-200

            hover:-translate-y-0.5
            hover:shadow-lg

            dark:border-white/10
            dark:bg-[#0F172A]
          "
        >
          <div
            className="
              flex
              h-full
              min-h-[110px]
              flex-col
              justify-between
            "
          >
            <h3
              className="
                text-sm
                font-medium

                text-gray-500

                dark:text-gray-400
              "
            >
              {item.title}
            </h3>

            <p
              className="
                mt-4

                break-words

                text-3xl
                font-bold

                leading-tight

                text-gray-900

                sm:text-4xl

                dark:text-white
              "
            >
              {item.value}
            </p>
          </div>
        </Card>
      ))}
    </div>
  );
}
