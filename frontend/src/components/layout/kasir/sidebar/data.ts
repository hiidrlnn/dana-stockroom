import {
  Briefcase,
  History,
  LayoutDashboard,
  Receipt,
  Settings,
  ShoppingCart,
} from "lucide-react";
import { FourCircle } from "../../sidebar/icons";

export const KASIR_MENU = [
  {
    title: "Dashboard",
    url: "/dashboard-kasir",
    icon: LayoutDashboard,
  },

  {
    title: "Transaksi Penjualan",
    url: "/transaksi-penjualan-kasir",
    icon: ShoppingCart,
  },

    {
    title: "Daftar Stock Produk",
    url: "/daftar-stock-produk-kasir",
    icon: FourCircle,
  },

  {
    title: "Input Jasa",
    url: "/input-jasa-kasir",
    icon: Briefcase,
  },

  {
    title: "Riwayat Transaksi",
    url: "/riwayat-transaksi-kasir",
    icon: History,
  },

  {
    title: "Cetak Struk",
    url: "/cetak-struk-kasir",
    icon: Receipt,
  },

  {
    title: "Pengaturan Akun",
    url: "/pengaturan-akun-kasir",
    icon: Settings,
  },
];