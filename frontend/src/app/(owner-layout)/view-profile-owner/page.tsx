"use client";

import React from "react";

export default function ViewProfileOwnerPage() {
  const ownerData = {
    name: "Owner Dana Stockroom",
    email: "owner@danastockroom.com",
    role: "Owner",
    phone: "081234567890",
  };

  return (
    <div className="w-full p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
          View Profile
        </h1>

        <p className="text-sm text-slate-500 dark:text-gray-400">
          Informasi akun owner Dana Stockroom
        </p>
      </div>

      {/* Card */}
      <div
        className="
          max-w-5xl
          rounded-2xl
          border
          border-slate-200
          bg-white
          p-8
          shadow-sm

          dark:border-white/10
          dark:bg-[#0F172A]
        "
      >
        <div className="flex flex-col items-start gap-8 md:flex-row">
          {/* Avatar */}
          <div className="flex-shrink-0">
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
                font-semibold
                text-white
                shadow-sm
              "
            >
              {ownerData.name.charAt(0)}
            </div>
          </div>

          {/* Form */}
          <div className="grid w-full flex-grow grid-cols-1 gap-5">
            {/* Nama */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-slate-600 dark:text-gray-300">
                Nama Lengkap
              </label>

              <input
                type="text"
                value={ownerData.name}
                disabled
                className="
                  w-full
                  cursor-not-allowed
                  rounded-xl
                  border
                  border-slate-200
                  bg-slate-50
                  px-4
                  py-3
                  text-slate-700
                  outline-none

                  dark:border-white/10
                  dark:bg-slate-800
                  dark:text-white
                "
              />
            </div>

            {/* Email */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-slate-600 dark:text-gray-300">
                Email
              </label>

              <input
                type="email"
                value={ownerData.email}
                disabled
                className="
                  w-full
                  cursor-not-allowed
                  rounded-xl
                  border
                  border-slate-200
                  bg-slate-50
                  px-4
                  py-3
                  text-slate-700
                  outline-none

                  dark:border-white/10
                  dark:bg-slate-800
                  dark:text-white
                "
              />
            </div>

            {/* Role */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-slate-600 dark:text-gray-300">
                Role
              </label>

              <input
                type="text"
                value={ownerData.role}
                disabled
                className="
                  w-full
                  cursor-not-allowed
                  rounded-xl
                  border
                  border-slate-200
                  bg-slate-50
                  px-4
                  py-3
                  text-slate-700
                  outline-none

                  dark:border-white/10
                  dark:bg-slate-800
                  dark:text-white
                "
              />
            </div>

            {/* Nomor Telepon */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-slate-600 dark:text-gray-300">
                Nomor Telepon
              </label>

              <input
                type="text"
                value={ownerData.phone}
                disabled
                className="
                  w-full
                  cursor-not-allowed
                  rounded-xl
                  border
                  border-slate-200
                  bg-slate-50
                  px-4
                  py-3
                  text-slate-700
                  outline-none

                  dark:border-white/10
                  dark:bg-slate-800
                  dark:text-white
                "
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}