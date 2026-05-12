import { cn } from "@/lib/utils";

type Props = {
  label: string;
  data: {
    value: string;
    growthRate?: string;
    period?: string;
  };
  Icon: React.ComponentType<any>;
};

export function OverviewCard({ label, data, Icon }: Props) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-stroke bg-white px-6 py-5 shadow-1 transition-all dark:border-dark-3 dark:bg-gray-dark dark:shadow-card",
      )}>
      <div className="flex flex-col items-center text-center">
        <div className="mb-2 text-primary">
          <Icon className="h-5 w-5" />
        </div>

        <span className="text-sm font-semibold text-dark dark:text-white">
          {label}
        </span>

        <h3 className="mt-2 text-4xl font-extrabold tracking-tight text-dark dark:text-white">
          {data.value}
        </h3>

        <p className="mt-1 text-xs uppercase tracking-[3px] text-gray-500 dark:text-dark-6">
          {data.growthRate} {data.period}
        </p>
      </div>
    </div>
  );
}
