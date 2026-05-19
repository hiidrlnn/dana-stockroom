import Card from "@/components/ui/card";

const transactions = [
  {
    invoice: "INV-001",
    customer: "Dirlan",
    total: "Rp 1.850.000",
    status: "Selesai",
  },
  {
    invoice: "INV-002",
    customer: "Andi",
    total: "Rp 1.650.000",
    status: "Pending",
  },
  {
    invoice: "INV-003",
    customer: "Budi",
    total: "Rp 950.000",
    status: "Selesai",
  },
];

export function RecentTransaction() {
  return (
    <Card className="border border-gray-200 bg-white dark:border-white/10 dark:bg-[#0F172A]">
      <h2 className="mb-6 text-xl font-semibold text-gray-900 dark:text-white">
        Transaksi Hari Ini
      </h2>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[600px]">
          <thead>
            <tr className="border-b border-gray-200 dark:border-white/10">
              <th className="pb-4 text-left text-sm text-gray-500">
                Invoice
              </th>

              <th className="pb-4 text-left text-sm text-gray-500">
                Customer
              </th>

              <th className="pb-4 text-left text-sm text-gray-500">
                Total
              </th>

              <th className="pb-4 text-left text-sm text-gray-500">
                Status
              </th>
            </tr>
          </thead>

          <tbody>
            {transactions.map((item) => (
              <tr
                key={item.invoice}
                className="border-b border-gray-200 dark:border-white/5"
              >
                <td className="py-5 font-medium text-gray-900 dark:text-white">
                  {item.invoice}
                </td>

                <td className="py-5 text-gray-600 dark:text-gray-300">
                  {item.customer}
                </td>

                <td className="py-5 font-semibold text-gray-900 dark:text-white">
                  {item.total}
                </td>

                <td className="py-5">
                  <span className="rounded-full bg-green-500/20 px-3 py-1 text-xs text-green-500">
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