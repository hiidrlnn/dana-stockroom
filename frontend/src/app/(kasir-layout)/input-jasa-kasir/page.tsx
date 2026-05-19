"use client";

import { useMemo, useState } from "react";

import Card from "@/components/ui/card";
import { formatRupiah } from "@/lib/format-rupiah";

type ServiceType = {
  id: number;
  invoice: string;
  customer: string;
  jasa: string;
  deskripsi: string;
  biaya: number;
  status: string;
  tanggal: string;
};

export default function InputJasaKasirPage() {
  const [search, setSearch] = useState("");

  const [services, setServices] = useState<ServiceType[]>([
    {
      id: 1,
      invoice: "JSA-001",
      customer: "Dirlan",
      jasa: "Cleaning Sepatu",
      deskripsi: "Deep cleaning premium",
      biaya: 85000,
      status: "Selesai",
      tanggal: "20 Mei 2026",
    },

    {
      id: 2,
      invoice: "JSA-002",
      customer: "Andi",
      jasa: "Repaint",
      deskripsi: "Repaint outsole",
      biaya: 150000,
      status: "Pending",
      tanggal: "20 Mei 2026",
    },

    {
      id: 3,
      invoice: "JSA-003",
      customer: "Budi",
      jasa: "Unyellowing",
      deskripsi: "Midsole whitening",
      biaya: 120000,
      status: "Selesai",
      tanggal: "19 Mei 2026",
    },
  ]);

  const [form, setForm] = useState({
    customer: "",
    jasa: "",
    deskripsi: "",
    biaya: "",
    status: "Pending",
  });

  /* =========================
     ADD JASA
  ========================= */
  const handleAddService = () => {
    if (!form.customer || !form.jasa || !form.biaya) {
      alert("Lengkapi data terlebih dahulu!");
      return;
    }

    const newService: ServiceType = {
      id: Date.now(),
      invoice: `JSA-${services.length + 1}`,
      customer: form.customer,
      jasa: form.jasa,
      deskripsi: form.deskripsi,
      biaya: Number(form.biaya),
      status: form.status,
      tanggal: new Date().toLocaleDateString("id-ID"),
    };

    setServices((prev) => [newService, ...prev]);

    setForm({
      customer: "",
      jasa: "",
      deskripsi: "",
      biaya: "",
      status: "Pending",
    });
  };

  /* =========================
     FILTER
  ========================= */
  const filteredServices = useMemo(() => {
    return services.filter(
      (item) =>
        item.customer.toLowerCase().includes(search.toLowerCase()) ||
        item.jasa.toLowerCase().includes(search.toLowerCase()) ||
        item.invoice.toLowerCase().includes(search.toLowerCase()),
    );
  }, [services, search]);

  /* =========================
     STATS
  ========================= */
  const totalPendapatan = services.reduce(
    (acc, item) => acc + item.biaya,
    0,
  );

  const pendingCount = services.filter(
    (item) => item.status === "Pending",
  ).length;

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Input Jasa Kasir
        </h1>

        <p className="mt-2 text-gray-500 dark:text-gray-400">
          Kelola jasa layanan Dana Stockroom
        </p>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        <Card className="border border-gray-200 bg-white dark:border-white/10 dark:bg-[#0F172A]">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Total Jasa
          </p>

          <h3 className="mt-3 text-3xl font-bold text-gray-900 dark:text-white">
            {services.length}
          </h3>
        </Card>

        <Card className="border border-gray-200 bg-white dark:border-white/10 dark:bg-[#0F172A]">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Pendapatan Jasa
          </p>

          <h3 className="mt-3 text-3xl font-bold text-gray-900 dark:text-white">
            {formatRupiah(totalPendapatan)}
          </h3>
        </Card>

        <Card className="border border-gray-200 bg-white dark:border-white/10 dark:bg-[#0F172A]">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Jasa Pending
          </p>

          <h3 className="mt-3 text-3xl font-bold text-gray-900 dark:text-white">
            {pendingCount}
          </h3>
        </Card>
      </div>

      {/* FORM */}
      <Card className="border border-gray-200 bg-white dark:border-white/10 dark:bg-[#0F172A]">
        <h2 className="mb-6 text-xl font-semibold text-gray-900 dark:text-white">
          Tambah Jasa
        </h2>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <input
            type="text"
            placeholder="Nama Customer"
            value={form.customer}
            onChange={(e) =>
              setForm({ ...form, customer: e.target.value })
            }
            className="rounded-2xl border border-gray-200 bg-gray-100 px-4 py-3 dark:border-white/10 dark:bg-[#1E293B] dark:text-white"
          />

          <input
            type="text"
            placeholder="Jenis Jasa"
            value={form.jasa}
            onChange={(e) =>
              setForm({ ...form, jasa: e.target.value })
            }
            className="rounded-2xl border border-gray-200 bg-gray-100 px-4 py-3 dark:border-white/10 dark:bg-[#1E293B] dark:text-white"
          />

          <input
            type="text"
            placeholder="Deskripsi"
            value={form.deskripsi}
            onChange={(e) =>
              setForm({ ...form, deskripsi: e.target.value })
            }
            className="rounded-2xl border border-gray-200 bg-gray-100 px-4 py-3 dark:border-white/10 dark:bg-[#1E293B] dark:text-white"
          />

          <input
            type="number"
            placeholder="Biaya Jasa"
            value={form.biaya}
            onChange={(e) =>
              setForm({ ...form, biaya: e.target.value })
            }
            className="rounded-2xl border border-gray-200 bg-gray-100 px-4 py-3 dark:border-white/10 dark:bg-[#1E293B] dark:text-white"
          />

          <select
            value={form.status}
            onChange={(e) =>
              setForm({ ...form, status: e.target.value })
            }
            className="rounded-2xl border border-gray-200 bg-gray-100 px-4 py-3 dark:border-white/10 dark:bg-[#1E293B] dark:text-white">
            <option>Pending</option>
            <option>Selesai</option>
          </select>
        </div>

        <button
          onClick={handleAddService}
          className="mt-6 rounded-2xl bg-sky-500 px-6 py-3 font-semibold text-white hover:bg-sky-600">
          + Tambah Jasa
        </button>
      </Card>

      {/* TABLE */}
      <Card className="border border-gray-200 bg-white dark:border-white/10 dark:bg-[#0F172A]">
        <div className="mb-6">
          <input
            type="text"
            placeholder="Cari jasa..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-2xl border border-gray-200 bg-gray-100 px-4 py-3 dark:border-white/10 dark:bg-[#1E293B] dark:text-white"
          />
        </div>

        <div className="-mx-6 overflow-x-auto">
          <div className="min-w-[1100px] px-6">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 dark:border-white/10">
                  <th className="pb-4 text-left text-sm text-gray-500">
                    Invoice
                  </th>
                  <th className="pb-4 text-left text-sm text-gray-500">
                    Customer
                  </th>
                  <th className="pb-4 text-left text-sm text-gray-500">
                    Jasa
                  </th>
                  <th className="pb-4 text-left text-sm text-gray-500">
                    Biaya
                  </th>
                  <th className="pb-4 text-left text-sm text-gray-500">
                    Status
                  </th>
                  <th className="pb-4 text-left text-sm text-gray-500">
                    Tanggal
                  </th>
                </tr>
              </thead>

              <tbody>
                {filteredServices.map((item) => (
                  <tr
                    key={item.id}
                    className="border-b border-gray-200 dark:border-white/5">
                    <td className="py-5 font-semibold text-gray-900 dark:text-white">
                      {item.invoice}
                    </td>

                    <td className="py-5 text-gray-700 dark:text-gray-300">
                      {item.customer}
                    </td>

                    <td className="py-5 text-gray-700 dark:text-gray-300">
                      {item.jasa}
                    </td>

                    <td className="py-5 font-semibold text-gray-900 dark:text-white">
                      {formatRupiah(item.biaya)}
                    </td>

                    <td className="py-5">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          item.status === "Selesai"
                            ? "bg-green-100 text-green-600 dark:bg-green-500/20 dark:text-green-400"
                            : "bg-yellow-100 text-yellow-600 dark:bg-yellow-500/20 dark:text-yellow-400"
                        }`}>
                        {item.status}
                      </span>
                    </td>

                    <td className="py-5 text-gray-700 dark:text-gray-300">
                      {item.tanggal}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Card>
    </div>
  );
}