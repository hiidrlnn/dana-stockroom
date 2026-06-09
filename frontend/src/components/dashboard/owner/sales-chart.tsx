"use client";

import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface ChartData {
  day: string;
  sales: number;
}

export default function SalesChart() {
  const [chartData, setChartData] = useState<ChartData[]>([]);

  const fetchChartData = async () => {
    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/dashboard"
      );

      const result = await response.json();

      const labels = result.weekly_labels ?? [];
      const sales = result.weekly_sales ?? [];

      const formattedData = labels.map(
        (label: string, index: number) => ({
          day: label,
          sales: sales[index] ?? 0,
        })
      );

      setChartData(formattedData);
    } catch (error) {
      console.error(
        "Gagal mengambil data grafik:",
        error
      );
    }
  };

  useEffect(() => {
    fetchChartData();

    const interval = setInterval(() => {
      fetchChartData();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-full rounded-2xl border border-gray-100 bg-white p-6 shadow-sm dark:border-white/5 dark:bg-[#0F172A]">
      <h3 className="mb-6 text-sm font-bold text-slate-900 dark:text-white">
        Penjualan Mingguan
      </h3>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <XAxis
              dataKey="day"
              tick={{ fill: "#64748B" }}
              axisLine={false}
              tickLine={false}
            />

            <YAxis
              tick={{ fill: "#64748B" }}
              axisLine={false}
              tickLine={false}
            />

            <Tooltip
              contentStyle={{
                backgroundColor: "#1E293B",
                border: "none",
                borderRadius: "8px",
                color: "#FFFFFF",
              }}
              formatter={(value: number) => [
                `Rp ${value.toLocaleString("id-ID")}`,
                "Penjualan",
              ]}
            />

            <Bar
              dataKey="sales"
              fill="#3C50E0"
              stroke="#3C50E0"
              radius={[8, 8, 0, 0]}
              isAnimationActive={false}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}