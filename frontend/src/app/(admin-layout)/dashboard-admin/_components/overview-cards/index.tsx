import { OverviewCard } from "./card";
import * as icons from "./icons";

const API_URL =
  "http://127.0.0.1:8000/api/dashboard";

function formatRupiah(
  value: number,
) {
  return new Intl.NumberFormat(
    "id-ID",
    {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    },
  ).format(value);
}

type DashboardResponse = {
  success?: boolean;
  penjualan: number;
  stok_produk: number;
  transaksi: number;
  restock: number;
};

async function getDashboardData(): Promise<DashboardResponse> {
  try {
    const response = await fetch(
      API_URL,
      {
        cache: "no-store",
      },
    );

    if (!response.ok) {
      console.error(
        "Dashboard API Error:",
        response.status,
      );

      return {
        penjualan: 0,
        stok_produk: 0,
        transaksi: 0,
        restock: 0,
      };
    }

    const data =
      await response.json();

    return {
      penjualan: Number(
        data?.penjualan ?? 0,
      ),
      stok_produk: Number(
        data?.stok_produk ?? 0,
      ),
      transaksi: Number(
        data?.transaksi ?? 0,
      ),
      restock: Number(
        data?.restock ?? 0,
      ),
    };
  } catch (error) {
    console.error(
      "Dashboard Fetch Error:",
      error,
    );

    return {
      penjualan: 0,
      stok_produk: 0,
      transaksi: 0,
      restock: 0,
    };
  }
}

export async function OverviewCardsGroup() {
  const dashboard =
    await getDashboardData();

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <OverviewCard
        label="Penjualan"
        data={{
          value: formatRupiah(
            dashboard.penjualan,
          ),
          period:
            "TOTAL PENJUALAN",
        }}
        Icon={icons.Profit}
      />

      <OverviewCard
        label="Stok Produk"
        data={{
          value: String(
            dashboard.stok_produk,
          ),
          period: "ITEM READY",
        }}
        Icon={icons.Product}
      />

      <OverviewCard
        label="Transaksi"
        data={{
          value: String(
            dashboard.transaksi,
          ),
          period:
            "TOTAL TRANSAKSI",
        }}
        Icon={icons.Views}
      />

      <OverviewCard
        label="Restock"
        data={{
          value: String(
            dashboard.restock,
          ),
          period:
            "SEGERA CEK",
        }}
        Icon={icons.Users}
      />
    </div>
  );
}