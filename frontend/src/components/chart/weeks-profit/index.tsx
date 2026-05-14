import { PeriodPicker } from "@/components/period-picker";
import { cn } from "@/lib/utils";
import { WeeksProfitChart } from "./chart";

type PropsType = {
  timeFrame?: string;
  className?: string;
};

export async function WeeksProfit({ className, timeFrame }: PropsType) {
  const chartData = {
    sales: [
      { x: "Sen", y: 120 },
      { x: "Sel", y: 150 },
      { x: "Rab", y: 180 },
      { x: "Kam", y: 140 },
      { x: "Jum", y: 210 },
      { x: "Sab", y: 250 },
      { x: "Min", y: 190 },
    ],

    revenue: [
      { x: "Sen", y: 80 },
      { x: "Sel", y: 110 },
      { x: "Rab", y: 130 },
      { x: "Kam", y: 100 },
      { x: "Jum", y: 160 },
      { x: "Sab", y: 190 },
      { x: "Min", y: 140 },
    ],
  };

  return (
    <div
      className={cn(
        "rounded-[16px] border border-stroke bg-white px-6 pt-6 shadow-sm dark:border-dark-3 dark:bg-[#0F172A]",
        className,
      )}>
      <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
        <h2 className="text-2xl font-bold text-dark dark:text-white">
          Keuntungan {timeFrame || "Minggu Ini"}
        </h2>

        <PeriodPicker
          items={["Minggu Ini", "Minggu Terakhir"]}
          defaultValue={timeFrame || "Minggu Ini"}
          sectionKey="weeks_profit"
        />
      </div>

      <WeeksProfitChart data={chartData} />
    </div>
  );
}
