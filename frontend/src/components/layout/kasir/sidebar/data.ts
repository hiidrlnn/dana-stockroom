import {
  ClipboardList,
  LayoutDashboard,
  Receipt,
  Settings,
  ShoppingCart,
} from "lucide-react";

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
    title: "Riwayat Transaksi",
    url: "/riwayat-transaksi-kasir",
    icon: ClipboardList,
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