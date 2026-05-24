import Card from "@/components/ui/card";

const transactions = [
  {
    invoice: "INV-001",
    kasir: "Kasir A",
    total: "Rp 1.850.000",
    status: "Selesai",
  },
  {
    invoice: "INV-002",
    kasir: "Kasir B",
    total: "Rp 1.650.000",
    status: "Pending",
  },
  {
    invoice: "INV-003",
    kasir: "Kasir A",
    total: "Rp 950.000",
    status: "Selesai",
  },
];

export function RecentTransaction() {
  return (
    <Card
      className="
        border
        border-gray-200
        bg-white
        dark:border-white/10
        dark:bg-[#0F172A]
      ">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Riwayat Transaksi
          </h2>

          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Riwayat transaksi berdasarkan kasir bertugas
          </p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[600px]">
          <thead>
            <tr className="border-b border-gray-200 dark:border-white/10">
              <th className="pb-4 text-left text-sm font-medium text-gray-500">
                Invoice
              </th>

              <th className="pb-4 text-left text-sm font-medium text-gray-500">
                Kasir Bertugas
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
                key={item.invoice}
                className="
                  border-b
                  border-gray-200
                  transition
                  hover:bg-gray-50
                  dark:border-white/5
                  dark:hover:bg-white/[0.02]
                ">
                <td className="py-5 font-semibold text-gray-900 dark:text-white">
                  {item.invoice}
                </td>

                <td className="py-5 text-gray-600 dark:text-gray-300">
                  {item.kasir}
                </td>

                <td className="py-5 font-semibold text-gray-900 dark:text-white">
                  {item.total}
                </td>

                <td className="py-5">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium ${
                      item.status === "Selesai"
                        ? "bg-green-100 text-green-600 dark:bg-green-500/20 dark:text-green-400"
                        : "bg-yellow-100 text-yellow-600 dark:bg-yellow-500/20 dark:text-yellow-400"
                    }`}>
                    {item.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}