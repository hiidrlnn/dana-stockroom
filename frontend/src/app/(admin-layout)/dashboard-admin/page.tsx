import { PaymentsOverview } from "@/components/chart/payments-overview";
import { WeeksProfit } from "@/components/chart/weeks-profit";

import { createTimeFrameExtractor } from "@/utils/timeframe-extractor";

import { Suspense } from "react";

import { OverviewCardsGroup } from "./_components/overview-cards";
import { OverviewCardsSkeleton } from "./_components/overview-cards/skeleton";

import Card from "@/components/ui/card";

type PropsType = {
  searchParams: Promise<{
    selected_time_frame?: string;
  }>;
};

const recentTransactions = [
  {
    id: 1,
    invoice: "INV-001",
    customer: "Dirlan",
    total: "Rp 3.700.000",
    status: "Selesai",
  },

  {
    id: 2,
    invoice: "INV-002",
    customer: "Andi",
    total: "Rp 1.650.000",
    status: "Pending",
  },

  {
    id: 3,
    invoice: "INV-003",
    customer: "Budi",
    total: "Rp 2.100.000",
    status: "Selesai",
  },

  {
    id: 4,
    invoice: "INV-004",
    customer: "Rizky",
    total: "Rp 950.000",
    status: "Dibatalkan",
  },
];

export default async function Home({ searchParams }: PropsType) {
  const { selected_time_frame } = await searchParams;

  const extractTimeFrame = createTimeFrameExtractor(selected_time_frame);

  return (
    <>
      {/* OVERVIEW CARD */}
      <Suspense fallback={<OverviewCardsSkeleton />}>
        <OverviewCardsGroup />
      </Suspense>

      {/* CHART */}
      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-9 2xl:gap-7.5">
        <PaymentsOverview
          className="col-span-12 xl:col-span-7"
          key={extractTimeFrame("payments_overview")}
          timeFrame={extractTimeFrame("payments_overview")?.split(":")[1]}
        />

        <WeeksProfit
          key={extractTimeFrame("weeks_profit")}
          timeFrame={extractTimeFrame("weeks_profit")?.split(":")[1]}
          className="col-span-12 xl:col-span-5"
        />
      </div>

      {/* RECENT TRANSACTION */}
      <div className="mt-6">
        <Card className="border border-gray-200 bg-white shadow-sm dark:border-white/10 dark:bg-[#0F172A]">
          {/* HEADER */}
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Transaksi Terbaru
              </h2>

              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Aktivitas transaksi terbaru Dana Stockroom
              </p>
            </div>

            <button
              className="
                rounded-xl
                bg-sky-500
                px-4
                py-2
                text-sm
                font-semibold
                text-white
                transition
                hover:bg-sky-600
              ">
              Lihat Semua
            </button>
          </div>

          {/* TABLE */}
          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px]">
              <thead>
                <tr className="border-b border-gray-200 dark:border-white/10">
                  <th className="pb-4 text-left text-sm font-medium text-gray-500 dark:text-gray-400">
                    Invoice
                  </th>

                  <th className="pb-4 text-left text-sm font-medium text-gray-500 dark:text-gray-400">
                    Customer
                  </th>

                  <th className="pb-4 text-left text-sm font-medium text-gray-500 dark:text-gray-400">
                    Total
                  </th>

                  <th className="pb-4 text-left text-sm font-medium text-gray-500 dark:text-gray-400">
                    Status
                  </th>
                </tr>
              </thead>

              <tbody>
                {recentTransactions.map((item) => (
                  <tr
                    key={item.id}
                    className="border-b border-gray-200 dark:border-white/5">
                    {/* INVOICE */}
                    <td className="py-5">
                      <div>
                        <p className="font-semibold text-gray-900 dark:text-white">
                          {item.invoice}
                        </p>

                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                          Dana Stockroom
                        </p>
                      </div>
                    </td>

                    {/* CUSTOMER */}
                    <td className="py-5 text-gray-700 dark:text-gray-300">
                      {item.customer}
                    </td>

                    {/* TOTAL */}
                    <td className="py-5 font-semibold text-gray-700 dark:text-gray-300">
                      {item.total}
                    </td>

                    {/* STATUS */}
                    <td className="py-5">
                      <span
                        className={`
                          rounded-full
                          px-3
                          py-1
                          text-xs
                          font-semibold

                          ${
                            item.status === "Selesai"
                              ? "bg-green-100 text-green-600 dark:bg-green-500/20 dark:text-green-400"
                              : item.status === "Pending"
                                ? "bg-yellow-100 text-yellow-600 dark:bg-yellow-500/20 dark:text-yellow-400"
                                : "bg-red-100 text-red-600 dark:bg-red-500/20 dark:text-red-400"
                          }
                        `}>
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </>
  );
}
