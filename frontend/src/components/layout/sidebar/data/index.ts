import {
  HomeIcon,
  Calendar,
  User,
  FourCircle,
  PieChart,
  Authentication,
} from "../icons";

export const NAV_DATA = [
  {
    label: "UTAMA",

    items: [
      {
        title: "Dashboard",
        url: "/dashboard-admin",
        icon: HomeIcon,
        items: [],
      },
    ],
  },

  {
    label: "MASTER DATA",

    items: [
      {
        title: "Produk",
        icon: FourCircle,

        items: [
          {
            title: "Daftar Produk",
            url: "/produk",
          },
        ],
      },
    ],
  },

  {
    label: "TRANSAKSI",

    items: [
      {
        title: "Transaksi Penjualan",
        url: "/transaksi",
        icon: Calendar,
        items: [],
      },
    ],
  },

  {
    label: "MANAJEMEN USER",

    items: [
      {
        title: "Manajemen User",
        icon: Authentication,

        items: [
          {
            title: "Semua User",
            url: "/manajemen-user",
          },

          {
            title: "Tambah User",
            url: "/manajemen-user/tambah-user",
          },
        ],
      },
    ],
  },

  {
    label: "LAPORAN",

    items: [
      {
        title: "Laporan",
        icon: PieChart,

        items: [
          {
            title: "Laporan Penjualan",
            url: "/laporan/laporan-penjualan",
          },

          {
            title: "Laporan Stok",
            url: "/laporan/laporan-stok",
          },
        ],
      },
    ],
  },

  {
    label: "PENGATURAN",

    items: [
      {
        title: "Pengaturan",
        icon: User,

        items: [
          {
            title: "Pengaturan Akun",
            url: "/pengaturan/pengaturan-akun",
          },
        ],
      },
    ],
  },
];
