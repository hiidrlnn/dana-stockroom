import { PeriodPicker } from "@/components/period-picker";
import { cn } from "@/lib/utils";
import { PaymentsOverviewChart } from "./chart";

const API_URL =
  "http://127.0.0.1:8000/api/dashboard";

type PropsType = {
  timeFrame?: string;
  className?: string;
};

export async function PaymentsOverview({
  timeFrame = "Bulanan",
  className,
}: PropsType) {
  const response = await fetch(
    API_URL,
    {
      cache: "no-store",
    },
  );

  const dashboard =
    await response.json();

  const labels =
    dashboard.monthly_labels ?? [];

  const sales =
    dashboard.monthly_sales ?? [];

  const data = {
    received: labels.map(
      (
        label: string,
        index: number,
      ) => ({
        x: label,
        y:
          Number(
            sales[index],
          ) || 0,
      }),
    ),

    due: labels.map(
      (
        label: string,
        index: number,
      ) => ({
        x: label,
        y: 0,
      }),
    ),
  };

  const totalReceived =
    data.received.reduce(
      (acc: number, item: any) =>
        acc + item.y,
      0,
    );

  const formatRupiah = (
    value: number,
  ) => {
    return new Intl.NumberFormat(
      "id-ID",
      {
        style: "currency",
        currency: "IDR",
        maximumFractionDigits: 0,
      },
    ).format(value);
  };

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
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h2 className="text-body-2xlg font-bold text-gray-900 dark:text-white">
          Ringkasan Pembayaran
        </h2>

        <PeriodPicker
          defaultValue={
            timeFrame
          }
          sectionKey="payments_overview"
        />
      </div>

      <PaymentsOverviewChart
        data={data}
      />

      <dl
        className="
        grid
        divide-gray-200
        text-center
        dark:divide-dark-3
        sm:grid-cols-2
        sm:divide-x
      ">
        <div>
          <dt className="text-xl font-bold text-gray-900 dark:text-white">
            {formatRupiah(
              totalReceived,
            )}
          </dt>

          <dd className="font-medium text-gray-500">
            Diterima
          </dd>
        </div>

        <div>
          <dt className="text-xl font-bold text-gray-900 dark:text-white">
            Rp 0
          </dt>

          <dd className="font-medium text-gray-500">
            Belum Dibayar
          </dd>
        </div>
      </dl>
    </div>
  );
}