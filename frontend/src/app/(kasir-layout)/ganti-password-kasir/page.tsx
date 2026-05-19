export default function GantiPasswordKasirPage() {
  return (
    <div className="space-y-6">
      {/* TITLE */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
          Ganti Password
        </h1>

        <p className="mt-2 text-gray-500 dark:text-gray-400">
          Ubah password akun kasir
        </p>
      </div>

      {/* CARD */}
      <div
        className="
          max-w-3xl
          rounded-3xl
          border
          border-gray-200
          bg-white
          p-8
          shadow-sm

          dark:border-white/10
          dark:bg-[#0F172A]
        ">
        <form className="space-y-5">
          <InputField
            label="Password Lama"
            placeholder="Masukkan password lama"
          />

          <InputField
            label="Password Baru"
            placeholder="Masukkan password baru"
          />

          <InputField
            label="Konfirmasi Password"
            placeholder="Ulangi password baru"
          />

          <button
            className="
              rounded-2xl
              bg-sky-500
              px-6
              py-4
              font-semibold
              text-white
              transition
              hover:bg-sky-600
            ">
            Simpan Password
          </button>
        </form>
      </div>
    </div>
  );
}

function InputField({
  label,
  placeholder,
}: {
  label: string;
  placeholder: string;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-gray-500 dark:text-gray-400">
        {label}
      </label>

      <input
        type="password"
        placeholder={placeholder}
        className="
          w-full
          rounded-2xl
          border
          border-gray-200
          bg-gray-50
          px-5
          py-4
          outline-none
          transition
          focus:border-sky-500

          dark:border-white/10
          dark:bg-[#081028]
          dark:text-white
        "
      />
    </div>
  );
}