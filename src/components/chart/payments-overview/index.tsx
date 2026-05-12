import { PeriodPicker } from "@/components/period-picker";
import { cn } from "@/lib/utils";

import { PaymentsOverviewChart } from "./chart";

type PropsType = {
  timeFrame?: string;
  className?: string;
};

export async function PaymentsOverview({
  timeFrame = "Bulanan",
  className,
}: PropsType) {
  /* =========================
     FORMAT RUPIAH
  ========================= */
  const formatRupiah = (value: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(value);
  };

  /* =========================
     DUMMY DATA
  ========================= */
  const data = {
    received: [
      { x: "Jan", y: 1200000 },
      { x: "Feb", y: 1900000 },
      { x: "Mar", y: 1500000 },
      { x: "Apr", y: 2200000 },
      { x: "Mei", y: 2800000 },
    ],

    due: [
      { x: "Jan", y: 400000 },
      { x: "Feb", y: 700000 },
      { x: "Mar", y: 500000 },
      { x: "Apr", y: 800000 },
      { x: "Mei", y: 650000 },
    ],
  };

  /* =========================
     TOTAL
  ========================= */
  const totalReceived = data.received.reduce((acc, { y }) => acc + y, 0);

  const totalDue = data.due.reduce((acc, { y }) => acc + y, 0);

  return (
    <div
      className={cn(
        `
          grid
          gap-2
          rounded-[10px]
          border
          border-gray-200
          bg-white
          px-7.5
          pb-6
          pt-7.5
          shadow-1

          dark:border-white/10
          dark:bg-gray-dark
          dark:shadow-card
        `,
        className,
      )}>
      {/* HEADER */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h2 className="text-body-2xlg font-bold text-gray-900 dark:text-white">
          Ringkasan Pembayaran
        </h2>

        <PeriodPicker defaultValue={timeFrame} sectionKey="payments_overview" />
      </div>

      {/* CHART */}
      <PaymentsOverviewChart data={data} />

      {/* SUMMARY */}
      <dl
        className="
          grid
          divide-gray-200
          text-center

          dark:divide-dark-3

          sm:grid-cols-2
          sm:divide-x

          [&>div]:flex
          [&>div]:flex-col-reverse
          [&>div]:gap-1
        ">
        {/* DITERIMA */}
        <div className="max-sm:mb-3 max-sm:border-b max-sm:border-gray-200 max-sm:pb-3 dark:max-sm:border-white/10">
          <dt className="text-xl font-bold text-gray-900 dark:text-white">
            {formatRupiah(totalReceived)}
          </dt>

          <dd className="font-medium text-gray-500 dark:text-dark-6">
            Diterima
          </dd>
        </div>

        {/* BELUM DIBAYAR */}
        <div>
          <dt className="text-xl font-bold text-gray-900 dark:text-white">
            {formatRupiah(totalDue)}
          </dt>

          <dd className="font-medium text-gray-500 dark:text-dark-6">
            Belum Dibayar
          </dd>
        </div>
      </dl>
    </div>
  );
}
