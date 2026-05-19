import {
  BarChart3,
  ClipboardList,
  LayoutDashboard,
  Settings,
  ShieldCheck,
  Users,
} from "lucide-react";

export const OWNER_MENU = [
  {
    title: "Dashboard",
    url: "/dashboard-owner",
    icon: LayoutDashboard,
  },

  {
    title: "Laporan",
    url: "/laporan-owner",
    icon: BarChart3,
  },

  {
    title: "Monitoring",
    url: "/monitoring-owner",
    icon: ShieldCheck,
  },

  {
    title: "Manajemen User",
    url: "/manajemen-user-owner",
    icon: Users,
  },

  {
    title: "Riwayat Transaksi",
    url: "/riwayat-transaksi-owner",
    icon: ClipboardList,
  },

  {
    title: "Pengaturan Akun",
    url: "/pengaturan-akun-owner",
    icon: Settings,
  },
];