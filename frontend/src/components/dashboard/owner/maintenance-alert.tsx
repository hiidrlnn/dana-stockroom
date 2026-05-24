"use client";

import { AlertTriangle, Calendar } from "lucide-react";

export function MaintenanceAlert() {
  return (
    <div
      className="
        overflow-hidden
        rounded-3xl
        border
        border-amber-200
        bg-gradient-to-r
        from-amber-50
        to-orange-50
        p-6
        shadow-sm

        dark:border-amber-500/20
        dark:from-amber-500/10
        dark:to-orange-500/10
      ">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-start gap-4">
          <div
            className="
              flex
              h-14
              w-14
              shrink-0
              items-center
              justify-center
              rounded-2xl
              bg-amber-500
              text-white
            ">
            <AlertTriangle size={28} />
          </div>

          <div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              Pengingat Maintenance Aplikasi
            </h3>

            <p className="mt-2 text-gray-600 dark:text-gray-300">
              Tagihan maintenance aplikasi
              Dana Stockroom akan jatuh
              tempo pada{" "}
              <span className="font-semibold">
                30 Mei 2026
              </span>
            </p>

            <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-amber-500/20 px-4 py-2 text-sm font-semibold text-amber-700 dark:text-amber-300">
              <Calendar size={16} />
              Sisa 7 hari lagi
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            className="
              rounded-2xl
              border
              border-gray-300
              bg-white
              px-5
              py-3
              font-medium
              text-slate-900
              transition
              hover:bg-gray-100

              dark:border-white/10
              dark:bg-white/5
              dark:text-white
            ">
            Lihat Detail
          </button>

          <button
            className="
              rounded-2xl
              bg-amber-500
              px-5
              py-3
              font-semibold
              text-white
              transition
              hover:bg-amber-600
            ">
            Tandai Sudah Dibayar
          </button>
        </div>
      </div>
    </div>
  );
}