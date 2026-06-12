"use client";

import Card from "@/components/ui/card";

interface Transaction {
  id: number;
  invoice_number: string;
  kasir_name: string;
  total: number;
  status: string;
}

interface RecentTransactionProps {
  transactions: Transaction[];
  isLoading: boolean;
}

export function RecentTransaction({
  transactions,
  isLoading,
}: RecentTransactionProps) {
  return (
    <Card
      className="
        border
        border-gray-200
        bg-white

        dark:border-white/10
        dark:bg-[#0F172A]
      "
    >
      {/* HEADER */}
      <div className="mb-6">
        <h2
          className="
            text-lg
            sm:text-xl
            font-semibold

            text-gray-900
            dark:text-white
          "
        >
          Riwayat Transaksi
        </h2>

        <p
          className="
            mt-1
            text-xs
            sm:text-sm

            text-gray-500
            dark:text-gray-400
          "
        >
          Riwayat transaksi berdasarkan kasir bertugas
        </p>
      </div>

      {isLoading ? (
        <div
          className="
            py-10
            text-center
            animate-pulse

            text-gray-500
          "
        >
          Memuat riwayat transaksi...
        </div>
      ) : transactions.length === 0 ? (
        <div
          className="
            py-10
            text-center

            text-gray-500
          "
        >
          Belum ada riwayat transaksi.
        </div>
      ) : (
        <>
          {/* ================= MOBILE & TABLET ================= */}
          <div className="space-y-3 lg:hidden">
            {transactions.map((item) => (
              <div
                key={item.id}
                className="
                  rounded-2xl
                  border
                  border-gray-200

                  p-4

                  dark:border-white/10
                  dark:bg-[#081028]
                "
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <h3
                      className="
                        truncate
                        font-semibold

                        text-slate-900
                        dark:text-white
                      "
                    >
                      {item.invoice_number}
                    </h3>

                    <p
                      className="
                        mt-1
                        text-sm

                        text-gray-500
                        dark:text-gray-400
                      "
                    >
                      {item.kasir_name}
                    </p>
                  </div>

                  <span
                    className={`
                      shrink-0
                      rounded-full
                      px-3
                      py-1
                      text-xs
                      font-medium

                      ${
                        item.status === "Selesai"
                          ? "bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-400"
                          : "bg-yellow-100 text-yellow-700 dark:bg-yellow-500/20 dark:text-yellow-400"
                      }
                    `}
                  >
                    {item.status}
                  </span>
                </div>

                <div className="mt-4">
                  <p
                    className="
                      text-xs
                      uppercase
                      tracking-wide

                      text-gray-500
                    "
                  >
                    Total
                  </p>

                  <p
                    className="
                      text-lg
                      font-bold

                      text-slate-900
                      dark:text-white
                    "
                  >
                    Rp {item.total.toLocaleString("id-ID")}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* ================= DESKTOP ================= */}
          <div className="hidden lg:block overflow-x-auto">
            <table className="w-full min-w-[700px]">
              <thead>
                <tr
                  className="
                    border-b
                    border-gray-200

                    dark:border-white/10
                  "
                >
                  <th className="pb-4 text-left text-sm font-medium text-gray-500">
                    Invoice
                  </th>

                  <th className="pb-4 text-left text-sm font-medium text-gray-500">
                    Kasir
                  </th>

                  <th className="pb-4 text-left text-sm font-medium text-gray-500">
                    Total
                  </th>

                  <th className="pb-4 text-left text-sm font-medium text-gray-500">
                    Status
                  </th>
                </tr>
              </thead>

              <tbody>
                {transactions.map((item) => (
                  <tr
                    key={item.id}
                    className="
                      border-b
                      border-gray-200

                      transition

                      hover:bg-gray-50

                      dark:border-white/5
                      dark:hover:bg-white/[0.02]
                    "
                  >
                    <td
                      className="
                        py-5
                        font-semibold

                        text-gray-900
                        dark:text-white
                      "
                    >
                      {item.invoice_number}
                    </td>

                    <td
                      className="
                        py-5

                        text-gray-600
                        dark:text-gray-300
                      "
                    >
                      {item.kasir_name}
                    </td>

                    <td
                      className="
                        py-5
                        font-semibold

                        text-gray-900
                        dark:text-white
                      "
                    >
                      Rp {item.total.toLocaleString("id-ID")}
                    </td>

                    <td className="py-5">
                      <span
                        className={`
                          rounded-full
                          px-3
                          py-1
                          text-xs
                          font-medium

                          ${
                            item.status === "Selesai"
                              ? "bg-green-100 text-green-600 dark:bg-green-500/20 dark:text-green-400"
                              : "bg-yellow-100 text-yellow-600 dark:bg-yellow-500/20 dark:text-yellow-400"
                          }
                        `}
                      >
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </Card>
  );
}
