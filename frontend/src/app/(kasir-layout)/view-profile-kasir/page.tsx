export default function ViewProfileKasirPage() {
  return (
    <div className="space-y-6">
      {/* TITLE */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
          View Profile
        </h1>

        <p className="mt-2 text-gray-500 dark:text-gray-400">
          Informasi akun kasir Dana Stockroom
        </p>
      </div>

      {/* CARD */}
      <div
        className="
          rounded-3xl
          border
          border-gray-200
          bg-white
          p-8
          shadow-sm

          dark:border-white/10
          dark:bg-[#0F172A]
        ">
        <div className="flex flex-col gap-8 md:flex-row">
          {/* AVATAR */}
          <div className="flex justify-center">
            <div
              className="
                flex
                h-32
                w-32
                items-center
                justify-center
                rounded-full
                bg-sky-500
                text-5xl
                font-bold
                text-white
              ">
              K
            </div>
          </div>

          {/* INFO */}
          <div className="flex-1 space-y-6">
            <ProfileField
              label="Nama Lengkap"
              value="Kasir"
            />

            <ProfileField
              label="Email"
              value="kasir@danastockroom.com"
            />

            <ProfileField
              label="Role"
              value="Staff Kasir"
            />

            <ProfileField
              label="Nomor Telepon"
              value="081234567890"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function ProfileField({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-gray-500 dark:text-gray-400">
        {label}
      </label>

      <div
        className="
          rounded-2xl
          border
          border-gray-200
          bg-gray-50
          px-5
          py-4
          text-slate-900

          dark:border-white/10
          dark:bg-[#081028]
          dark:text-white
        ">
        {value}
      </div>
    </div>
  );
}