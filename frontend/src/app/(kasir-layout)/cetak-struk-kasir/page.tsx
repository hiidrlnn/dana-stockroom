"use client";

import { useEffect, useMemo, useState } from "react";
import jsPDF from "jspdf";


import Card from "@/components/ui/card";
import { formatRupiah } from "@/lib/format-rupiah";

const API_URL =
  "http://127.0.0.1:8000/api/transactions";

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

const [transactions, setTransactions] = useState<any[]>([]);
const [loading, setLoading] = useState(true);

 const filteredTransactions = useMemo(() => {
  return transactions.filter((item: any) =>
    item.invoice_number
      ?.toLowerCase()
      .includes(search.toLowerCase()),
  );
}, [transactions, search]);

  const [selectedInvoice, setSelectedInvoice] =
  useState("");

  useEffect(() => {
  fetchTransactions();
}, []);

useEffect(() => {
  if (
    transactions.length > 0 &&
    !selectedInvoice
  ) {
    setSelectedInvoice(
      transactions[0].invoice_number,
    );
  }
}, [
  transactions,
  selectedInvoice,
]);

const fetchTransactions =
  async () => {
    try {
      setLoading(true);

      const response =
        await fetch(API_URL, {
          cache: "no-store",
        });

      const data =
        await response.json();

      setTransactions(data);
    } catch (error) {
      console.error(
        "Gagal mengambil transaksi",
        error,
      );
    } finally {
      setLoading(false);
    }
  };

  const selectedTransaction =
  transactions.find(
    (item: any) =>
      item.invoice_number ===
      selectedInvoice,
  );

  const handlePrint = () => {
    window.print();
  };

const downloadPDF = () => {
  if (!selectedTransaction) return;

  const doc = new jsPDF();

  let y = 20;

  doc.setFontSize(20);
  doc.setFont("helvetica", "bold");
  doc.text(
    "DANA STOCKROOM",
    105,
    y,
    { align: "center" },
  );

  y += 8;

  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");

  doc.text(
    "Premium Sneakers & Care",
    105,
    y,
    { align: "center" },
  );

  y += 5;

  doc.text(
    "Bandung, Indonesia",
    105,
    y,
    { align: "center" },
  );

  y += 10;

  doc.line(20, y, 190, y);

  y += 10;

  doc.text(
    `Invoice : ${selectedTransaction.invoice_number}`,
    20,
    y,
  );

  y += 8;

  doc.text(
    `Customer : ${selectedTransaction.customer_name}`,
    20,
    y,
  );

  y += 8;

  doc.text(
    `Status : ${selectedTransaction.status}`,
    20,
    y,
  );

  y += 8;

  doc.text(
    `Jenis : ${selectedTransaction.type}`,
    20,
    y,
  );

  y += 8;

  doc.text(
    `Tanggal : ${new Date(
      selectedTransaction.created_at,
    ).toLocaleString("id-ID")}`,
    20,
    y,
  );

  y += 12;

  doc.line(20, y, 190, y);

  y += 10;

  doc.setFont(
    "helvetica",
    "bold",
  );

  doc.text(
    "DETAIL ITEM",
    20,
    y,
  );

  doc.setFont(
    "helvetica",
    "normal",
  );

(selectedTransaction.details || []).forEach(
  (detail: any) => {
      y += 10;

      const nama =
        detail.product?.nama ||
        detail.jasa_name;

      const harga =
        Number(detail.price);

      const subtotal =
        harga *
        detail.quantity;

      doc.text(
        nama,
        20,
        y,
      );

      y += 6;

      doc.text(
        `Qty : ${detail.quantity}`,
        25,
        y,
      );

      y += 6;

      doc.text(
        `Harga : Rp ${harga.toLocaleString(
          "id-ID",
        )}`,
        25,
        y,
      );

      y += 6;

      doc.text(
        `Subtotal : Rp ${subtotal.toLocaleString(
          "id-ID",
        )}`,
        25,
        y,
      );
    },
  );

  y += 10;

  doc.line(20, y, 190, y);

  y += 10;

  doc.setFont(
    "helvetica",
    "bold",
  );

  doc.text(
    `TOTAL : Rp ${Number(
      selectedTransaction.total,
    ).toLocaleString("id-ID")}`,
    20,
    y,
  );

  y += 15;

  doc.setFont(
    "helvetica",
    "normal",
  );

  doc.text(
    "Terima Kasih Telah Berbelanja",
    105,
    y,
    { align: "center" },
  );

  y += 6;

  doc.text(
    "Barang yang sudah dibeli tidak dapat ditukar atau dikembalikan",
    105,
    y,
    { align: "center" },
  );

  doc.save(
    `${selectedTransaction.invoice_number}.pdf`,
  );
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
              key={item.id}
              value={
                item.invoice_number
              }>
              {item.invoice_number}
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
                  <span>{selectedTransaction.invoice_number}</span>
                </div>

                <div className="flex justify-between">
                  <span>Customer</span>
                  <span>{selectedTransaction.customer_name}</span>
                </div>

                <div className="flex justify-between">
                  <span>Kasir</span>
                  <span>Kasir Utama</span>
                </div>

                <div className="flex justify-between">
                  <span>Tanggal</span>
                  <span>{new Date(
                    selectedTransaction.created_at,
                  ).toLocaleString("id-ID")}</span>
                </div>
              </div>

              <div className="my-6 border-t border-dashed border-gray-300 dark:border-white/10" />

              {/* ITEM */}
              <div className="space-y-3">
                <div className="text-sm font-semibold text-gray-900 dark:text-white">
                  Detail Item
                </div>

                {(selectedTransaction.details || []).map(
  (detail: any, index: number) => (
                    <div
                      key={index}
                      className="flex justify-between text-sm text-gray-700 dark:text-gray-300">
                      <div>
                        <p>
                          {detail.product?.nama ||
                            detail.jasa_name}
                        </p>

                        <span className="text-xs text-gray-500">
                          x{detail.quantity}
                        </span>
                      </div>
                    </div>
                  ),
                )}
              </div>

              {/* TOTAL */}
              <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                <div className="flex justify-between">
                  <span>Subtotal</span>

                  <span>
                  {formatRupiah(
                    Number(
                      selectedTransaction.total,
                    ),
                  )}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span>Metode</span>
                  <span>
                    <span>Cash</span>
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
        onClick={downloadPDF}
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