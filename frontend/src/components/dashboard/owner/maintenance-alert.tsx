"use client";

import { useState } from "react";
import { AlertTriangle, Calendar, X } from "lucide-react";

export function MaintenanceAlert() {
  const [showDetail, setShowDetail] = useState(false);

  const today = new Date();

  const currentMonth = today.toLocaleString("id-ID", {
    month: "long",
    year: "numeric",
  });

  const dueDate = new Date(
    today.getFullYear(),
    today.getMonth(),
    5
  );

  const dueDateText = dueDate.toLocaleDateString(
    "id-ID",
    {
      day: "numeric",
      month: "long",
      year: "numeric",
    }
  );

  const diffTime = dueDate.getTime() - today.getTime();

  const diffDays = Math.ceil(
    diffTime / (1000 * 60 * 60 * 24)
  );

  const whatsappMessage =
    "Halo saya sudah membayar dan ini bukti pembayarannya";

  const whatsappUrl = `https://wa.me/6285176702827?text=${encodeURIComponent(
    whatsappMessage
  )}`;

  return (
    <>
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
        "
      >
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
              "
            >
              <AlertTriangle size={28} />
            </div>

            <div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                Pengingat Tagihan Bulanan
              </h3>

              <p className="mt-2 text-gray-600 dark:text-gray-300">
                Tagihan aplikasi Dana Stockroom untuk periode{" "}
                <span className="font-semibold">
                  {currentMonth}
                </span>{" "}
                jatuh tempo setiap tanggal{" "}
                <span className="font-semibold">
                  5
                </span>.
              </p>

              <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-amber-500/20 px-4 py-2 text-sm font-semibold text-amber-700 dark:text-amber-300">
                <Calendar size={16} />

                {diffDays > 0
                  ? `Sisa ${diffDays} hari lagi`
                  : diffDays === 0
                  ? "Jatuh tempo hari ini"
                  : "Tagihan sudah jatuh tempo"}
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setShowDetail(true)}
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
              "
            >
              Lihat Detail
            </button>

            <button
              onClick={() =>
                window.open(
                  whatsappUrl,
                  "_blank"
                )
              }
              className="
                rounded-2xl
                bg-green-600
                px-5
                py-3
                font-semibold
                text-white
                transition
                hover:bg-green-700
              "
            >
              Upload Bukti Pembayaran
            </button>
          </div>
        </div>
      </div>

      {showDetail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <div className="w-full max-w-xl rounded-2xl bg-white p-4 shadow-xl dark:bg-[#0F172A]">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                Detail Tagihan Maintenance
              </h2>

              <button
                onClick={() => setShowDetail(false)}
                className="rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-white/10"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-5">
              <div>
                <p className="text-sm text-gray-500">
                  Periode
                </p>

                <p className="font-semibold text-slate-900 dark:text-white">
                  {currentMonth}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500">
                  Nominal Tagihan
                </p>

                <p className="text-3xl font-bold text-amber-600">
                  Rp 375.000
                </p>
              </div>

              <div>
                <p className="mb-3 text-sm text-gray-500">
                  Rincian Biaya
                </p>

                <div className="space-y-3 rounded-2xl bg-gray-50 p-5 dark:bg-white/5">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-700 dark:text-gray-300">
                      Hosting VPS / Server
                    </span>

                    <span className="font-semibold text-slate-900 dark:text-white">
                      Rp 150.000
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-slate-700 dark:text-gray-300">
                      Database & Backup Data
                    </span>

                    <span className="font-semibold text-slate-900 dark:text-white">
                      Rp 50.000
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-slate-700 dark:text-gray-300">
                      Domain & SSL
                    </span>

                    <span className="font-semibold text-slate-900 dark:text-white">
                      Rp 25.000
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-slate-700 dark:text-gray-300">
                      Monitoring & Keamanan
                    </span>

                    <span className="font-semibold text-slate-900 dark:text-white">
                      Rp 50.000
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-slate-700 dark:text-gray-300">
                      Maintenance Sistem
                    </span>

                    <span className="font-semibold text-slate-900 dark:text-white">
                      Rp 75.000
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-slate-700 dark:text-gray-300">
                      Dukungan Teknis
                    </span>

                    <span className="font-semibold text-slate-900 dark:text-white">
                      Rp 25.000
                    </span>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5 dark:border-amber-500/20 dark:bg-amber-500/10">
                <div className="flex items-center justify-between">
                  <span className="text-lg font-semibold text-slate-900 dark:text-white">
                    Total Tagihan
                  </span>

                  <span className="text-3xl font-bold text-amber-600">
                    Rp 375.000
                  </span>
                </div>
              </div>

              <div className="rounded-2xl border border-blue-200 bg-blue-50 p-5 dark:border-blue-500/20 dark:bg-blue-500/10">
                <h3 className="mb-4 text-lg font-semibold text-slate-900 dark:text-white">
                  Informasi Pembayaran
                </h3>

                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-500">
                      Nomor Rekening
                    </p>

                    <p className="text-xl font-bold text-slate-900 dark:text-white">
                      901567669878 Seabank
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">
                      Atas Nama
                    </p>

                    <p className="font-semibold text-slate-900 dark:text-white">
                      Ari Rizal Firmansyah
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <p className="text-sm text-gray-500">
                  Jatuh Tempo
                </p>

                <p className="font-semibold text-slate-900 dark:text-white">
                  {dueDateText}
                </p>
              </div>
            </div>

            <div className="mt-8 flex justify-end gap-3">
              <button
                onClick={() => setShowDetail(false)}
                className="
                  rounded-xl
                  border
                  border-gray-300
                  px-5
                  py-3
                  font-medium
                  text-slate-900
                  hover:bg-gray-100
                  dark:border-white/10
                  dark:text-white
                  dark:hover:bg-white/10
                "
              >
                Tutup
              </button>

              <button
                onClick={() =>
                  window.open(
                    whatsappUrl,
                    "_blank"
                  )
                }
                className="
                  rounded-xl
                  bg-green-600
                  px-5
                  py-3
                  font-semibold
                  text-white
                  transition
                  hover:bg-green-700
                "
              >
                Upload Bukti Pembayaran
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}