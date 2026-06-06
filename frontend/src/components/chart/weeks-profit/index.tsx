import { PeriodPicker } from "@/components/period-picker";
import { cn } from "@/lib/utils";
import { WeeksProfitChart } from "./chart";

const API_URL =
  "http://127.0.0.1:8000/api/dashboard";

type PropsType = {
  timeFrame?: string;
  className?: string;
};

export async function WeeksProfit({
  className,
  timeFrame,
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
    dashboard.weekly_labels ??
    [];

  const sales =
    dashboard.weekly_sales ??
    [];

  const chartData = {
    sales: labels.map(
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

    revenue: labels.map(
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
  };

  return (
    <div
      className={cn(
        "rounded-[16px] border border-stroke bg-white px-6 pt-6 shadow-sm dark:border-dark-3 dark:bg-[#0F172A]",
        className,
      )}>
      <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
        <h2 className="text-2xl font-bold text-dark dark:text-white">
          Keuntungan{" "}
          {timeFrame ||
            "Minggu Ini"}
        </h2>

        <PeriodPicker
          items={[
            "Minggu Ini",
            "Minggu Terakhir",
          ]}
          defaultValue={
            timeFrame ||
            "Minggu Ini"
          }
          sectionKey="weeks_profit"
        />
      </div>

      <WeeksProfitChart
        data={chartData}
      />
    </div>
  );
}