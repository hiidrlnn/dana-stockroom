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

  async function getDashboardData() {
    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/dashboard",
        {
          cache: "no-store",
        },
      );

      if (!response.ok) {
        return {
          latest_transactions: [],
        };
      }

      return await response.json();
    } catch {
      return {
        latest_transactions: [],
      };
    }
  }

  export default async function Home({
    searchParams,
  }: PropsType) {
    const { selected_time_frame } =
      await searchParams;

    const extractTimeFrame =
      createTimeFrameExtractor(
        selected_time_frame,
      );

    const dashboard =
      await getDashboardData();

    const recentTransactions =
      dashboard.latest_transactions ||
      [];

    return (
      <>
        {/* OVERVIEW CARD */}
        <Suspense
          fallback={
            <OverviewCardsSkeleton />
          }>
          <OverviewCardsGroup />
        </Suspense>

        {/* CHART */}
        <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-9 2xl:gap-7.5">
          <PaymentsOverview
            className="col-span-12 xl:col-span-7"
            key={extractTimeFrame(
              "payments_overview",
            )}
            timeFrame={extractTimeFrame(
              "payments_overview",
            )?.split(":")[1]}
          />

          <WeeksProfit
            key={extractTimeFrame(
              "weeks_profit",
            )}
            timeFrame={extractTimeFrame(
              "weeks_profit",
            )?.split(":")[1]}
            className="col-span-12 xl:col-span-5"
          />
        </div>

        {/* TRANSAKSI TERBARU */}
        <div className="mt-6">
          <Card className="border border-gray-200 bg-white shadow-sm dark:border-white/10 dark:bg-[#0F172A]">
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Transaksi Terbaru
                </h2>

                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  Aktivitas transaksi terbaru Dana
                  Stockroom
                </p>
              </div>
            </div>

{/* MOBILE + TABLET */}
<div className="grid gap-4 xl:hidden">
  {recentTransactions.length > 0 ? (
    recentTransactions.map((item: any) => (
      <div
        key={item.id}
        className="
          rounded-2xl
          border
          border-gray-200
          bg-white
          p-4
          shadow-sm

          dark:border-white/10
          dark:bg-[#0F172A]
        "
      >
        <div className="space-y-3">

          <div>
            <h3 className="font-bold text-gray-900 dark:text-white">
              {item.invoice_number}
            </h3>

            <p className="text-xs text-gray-500 dark:text-gray-400">
              Dana Stockroom
            </p>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-400">
              Customer
            </span>

            <span className="font-medium text-gray-900 dark:text-white">
              {item.customer_name}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-400">
              Total
            </span>

            <span className="font-semibold text-green-600 dark:text-green-400">
              Rp{" "}
              {Number(item.total).toLocaleString(
                "id-ID"
              )}
            </span>
          </div>

          <div className="pt-2">
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
              `}
            >
              {item.status}
            </span>
          </div>

        </div>
      </div>
    ))
  ) : (
    <Card>
      <p className="text-center text-gray-500 dark:text-gray-400">
        Belum ada transaksi
      </p>
    </Card>
  )}
</div>

{/* DESKTOP */}
<div className="hidden xl:block overflow-x-auto">
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
      {recentTransactions.length > 0 ? (
        recentTransactions.map(
          (item: any) => (
            <tr
              key={item.id}
              className="border-b border-gray-200 dark:border-white/5"
            >
              <td className="py-5">
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">
                    {item.invoice_number}
                  </p>

                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    Dana Stockroom
                  </p>
                </div>
              </td>

              <td className="py-5 text-gray-700 dark:text-gray-300">
                {item.customer_name}
              </td>

              <td className="py-5 font-semibold text-gray-700 dark:text-gray-300">
                Rp{" "}
                {Number(
                  item.total
                ).toLocaleString(
                  "id-ID"
                )}
              </td>

              <td className="py-5">
                <span
                  className={`
                    rounded-full
                    px-3
                    py-1
                    text-xs
                    font-semibold

                    ${
                      item.status ===
                      "Selesai"
                        ? "bg-green-100 text-green-600 dark:bg-green-500/20 dark:text-green-400"
                        : item.status ===
                          "Pending"
                        ? "bg-yellow-100 text-yellow-600 dark:bg-yellow-500/20 dark:text-yellow-400"
                        : "bg-red-100 text-red-600 dark:bg-red-500/20 dark:text-red-400"
                    }
                  `}
                >
                  {item.status}
                </span>
              </td>
            </tr>
          )
        )
      ) : (
        <tr>
          <td
            colSpan={4}
            className="py-10 text-center text-gray-500 dark:text-gray-400"
          >
            Belum ada transaksi
          </td>
        </tr>
      )}
    </tbody>
  </table>
</div>
          </Card>
        </div>
      </>
    );
  }