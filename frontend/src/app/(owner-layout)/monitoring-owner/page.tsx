"use client";

import { useMemo, useState, useEffect } from "react";
import Card from "@/components/ui/card";
import { formatRupiah } from "@/lib/format-rupiah";
import { 
  FileText, Search, Boxes, AlertTriangle, X 
} from "lucide-react";

// Tipe data disesuaikan dengan response API Laravel
type ProductStockType = {
  id: number;
  sku: string;
  nama: string;
  kategori: string;
  stok: number;
  harga_jual: number; 
  status: string;
};

interface DashboardSummary {
  total_nota: number;
  transaksi_selesai: number;
  transaksi_pending: number;
  transaksi_dibatalkan: number;
}

export default function MonitoringOwnerPage() {
  const [search, setSearch] = useState("");
  const [timeFilter, setTimeFilter] = useState("Semua"); // Filter waktu baru
  const [searchStock, setSearchStock] = useState("");
  const [kategoriFilter, setKategoriFilter] = useState("Semua");
  
  const [selectedTransaction, setSelectedTransaction] = useState<any | null>(null);

  const [summary, setSummary] = useState<DashboardSummary>({
    total_nota: 0,
    transaksi_selesai: 0,
    transaksi_pending: 0,
    transaksi_dibatalkan: 0,
  });

  const [transactions, setTransactions] = useState<any[]>([]);
  const [stocks, setStocks] = useState<ProductStockType[]>([]);

  /* =========================
     LOGIKA FETCH DATA
  ========================= */
  const fetchDashboardSummary = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/dashboard");
      const data = await response.json();
      setSummary({
        total_nota: data.total_nota ?? 0,
        transaksi_selesai: data.transaksi_selesai ?? 0,
        transaksi_pending: data.transaksi_pending ?? 0,
        transaksi_dibatalkan: data.transaksi_dibatalkan ?? 0,
      });
    } catch (error) { console.error("Gagal mengambil ringkasan dashboard:", error); }
  };

  const fetchTransactions = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/transactions");
      const data = await response.json();
      setTransactions(data);
    } catch (error) { console.error("Gagal mengambil transaksi:", error); }
  };

  const fetchStocks = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/products");
      const data = await response.json();
      setStocks(data);
    } catch (error) { console.error("Gagal mengambil stok:", error); }
  };

  useEffect(() => {
    fetchDashboardSummary();
    fetchTransactions();
    fetchStocks();

    const interval = setInterval(() => {
      fetchDashboardSummary();
      fetchTransactions();
      fetchStocks();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  /* =========================
     LOGIKA FILTER
  ========================= */
  const filteredTransactions = useMemo(() => {
    const now = new Date();
    return transactions.filter((item) => {
      const searchMatch = item.invoice_number?.toLowerCase().includes(search.toLowerCase()) || 
                          item.customer_name?.toLowerCase().includes(search.toLowerCase());
      
      // Logika Filter Waktu
      const itemDate = new Date(item.created_at);
      let timeMatch = true;
      
      if (timeFilter === "Harian") {
        timeMatch = itemDate.toDateString() === now.toDateString();
      } else if (timeFilter === "Mingguan") {
        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(now.getDate() - 7);
        timeMatch = itemDate >= oneWeekAgo;
      } else if (timeFilter === "Bulanan") {
        timeMatch = itemDate.getMonth() === now.getMonth() && itemDate.getFullYear() === now.getFullYear();
      }
      
      return searchMatch && timeMatch;
    });
  }, [transactions, search, timeFilter]);

  const filteredStocks = useMemo(() => {
    return stocks.filter((item) => {
      const searchMatch = item.nama.toLowerCase().includes(searchStock.toLowerCase()) || 
                          item.sku.toLowerCase().includes(searchStock.toLowerCase());
      const kategoriMatch = kategoriFilter === "Semua" || item.kategori === kategoriFilter;
      return searchMatch && kategoriMatch;
    });
  }, [stocks, searchStock, kategoriFilter]);  

  return (
    <div className="space-y-8 p-6">
      {/* SECTION 3: RINGKASAN LAPORAN PENJUALAN */}
      <div>
        <h2 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2 mb-4">
          <FileText className="h-5 w-5 text-sky-500" /> Ringkasan Laporan Penjualan
        </h2>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-4">
          <Card className="border border-gray-200 bg-white dark:border-white/10 dark:bg-[#0F172A]">
            <p className="text-sm text-gray-500 dark:text-gray-400">Total Nota Masuk</p>
            <h3 className="mt-2 text-2xl font-bold text-gray-900 dark:text-white">{summary.total_nota}</h3>
          </Card>
          <Card className="border border-gray-200 bg-white dark:border-white/10 dark:bg-[#0F172A]">
            <p className="text-sm text-gray-500 dark:text-gray-400">Transaksi Selesai</p>
            <h3 className="mt-2 text-2xl font-bold text-green-500">{summary.transaksi_selesai}</h3>
          </Card>
          <Card className="border border-gray-200 bg-white dark:border-white/10 dark:bg-[#0F172A]">
            <p className="text-sm text-gray-500 dark:text-gray-400">Transaksi Pending</p>
            <h3 className="mt-2 text-2xl font-bold text-yellow-500">{summary.transaksi_pending}</h3>
          </Card>
          <Card className="border border-gray-200 bg-white dark:border-white/10 dark:bg-[#0F172A]">
            <p className="text-sm text-gray-500 dark:text-gray-400">Transaksi Dibatalkan</p>
            <h3 className="mt-2 text-2xl font-bold text-red-500">{summary.transaksi_dibatalkan}</h3>
          </Card>
        </div>
      </div>

      {/* SECTION 4: LIVE DAFTAR STOK BARANG */}
      <div>
        <h2 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2 mb-4">
          <Boxes className="h-5 w-5 text-sky-500" /> Real-time Monitoring Stok Barang
        </h2>
        <Card className="border border-gray-200 bg-white dark:border-white/10 dark:bg-[#0F172A]">
          <div className="mb-6 flex flex-col gap-4 lg:flex-row p-4 pb-0">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-3.5 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Cari SKU atau nama produk toko..."
                value={searchStock}
                onChange={(e) => setSearchStock(e.target.value)}
                className="w-full rounded-2xl border border-gray-200 bg-gray-100 pl-11 pr-4 py-3 text-gray-900 outline-none focus:border-sky-500 dark:border-white/10 dark:bg-[#1E293B] dark:text-white"
              />
            </div>
            <select
              value={kategoriFilter}
              onChange={(e) => setKategoriFilter(e.target.value)}
              className="rounded-2xl border border-gray-200 bg-gray-100 px-4 py-3 text-gray-900 outline-none dark:border-white/10 dark:bg-[#1E293B] dark:text-white"
            >
              <option value="Semua">Semua Kategori</option>
              <option value="Sneakers">Sneakers</option>
              <option value="Aksesoris">Aksesoris</option>
              <option value="Perawatan">Perawatan</option>
            </select>
          </div>
          <div className="-mx-6 overflow-x-auto">
            <div className="min-w-[1100px] px-6">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-white/10">
                    <th className="pb-4 text-left text-sm text-gray-500 pl-4">SKU Produk</th>
                    <th className="pb-4 text-left text-sm text-gray-500">Nama Barang</th>
                    <th className="pb-4 text-left text-sm text-gray-500">Kategori</th>
                    <th className="pb-4 text-left text-sm text-gray-500">Harga Jual</th>
                    <th className="pb-4 text-left text-sm text-gray-500">Jumlah Stok</th>
                    <th className="pb-4 text-left text-sm text-gray-500">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredStocks.map((stock) => {
                    const isHabis = stock.stok <= 0;
                    const isMenipis = stock.stok > 0 && stock.stok <= 5;
                    return (
                      <tr key={stock.id} className="border-b border-gray-200 dark:border-white/5 hover:bg-gray-50/50 dark:hover:bg-white/5 transition-colors">
                        <td className="py-4 font-mono text-xs font-semibold text-gray-500 dark:text-gray-400 pl-4">{stock.sku}</td>
                        <td className="py-4 font-bold text-gray-900 dark:text-white">{stock.nama}</td>
                        <td className="py-4 text-gray-700 dark:text-gray-300">{stock.kategori}</td>
                        <td className="py-4 font-semibold text-gray-900 dark:text-white">{formatRupiah(stock.harga_jual)}</td>
                        <td className="py-4 font-extrabold text-gray-900 dark:text-white">{stock.stok} pcs</td>
                        <td className="py-4">
                          <span className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold ${!isHabis && !isMenipis ? "bg-green-100 text-green-600 dark:bg-green-500/20 dark:text-green-400" : isMenipis ? "bg-yellow-100 text-yellow-600 dark:bg-yellow-500/20 dark:text-yellow-400" : "bg-red-100 text-red-600 dark:bg-red-500/20 dark:text-red-400"}`}>
                            {isHabis && <AlertTriangle className="h-3 w-3" />}
                            {isHabis ? "Habis" : isMenipis ? "Stok Menipis" : "Tersedia"}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </Card>
      </div>

      {/* SECTION 5: LOG RIWAYAT TRANSAKSI */}
      <div>
        <h2 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2 mb-4">
          <FileText className="h-5 w-5 text-sky-500" /> Log Riwayat Transaksi
        </h2>
        <Card className="border border-gray-200 bg-white dark:border-white/10 dark:bg-[#0F172A]">
          <div className="mb-6 flex flex-col gap-4 lg:flex-row p-4 pb-0">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-3.5 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Cari invoice, customer, produk..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-2xl border border-gray-200 bg-gray-100 pl-11 pr-4 py-3 text-gray-900 outline-none focus:border-sky-500 dark:border-white/10 dark:bg-[#1E293B] dark:text-white"
              />
            </div>
            <select
              value={timeFilter}
              onChange={(e) => setTimeFilter(e.target.value)}
              className="rounded-2xl border border-gray-200 bg-gray-100 px-4 py-3 text-gray-900 outline-none dark:border-white/10 dark:bg-[#1E293B] dark:text-white"
            >
              <option value="Semua">Semua Riwayat</option>
              <option value="Harian">Harian</option>
              <option value="Mingguan">Mingguan</option>
              <option value="Bulanan">Bulanan</option>
            </select>
          </div>
          <div className="-mx-6 overflow-x-auto">
            <div className="min-w-[1100px] px-6">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-white/10">
                    <th className="pb-4 text-left text-sm text-gray-500 pl-4">Invoice</th>
                    <th className="pb-4 text-left text-sm text-gray-500">Customer</th>
                    <th className="pb-4 text-left text-sm text-gray-500">Status</th>
                    <th className="pb-4 text-left text-sm text-gray-500">Tanggal</th>
                    <th className="pb-4 text-center text-sm text-gray-500">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTransactions.map((item) => (
                    <tr key={item.id} className="border-b border-gray-200 transition-colors hover:bg-gray-50/50 dark:border-white/5 dark:hover:bg-white/5">
                      <td className="py-5 pl-4 font-semibold text-gray-900 dark:text-white">{item.invoice_number}</td>
                      <td className="py-5 text-gray-700 dark:text-gray-300">{item.customer_name}</td>
                      <td className="py-5">
                        <span className={`rounded-full px-3 py-1 text-xs font-semibold ${item.status === "Selesai" ? "bg-green-100 text-green-600 dark:bg-green-500/20 dark:text-green-400" : item.status === "Pending" ? "bg-yellow-100 text-yellow-600 dark:bg-yellow-500/20 dark:text-yellow-400" : "bg-red-100 text-red-600 dark:bg-red-500/20 dark:text-red-400"}`}>
                          {item.status}
                        </span>
                      </td>
                      <td className="py-5 text-gray-700 dark:text-gray-300">{new Date(item.created_at).toLocaleString("id-ID")}</td>
                      <td className="py-5 text-center">
                        <button 
                          onClick={() => setSelectedTransaction(item)}
                          className="rounded-xl bg-sky-100 px-6 py-2 text-sm font-medium text-sky-600 transition-all hover:bg-sky-200 dark:bg-sky-500/20 dark:text-sky-400"
                        >
                          Detail
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </Card>
      </div>

      {/* MODAL DETAIL TRANSAKSI */}
      {selectedTransaction && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <Card className="w-full max-w-2xl bg-white p-6 shadow-2xl dark:bg-[#0F172A] border border-white/10 max-h-[80vh] overflow-y-auto">
            <div className="mb-6 flex items-center justify-between border-b pb-4 dark:border-white/10">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">Detail Transaksi</h3>
              <button onClick={() => setSelectedTransaction(null)} className="text-gray-500 hover:text-gray-800 dark:hover:text-white">
                <X className="h-6 w-6" />
              </button>
            </div>
            
            <div className="grid grid-cols-2 gap-4 text-sm mb-6 text-gray-700 dark:text-gray-300">
              <div><p className="text-gray-500">Invoice</p><p className="font-bold text-gray-900 dark:text-white">{selectedTransaction.invoice_number}</p></div>
              <div><p className="text-gray-500">Metode Pembayaran</p><p className="font-semibold">{selectedTransaction.payment_method || "-"}</p></div>
              <div><p className="text-gray-500">Customer</p><p className="font-semibold">{selectedTransaction.customer_name}</p></div>
              <div><p className="text-gray-500">Tanggal & Waktu</p><p className="font-semibold">{new Date(selectedTransaction.created_at).toLocaleString("id-ID")}</p></div>
            </div>

            <div className="border-t pt-4 dark:border-white/10">
              <p className="font-bold text-gray-900 dark:text-white mb-3">Daftar Produk:</p>
              <table className="w-full text-sm text-left">
                <thead className="text-gray-500">
                  <tr>
                    <th className="pb-2">SKU</th>
                    <th className="pb-2">Produk</th>
                    <th className="pb-2 text-center">Qty</th>
                    <th className="pb-2 text-right">Harga</th>
                  </tr>
                </thead>
                <tbody className="text-gray-700 dark:text-gray-300">
                  {selectedTransaction.items?.map((item: any, index: number) => (
                    <tr key={index} className="border-t border-gray-100 dark:border-white/10">
                      <td className="py-2 font-mono text-xs">{item.sku}</td>
                      <td className="py-2">{item.nama}</td>
                      <td className="py-2 text-center">{item.qty}</td>
                      <td className="py-2 text-right">{formatRupiah(item.harga)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-6 border-t pt-4 text-right border-gray-100 dark:border-white/10">
              <p className="text-sm text-gray-500">Total Keseluruhan</p>
              <p className="text-2xl font-bold text-sky-600 dark:text-sky-400">{formatRupiah(selectedTransaction.total)}</p>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}