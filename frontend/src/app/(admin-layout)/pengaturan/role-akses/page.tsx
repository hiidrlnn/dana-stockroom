"use client";

import Card from "@/components/ui/card";

type PermissionType = {
  menu: string;
  owner: {
    view: boolean;
    create: boolean;
    edit: boolean;
    delete: boolean;
  };

  admin: {
    view: boolean;
    create: boolean;
    edit: boolean;
    delete: boolean;
  };

  kasir: {
    view: boolean;
    create: boolean;
    edit: boolean;
    delete: boolean;
  };
};

export default function RoleAksesPage() {
  const permissions: PermissionType[] = [
    {
      menu: "Dashboard",

      owner: {
        view: true,
        create: true,
        edit: true,
        delete: true,
      },

      admin: {
        view: true,
        create: false,
        edit: false,
        delete: false,
      },

      kasir: {
        view: true,
        create: false,
        edit: false,
        delete: false,
      },
    },

    {
      menu: "Produk",

      owner: {
        view: true,
        create: true,
        edit: true,
        delete: true,
      },

      admin: {
        view: true,
        create: true,
        edit: true,
        delete: true,
      },

      kasir: {
        view: true,
        create: false,
        edit: false,
        delete: false,
      },
    },

    {
      menu: "Transaksi",

      owner: {
        view: true,
        create: true,
        edit: true,
        delete: true,
      },

      admin: {
        view: true,
        create: true,
        edit: true,
        delete: false,
      },

      kasir: {
        view: true,
        create: true,
        edit: false,
        delete: false,
      },
    },

    {
      menu: "Laporan",

      owner: {
        view: true,
        create: true,
        edit: true,
        delete: true,
      },

      admin: {
        view: true,
        create: false,
        edit: false,
        delete: false,
      },

      kasir: {
        view: false,
        create: false,
        edit: false,
        delete: false,
      },
    },

    {
      menu: "Manajemen User",

      owner: {
        view: true,
        create: true,
        edit: true,
        delete: true,
      },

      admin: {
        view: false,
        create: false,
        edit: false,
        delete: false,
      },

      kasir: {
        view: false,
        create: false,
        edit: false,
        delete: false,
      },
    },
  ];

  const renderPermission = (value: boolean) => {
    return (
      <div
        className={`
          flex
          h-6
          w-6
          items-center
          justify-center
          rounded-full
          text-xs
          font-bold

          ${
            value
              ? "bg-green-100 text-green-600 dark:bg-green-500/20 dark:text-green-400"
              : "bg-red-100 text-red-600 dark:bg-red-500/20 dark:text-red-400"
          }
        `}>
        {value ? "✓" : "✕"}
      </div>
    );
  };

  return (
    <div>
      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Role & Hak Akses
        </h1>

        <p className="mt-2 text-gray-500 dark:text-gray-400">
          Kelola hak akses pengguna Dana Stockroom
        </p>
      </div>

      {/* CARD */}
      <Card className="border border-gray-200 bg-white dark:border-white/10 dark:bg-[#0F172A]">
        <div className="overflow-x-auto">
          <div className="min-w-[1400px]">
            <table className="w-full">
              {/* HEAD */}
              <thead>
                <tr className="border-b border-gray-200 dark:border-white/10">
                  <th className="pb-5 text-left text-sm font-semibold text-gray-500 dark:text-gray-400">
                    Menu
                  </th>

                  {/* OWNER */}
                  <th className="pb-5 text-center text-sm font-semibold text-purple-500">
                    Owner
                  </th>

                  {/* ADMIN */}
                  <th className="pb-5 text-center text-sm font-semibold text-red-500">
                    Admin
                  </th>

                  {/* KASIR */}
                  <th className="pb-5 text-center text-sm font-semibold text-sky-500">
                    Kasir
                  </th>
                </tr>
              </thead>

              {/* BODY */}
              <tbody>
                {permissions.map((item, index) => (
                  <tr
                    key={index}
                    className="border-b border-gray-200 dark:border-white/5">
                    {/* MENU */}
                    <td className="py-6">
                      <h3 className="font-semibold text-gray-900 dark:text-white">
                        {item.menu}
                      </h3>

                      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                        Hak akses fitur {item.menu}
                      </p>
                    </td>

                    {/* OWNER */}
                    <td className="py-6">
                      <div className="grid grid-cols-4 gap-4">
                        {renderPermission(item.owner.view)}
                        {renderPermission(item.owner.create)}
                        {renderPermission(item.owner.edit)}
                        {renderPermission(item.owner.delete)}
                      </div>

                      <div className="mt-3 grid grid-cols-4 gap-4 text-center text-xs text-gray-500 dark:text-gray-400">
                        <span>View</span>
                        <span>Create</span>
                        <span>Edit</span>
                        <span>Delete</span>
                      </div>
                    </td>

                    {/* ADMIN */}
                    <td className="py-6">
                      <div className="grid grid-cols-4 gap-4">
                        {renderPermission(item.admin.view)}
                        {renderPermission(item.admin.create)}
                        {renderPermission(item.admin.edit)}
                        {renderPermission(item.admin.delete)}
                      </div>

                      <div className="mt-3 grid grid-cols-4 gap-4 text-center text-xs text-gray-500 dark:text-gray-400">
                        <span>View</span>
                        <span>Create</span>
                        <span>Edit</span>
                        <span>Delete</span>
                      </div>
                    </td>

                    {/* KASIR */}
                    <td className="py-6">
                      <div className="grid grid-cols-4 gap-4">
                        {renderPermission(item.kasir.view)}
                        {renderPermission(item.kasir.create)}
                        {renderPermission(item.kasir.edit)}
                        {renderPermission(item.kasir.delete)}
                      </div>

                      <div className="mt-3 grid grid-cols-4 gap-4 text-center text-xs text-gray-500 dark:text-gray-400">
                        <span>View</span>
                        <span>Create</span>
                        <span>Edit</span>
                        <span>Delete</span>
                      </div>
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
