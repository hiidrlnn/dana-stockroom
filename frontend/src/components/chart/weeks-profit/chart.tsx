  "use client";

  import type { ApexOptions } from "apexcharts";
  import dynamic from "next/dynamic";

  type ChartItem = {
    x: string;
    y: number;
  };

  type PropsType = {
    data?: {
      sales?: ChartItem[];
      revenue?: ChartItem[];
    };
  };

  const Chart = dynamic(() => import("react-apexcharts"), {
    ssr: false,
  });

  export function WeeksProfitChart({ data }: PropsType) {
    const salesData: ChartItem[] =
      data?.sales && data.sales.length > 0
        ? data.sales
        : [
            { x: "Sen", y: 120 },
            { x: "Sel", y: 150 },
            { x: "Rab", y: 180 },
            { x: "Kam", y: 140 },
            { x: "Jum", y: 210 },
            { x: "Sab", y: 250 },
            { x: "Min", y: 190 },
          ];

    const revenueData: ChartItem[] =
      data?.revenue && data.revenue.length > 0
        ? data.revenue
        : [
            { x: "Sen", y: 80 },
            { x: "Sel", y: 110 },
            { x: "Rab", y: 130 },
            { x: "Kam", y: 100 },
            { x: "Jum", y: 160 },
            { x: "Sab", y: 190 },
            { x: "Min", y: 140 },
          ];

    const options: ApexOptions = {
      colors: ["#5750F1", "#0ABEF9"],

      chart: {
        type: "bar",
        stacked: true,
        toolbar: {
          show: false,
        },
        zoom: {
          enabled: false,
        },
        background: "transparent",
      },

      responsive: [
        {
          breakpoint: 1536,
          options: {
            plotOptions: {
              bar: {
                borderRadius: 3,
                columnWidth: "25%",
              },
            },
          },
        },
      ],

      plotOptions: {
        bar: {
          horizontal: false,
          borderRadius: 4,
          columnWidth: "35%",
          borderRadiusApplication: "end",
          borderRadiusWhenStacked: "last",
        },
      },

      dataLabels: {
        enabled: false,
      },

      stroke: {
        show: false,
      },

      grid: {
        borderColor: "#374151",
        strokeDashArray: 5,

        xaxis: {
          lines: {
            show: false,
          },
        },

        yaxis: {
          lines: {
            show: true,
          },
        },
      },

      xaxis: {
        type: "category",

        categories: salesData.map((item) => item.x),

        axisBorder: {
          show: false,
        },

        axisTicks: {
          show: false,
        },

        labels: {
          style: {
            colors: "#9CA3AF",
            fontSize: "13px",
          },
        },
      },

      yaxis: {
        labels: {
          style: {
            colors: "#9CA3AF",
            fontSize: "13px",
          },
        },
      },

      legend: {
        position: "top",
        horizontalAlign: "left",
        fontFamily: "inherit",
        fontWeight: 500,
        fontSize: "14px",

        labels: {
          colors: "#9CA3AF",
        },

        markers: {
          size: 9,
          shape: "circle",
        },
      },

      tooltip: {
        theme: "dark",
      },

      fill: {
        opacity: 1,
      },
    };

    return (
      <div className="-ml-3.5 mt-4">
        <Chart
          options={options}
          series={[
            {
              name: "Penjualan",
              data: salesData.map((item) => item.y),
            },
            {
              name: "Pendapatan",
              data: revenueData.map((item) => item.y),
            },
          ]}
          type="bar"
          height={370}
        />
      </div>
    );
  }
