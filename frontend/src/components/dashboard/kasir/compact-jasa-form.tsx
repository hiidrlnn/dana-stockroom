export function CompactJasaForm() {
  return (
    <div
      className="
        rounded-3xl
        border
        border-gray-200
        bg-white
        p-6
        shadow-sm

        dark:border-white/10
        dark:bg-[#0F172A]
      ">
      <h2 className="mb-5 text-xl font-bold text-slate-900 dark:text-white">
        Input Jasa Cepat
      </h2>

      <div className="grid gap-4 md:grid-cols-3">
        <input
          type="text"
          placeholder="Nama jasa"
          className="
            rounded-2xl
            border
            border-gray-200
            bg-gray-50
            px-4
            py-3
            outline-none

            dark:border-white/10
            dark:bg-[#081028]
          "
        />

        <input
          type="number"
          placeholder="Harga"
          className="
            rounded-2xl
            border
            border-gray-200
            bg-gray-50
            px-4
            py-3
            outline-none

            dark:border-white/10
            dark:bg-[#081028]
          "
        />

        <button
          className="
            rounded-2xl
            bg-sky-500
            px-6
            py-3
            font-semibold
            text-white
            transition
            hover:bg-sky-600
          ">
          Simpan
        </button>
      </div>
    </div>
  );
}