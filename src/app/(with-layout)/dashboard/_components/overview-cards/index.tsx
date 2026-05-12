import { OverviewCard } from "./card";
import * as icons from "./icons";

export async function OverviewCardsGroup() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <OverviewCard
        label="Penjualan"
        data={{
          value: "Rp 12.450.000",
          growthRate: "+12%",
          period: "HARI INI",
        }}
        Icon={icons.Profit}
      />

      <OverviewCard
        label="Stok Produk"
        data={{
          value: "1.280",
          growthRate: "",
          period: "ITEM READY",
        }}
        Icon={icons.Product}
      />

      <OverviewCard
        label="Transaksi"
        data={{
          value: "842",
          growthRate: "",
          period: "BULAN INI",
        }}
        Icon={icons.Views}
      />

      <OverviewCard
        label="Restock"
        data={{
          value: "24",
          growthRate: "",
          period: "SEGERA CEK",
        }}
        Icon={icons.Users}
      />
    </div>
  );
}
