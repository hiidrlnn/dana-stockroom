"use client";

import { useMemo, useState } from "react";

import Card from "@/components/ui/card";
import { formatRupiah } from "@/lib/format-rupiah";

type TransactionType = {
  invoice: string;
  customer: string;
  kasir: string;
  produk: string;
  qty: number;
  metode: string;
  total: number;
  status: string;
  tanggal: string;
};

export default function CetakStrukKasirPage() {
  const [search, setSearch] = useState("");

  const transactions: TransactionType[] = [
    {
      invoice: "INV-001",
      customer: "Dirlan",
      kasir: "Kasir 1",
      produk: "Nike Air Force 1",
      qty: 1,
      metode: "QRIS",
      total: 3700000,
      status: "Selesai",
      tanggal: "20 Mei 2026",
    },

    {
      invoice: "INV-002",
      customer: "Andi",
      kasir: "Kasir 1",
      produk: "Adidas Samba",
      qty: 1,
      metode: "Cash",
      total: 1650000,
      status: "Pending",
      tanggal: "20 Mei 2026",
    },

    {
      invoice: "INV-003",
      customer: "Budi",
      kasir: "Kasir 2",
      produk: "New Balance 530",
      qty: 1,
      metode: "Transfer",
      total: 2100000,
      status: "Selesai",
      tanggal: "19 Mei 2026",
    },
  ];

  const filteredTransactions = useMemo(() => {
    return transactions.filter((item) =>
      item.invoice.toLowerCase().includes(search.toLowerCase()),
    );
  }, [search]);

  const [selectedInvoice, setSelectedInvoice] = useState(
    transactions[0].invoice,
  );

  const selectedTransaction = transactions.find(
    (item) => item.invoice === selectedInvoice,
  );

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Cetak Struk
        </h1>

        <p className="mt-2 text-gray-500 dark:text-gray-400">
          Cetak dan lihat preview struk transaksi
        </p>
      </div>

      {/* SEARCH + SELECT */}
      <Card className="border border-gray-200 bg-white dark:border-white/10 dark:bg-[#0F172A]">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          {/* SEARCH */}
          <input
            type="text"
            placeholder="Cari invoice..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="
              rounded-2xl
              border
              border-gray-200
              bg-gray-100
              px-4
              py-3
              outline-none
              focus:border-sky-500

              dark:border-white/10
              dark:bg-[#1E293B]
              dark:text-white
            "
          />

          {/* SELECT */}
          <select
            value={selectedInvoice}
            onChange={(e) =>
              setSelectedInvoice(e.target.value)
            }
            className="
              rounded-2xl
              border
              border-gray-200
              bg-gray-100
              px-4
              py-3
              outline-none

              dark:border-white/10
              dark:bg-[#1E293B]
              dark:text-white
            ">
            {filteredTransactions.map((item) => (
              <option
                key={item.invoice}
                value={item.invoice}>
                {item.invoice}
              </option>
            ))}
          </select>
        </div>
      </Card>

      {/* STRUK */}
      <div className="flex justify-center">
        <Card
          className="
            w-full
            max-w-[420px]
            border
            border-dashed
            border-gray-300
            bg-white
            p-8
            font-mono

            dark:border-white/10
            dark:bg-[#0F172A]
          ">
          {selectedTransaction && (
            <>
              <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  DANA STOCKROOM
                </h2>

                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  Premium Sneakers Store
                </p>
              </div>

              <div className="my-6 border-t border-dashed border-gray-300 dark:border-white/10" />

              <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                <div className="flex justify-between">
                  <span>Invoice</span>
                  <span>{selectedTransaction.invoice}</span>
                </div>

                <div className="flex justify-between">
                  <span>Customer</span>
                  <span>{selectedTransaction.customer}</span>
                </div>

                <div className="flex justify-between">
                  <span>Kasir</span>
                  <span>{selectedTransaction.kasir}</span>
                </div>

                <div className="flex justify-between">
                  <span>Tanggal</span>
                  <span>{selectedTransaction.tanggal}</span>
                </div>
              </div>

              <div className="my-6 border-t border-dashed border-gray-300 dark:border-white/10" />

              {/* ITEM */}
              <div className="space-y-3">
                <div className="text-sm font-semibold text-gray-900 dark:text-white">
                  Produk
                </div>

                <div className="flex justify-between text-sm text-gray-700 dark:text-gray-300">
                  <div>
                    <p>{selectedTransaction.produk}</p>

                    <span className="text-xs text-gray-500">
                      x{selectedTransaction.qty}
                    </span>
                  </div>

                  <span>
                    {formatRupiah(
                      selectedTransaction.total,
                    )}
                  </span>
                </div>
              </div>

              <div className="my-6 border-t border-dashed border-gray-300 dark:border-white/10" />

              {/* TOTAL */}
              <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                <div className="flex justify-between">
                  <span>Subtotal</span>

                  <span>
                    {formatRupiah(
                      selectedTransaction.total,
                    )}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span>Metode</span>
                  <span>
                    {selectedTransaction.metode}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span>Status</span>
                  <span>
                    {selectedTransaction.status}
                  </span>
                </div>
              </div>

              <div className="my-6 border-t border-dashed border-gray-300 dark:border-white/10" />

              <p className="text-center text-sm text-gray-500 dark:text-gray-400">
                Terima kasih telah berbelanja 🙏
              </p>
            </>
          )}
        </Card>
      </div>

      {/* ACTION */}
      <div className="flex flex-col justify-center gap-4 sm:flex-row">
        <button
          onClick={handlePrint}
          className="
            rounded-2xl
            bg-sky-500
            px-6
            py-3
            font-semibold
            text-white
            transition
            hover:bg-sky-600
          ">
          Print Struk
        </button>

        <button
          className="
            rounded-2xl
            bg-green-500
            px-6
            py-3
            font-semibold
            text-white
            transition
            hover:bg-green-600
          ">
          Download PDF
        </button>
      </div>
    </div>
  );
}