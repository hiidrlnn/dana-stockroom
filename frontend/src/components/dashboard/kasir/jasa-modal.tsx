"use client";

interface JasaModalProps {
  onClose: () => void;
  onSelect: (jasa: { name: string; price: number }) => void;
}

const JASA_LIST = [
  { name: "Reglue (LEM)", price: 100000 }, // Nilai tengah
  { name: "Repaint (CAT)", price: 100000 },
  { name: "Sepatu (Sneaker)", price: 40000 },
  { name: "Sepatu (Kulit)", price: 40000 },
  { name: "Cuci Premium (Kulit)", price: 50000 },
  { name: "Cuci Premium (Suede)", price: 50000 },
  { name: "Cuci Premium (Semua Bahan)", price: 50000 },
];

export function JasaModal({ onClose, onSelect }: JasaModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="w-full max-w-sm rounded-xl bg-white p-6 shadow-2xl dark:bg-slate-900">
        <h2 className="mb-4 text-xl font-bold">Pilih Layanan Jasa</h2>
        <div className="max-h-[60vh] space-y-2 overflow-y-auto pr-2">
          {JASA_LIST.map((jasa, idx) => (
            <button
              key={idx}
              onClick={() => onSelect(jasa)}
              className="flex w-full justify-between rounded-lg border p-3 text-sm hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800"
            >
              <span>{jasa.name}</span>
              <span className="font-semibold text-blue-600">Rp {jasa.price.toLocaleString()}</span>
            </button>
          ))}
        </div>
        <button onClick={onClose} className="mt-4 w-full rounded-lg bg-gray-200 py-2 text-sm font-medium hover:bg-gray-300">
          Batal
        </button>
      </div>
    </div>
  );
}