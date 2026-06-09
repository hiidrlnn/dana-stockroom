"use client";

import { useMemo, useState, useEffect } from "react";
import Card from "@/components/ui/card";
import { formatRupiah } from "@/lib/format-rupiah";
import { 
  ShieldCheck, RefreshCw, Cpu, HardDrive, Database, 
  Clock, Activity, FileText, Printer, Search, Boxes, AlertTriangle
} from "lucide-react";

type TransactionType = {
  id: number;
  invoice: string;
  customer: string;
  produk: string;
  metode: string;
  total: number;
  status: string;
  tanggal: string;
};

type ProductStockType = {
  id: number;
  sku: string;
  nama: string;
  kategori: string;
  stok: number;
  hargaJual: number;
  statusStok: "Aman" | "Menipis" | "Habis";
};

interface DashboardSummary {
  total_nota: number;
  transaksi_selesai: number;
  transaksi_pending: number;
  transaksi_dibatalkan: number;
}
export default function MonitoringOwnerPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("Semua");
  
  // State baru untuk pencarian & filter stok barang
  const [searchStock, setSearchStock] = useState("");
  const [kategoriFilter, setKategoriFilter] = useState("Semua");
  const [summary, setSummary] = useState<DashboardSummary>({
  total_nota: 0,
  transaksi_selesai: 0,
  transaksi_pending: 0,
  transaksi_dibatalkan: 0,
});

  // 1. Data Transaksi Berdasarkan Riwayat Kasir
  const [transactions, setTransactions] = useState<any[]>([]);

  // 2. Data Master Stok Barang / Produk Toko Dana Stockroom
  const [stocks] = useState<ProductStockType[]>([
    { id: 1, sku: "DS-NK-AF1-01", nama: "Nike Air Force 1 Triple White", kategori: "Sneakers", stok: 24, hargaJual: 1750000, statusStok: "Aman" },
    { id: 2, sku: "DS-AD-SB-02", nama: "Adidas Samba OG Black White", kategori: "Sneakers", stok: 4, hargaJual: 1650000, statusStok: "Menipis" },
    { id: 3, sku: "DS-NB-530-03", nama: "New Balance 530 Silver Metallic", kategori: "Sneakers", stok: 12, hargaJual: 1900000, statusStok: "Aman" },
    { id: 4, sku: "DS-CV-HI-04", nama: "Converse Chuck Taylor All Star High", kategori: "Sneakers", stok: 0, hargaJual: 950000, statusStok: "Habis" },
    { id: 5, sku: "DS-ACC-KK-05", nama: "Kaos Kaki Adidas Cushioned (3-Pack)", kategori: "Aksesoris", stok: 45, hargaJual: 150000, statusStok: "Aman" },
    { id: 6, sku: "DS-CL-SP-06", nama: "Premium Shoe Cleaner Premium 250ml", kategori: "Perawatan", stok: 3, hargaJual: 850000, statusStok: "Menipis" },
  ]);

  /* =========================
      LOGIKA FILTER TRANSAKSI
  ========================= */
  const fetchDashboardSummary = async () => {
  try {
    const response = await fetch(
      "http://127.0.0.1:8000/api/dashboard"
    );

    const data = await response.json();

    setSummary({
      total_nota: data.total_nota ?? 0,
      transaksi_selesai: data.transaksi_selesai ?? 0,
      transaksi_pending: data.transaksi_pending ?? 0,
      transaksi_dibatalkan: data.transaksi_dibatalkan ?? 0,
    });
  } catch (error) {
    console.error(
      "Gagal mengambil ringkasan dashboard:",
      error
    );
  }
};
const fetchTransactions = async () => {
  try {
    const response = await fetch(
      "http://127.0.0.1:8000/api/transactions"
    );

    const data = await response.json();

    setTransactions(data);
  } catch (error) {
    console.error(
      "Gagal mengambil transaksi:",
      error
    );
  }
};

useEffect(() => {
  fetchDashboardSummary();
  fetchTransactions();

  const interval = setInterval(() => {
    fetchDashboardSummary();
    fetchTransactions();
  }, 5000);

  return () => clearInterval(interval);
}, []);

const filteredTransactions = useMemo(() => {
  return transactions.filter((item) => {
    const searchMatch =
      item.invoice_number
        ?.toLowerCase()
        .includes(search.toLowerCase()) ||

      item.customer_name
        ?.toLowerCase()
        .includes(search.toLowerCase());

    const statusMatch =
      statusFilter === "Semua" ||
      item.status === statusFilter;

    return searchMatch && statusMatch;
  });
}, [transactions, search, statusFilter]);

  /* =========================
      LOGIKA FILTER STOK BARANG
  ========================= */
  const filteredStocks = useMemo(() => {
    return stocks.filter((item) => {
      const searchMatch =
        item.nama.toLowerCase().includes(searchStock.toLowerCase()) ||
        item.sku.toLowerCase().includes(searchStock.toLowerCase());
      const kategoriMatch = kategoriFilter === "Semua" || item.kategori === kategoriFilter;
      return searchMatch && kategoriMatch;
    });
  }, [stocks, searchStock, kategoriFilter]);  
  return (
    <div className="space-y-8 p-6">
      
      {/* ========================================================================= */}
      {/* SECTION 1: HEADER UTAMA                                                   */}
      {/* ========================================================================= */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
            <ShieldCheck className="h-8 w-8 text-sky-500" /> System Monitoring & Control
          </h1>
          <p className="mt-2 text-gray-500 dark:text-gray-400">
            Pusat pantauan performa server, log keamanan, laporan penjualan, sisa stok barang, dan aksi cetak struk.
          </p>
        </div>
        <button className="flex items-center gap-2 rounded-xl bg-gray-100 px-4 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-200 dark:bg-white/5 dark:text-gray-300 dark:hover:bg-white/10 transition-colors">
          <RefreshCw className="h-4 w-4" /> Refresh Status
        </button>
      </div>

      {/* ========================================================================= */}
      {/* SECTION 2: LIVE SERVER MONITORING                                        */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        <Card className="border border-gray-200 bg-white p-5 dark:border-white/10 dark:bg-[#0F172A] flex items-center gap-4">
          <div className="rounded-xl bg-green-50 p-3 dark:bg-green-500/10">
            <Database className="h-6 w-6 text-green-500" />
          </div>
          <div>
            <p className="text-xs text-gray-400 uppercase tracking-wider font-bold">Main Server & DB</p>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mt-0.5">Online / Active</h3>
            <p className="text-xs text-green-500 mt-0.5">● Uptime: 14d 6h 32m</p>
          </div>
        </Card>

        <Card className="border border-gray-200 bg-white p-5 dark:border-white/10 dark:bg-[#0F172A] flex items-center gap-4">
          <div className="rounded-xl bg-sky-50 p-3 dark:bg-sky-500/10">
            <ShieldCheck className="h-6 w-6 text-sky-500" />
          </div>
          <div>
            <p className="text-xs text-gray-400 uppercase tracking-wider font-bold">Database Security</p>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mt-0.5">Secured & Encrypted</h3>
            <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">SSL Status: Valid (256-bit)</p>
          </div>
        </Card>

        <Card className="border border-gray-200 bg-white p-5 dark:border-white/10 dark:bg-[#0F172A] flex items-center gap-4">
          <div className="rounded-xl bg-purple-50 p-3 dark:bg-purple-500/10">
            <Activity className="h-6 w-6 text-purple-500" />
          </div>
          <div>
            <p className="text-xs text-gray-400 uppercase tracking-wider font-bold">API Response Time</p>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mt-0.5">24 ms</h3>
            <p className="text-xs text-purple-500 mt-0.5">Status: Sangat Cepat (Optimal)</p>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Resource Usage */}
        <Card className="border border-gray-200 bg-white p-5 dark:border-white/10 dark:bg-[#0F172A] lg:col-span-1 space-y-4">
          <h4 className="text-sm font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <Cpu className="h-4 w-4 text-gray-400" /> Resource Usage
          </h4>
          <div className="space-y-3 pt-2">
            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span className="text-gray-500">CPU Usage</span>
                <span className="text-gray-900 dark:text-white">34%</span>
              </div>
              <div className="w-full bg-gray-100 dark:bg-white/5 h-2 rounded-full overflow-hidden">
                <div className="bg-sky-500 h-full rounded-full" style={{ width: "34%" }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span className="text-gray-500">RAM Usage</span>
                <span className="text-gray-900 dark:text-white">58%</span>
              </div>
              <div className="w-full bg-gray-100 dark:bg-white/5 h-2 rounded-full overflow-hidden">
                <div className="bg-purple-500 h-full rounded-full" style={{ width: "58%" }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span className="text-gray-500">Storage Capacity</span>
                <span className="text-gray-900 dark:text-white">42%</span>
              </div>
              <div className="w-full bg-gray-100 dark:bg-white/5 h-2 rounded-full overflow-hidden">
                <div className="bg-amber-500 h-full rounded-full" style={{ width: "42%" }}></div>
              </div>
              <p className="text-[11px] text-gray-400 mt-1">Tersisa 275.5 GB dari 475 GB</p>
            </div>
          </div>
        </Card>

        {/* System Live Logs */}
        <Card className="border border-gray-200 bg-white p-5 dark:border-white/10 dark:bg-[#0F172A] lg:col-span-2 space-y-3">
          <h4 className="text-sm font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <Clock className="h-4 w-4 text-gray-400" /> System Live Logs
          </h4>
          <div className="space-y-2 max-h-[145px] overflow-y-auto pt-1 text-xs font-medium">
            <div className="flex justify-between items-center p-2 rounded-lg bg-gray-50 dark:bg-white/5">
              <span className="text-sky-600 dark:text-sky-400 bg-sky-50 dark:bg-sky-500/10 px-1.5 py-0.5 rounded font-bold uppercase text-[10px]">INFO</span>
              <span className="text-gray-700 dark:text-gray-300 flex-1 ml-3">Owner berhasil memperbarui pengaturan akun</span>
              <span className="text-gray-400">02:14:05</span>
            </div>
            <div className="flex justify-between items-center p-2 rounded-lg bg-gray-50 dark:bg-white/5">
              <span className="text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-500/10 px-1.5 py-0.5 rounded font-bold uppercase text-[10px]">SUCCESS</span>
              <span className="text-gray-700 dark:text-gray-300 flex-1 ml-3">Backup database harian berhasil disimpan ke cloud storage</span>
              <span className="text-gray-400">02:00:00</span>
            </div>
            <div className="flex justify-between items-center p-2 rounded-lg bg-gray-50 dark:bg-white/5">
              <span className="text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-500/10 px-1.5 py-0.5 rounded font-bold uppercase text-[10px]">WARNING</span>
              <span className="text-gray-700 dark:text-gray-300 flex-1 ml-3">Percobaan login gagal terdeteksi dari IP 192.168.1.105</span>
              <span className="text-gray-400">01:45:22</span>
            </div>
          </div>
        </Card>
      </div>

      {/* ========================================================================= */}
      {/* SECTION 3: RINGKASAN LAPORAN PENJUALAN                                    */}
      {/* ========================================================================= */}
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

      {/* ========================================================================= */}
      {/* SECTION 4: LIVE DAFTAR STOK BARANG (FITUR BARU)                           */}
      {/* ========================================================================= */}
      <div>
        <h2 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2 mb-4">
          <Boxes className="h-5 w-5 text-sky-500" /> Real-time Monitoring Stok Barang
        </h2>

        <Card className="border border-gray-200 bg-white dark:border-white/10 dark:bg-[#0F172A]">
          {/* SEARCH STOCK + FILTER KATEGORI */}
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

          {/* TABLE DATA STOK BARANG */}
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
                    <th className="pb-4 text-left text-sm text-gray-500">Status Status</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredStocks.map((stock) => (
                    <tr key={stock.id} className="border-b border-gray-200 dark:border-white/5 hover:bg-gray-50/50 dark:hover:bg-white/5 transition-colors">
                      <td className="py-4 font-mono text-xs font-semibold text-gray-500 dark:text-gray-400 pl-4">{stock.sku}</td>
                      <td className="py-4 font-bold text-gray-900 dark:text-white">{stock.nama}</td>
                      <td className="py-4 text-gray-700 dark:text-gray-300">{stock.kategori}</td>
                      <td className="py-4 font-semibold text-gray-900 dark:text-white">{formatRupiah(stock.hargaJual)}</td>
                      <td className="py-4 font-extrabold text-gray-900 dark:text-white">{stock.stok} pcs</td>
                      <td className="py-4">
                        <span className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold ${
                          stock.statusStok === "Aman"
                            ? "bg-green-100 text-green-600 dark:bg-green-500/20 dark:text-green-400"
                            : stock.statusStok === "Menipis"
                              ? "bg-yellow-100 text-yellow-600 dark:bg-yellow-500/20 dark:text-yellow-400"
                              : "bg-red-100 text-red-600 dark:bg-red-500/20 dark:text-red-400"
                        }`}>
                          {stock.statusStok === "Habis" && <AlertTriangle className="h-3 w-3" />}
                          {stock.statusStok}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </Card>
      </div>

      {/* ========================================================================= */}
      {/* SECTION 5: LOG RIWAYAT TRANSAKSI & CETAK STRUK                             */}
      {/* ========================================================================= */}
      <div>
        <h2 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2 mb-4">
          <Printer className="h-5 w-5 text-sky-500" /> Log Riwayat Transaksi & Cetak Struk
        </h2>
        
        <Card className="border border-gray-200 bg-white dark:border-white/10 dark:bg-[#0F172A]">
          {/* SEARCH + FILTER */}
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
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="rounded-2xl border border-gray-200 bg-gray-100 px-4 py-3 text-gray-900 outline-none dark:border-white/10 dark:bg-[#1E293B] dark:text-white"
            >
              <option>Semua</option>
              <option>Selesai</option>
              <option>Pending</option>
              <option>Dibatalkan</option>
            </select>
          </div>

          {/* TABLE DATA */}
          <div className="-mx-6 overflow-x-auto">
            <div className="min-w-[1100px] px-6">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-white/10">
                    <th className="pb-4 text-left text-sm text-gray-500 pl-4">Invoice</th>
                    <th className="pb-4 text-left text-sm text-gray-500">Customer</th>
                    <th className="pb-4 text-left text-sm text-gray-500">Produk</th>
                    <th className="pb-4 text-left text-sm text-gray-500">Metode</th>
                    <th className="pb-4 text-left text-sm text-gray-500">Total</th>
                    <th className="pb-4 text-left text-sm text-gray-500">Status</th>
                    <th className="pb-4 text-left text-sm text-gray-500">Tanggal</th>
                    <th className="pb-4 text-center text-sm text-gray-500">Action (Struk)</th>
                  </tr>
                </thead>

                <tbody>
  {filteredTransactions.map((item) => (
    <tr
      key={item.id}
      className="border-b border-gray-200 transition-colors hover:bg-gray-50/50 dark:border-white/5 dark:hover:bg-white/5"
    >
      <td className="py-5 pl-4 font-semibold text-gray-900 dark:text-white">
        {item.invoice_number}
      </td>

      <td className="py-5 text-gray-700 dark:text-gray-300">
        {item.customer_name}
      </td>

      <td className="py-5 text-gray-700 dark:text-gray-300">
        {item.type ?? "-"}
      </td>

      <td className="py-5 text-gray-700 dark:text-gray-300">
        -
      </td>

      <td className="py-5 font-semibold text-gray-900 dark:text-white">
        {formatRupiah(item.total)}
      </td>

      <td className="py-5">
        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${
            item.status === "Selesai"
              ? "bg-green-100 text-green-600 dark:bg-green-500/20 dark:text-green-400"
              : item.status === "Pending"
              ? "bg-yellow-100 text-yellow-600 dark:bg-yellow-500/20 dark:text-yellow-400"
              : "bg-red-100 text-red-600 dark:bg-red-500/20 dark:text-red-400"
          }`}
        >
          {item.status}
        </span>
      </td>

      <td className="py-5 text-gray-700 dark:text-gray-300">
        {new Date(item.created_at).toLocaleString("id-ID")}
      </td>

      <td className="py-5 text-center">
        <div className="flex items-center justify-center gap-3">
          <button className="rounded-xl bg-sky-100 px-4 py-2 text-sm font-medium text-sky-600 transition-all hover:bg-sky-200 dark:bg-sky-500/20 dark:text-sky-400">
            Detail
          </button>

          <button className="rounded-xl bg-green-100 px-4 py-2 text-sm font-medium text-green-600 transition-all hover:bg-green-200 dark:bg-green-500/20 dark:text-green-400">
            Cetak Ulang
          </button>
        </div>
      </td>
    </tr>
  ))}
                </tbody>
              </table>
            </div>
          </div>
        </Card>
      </div>

    </div>
  );
}