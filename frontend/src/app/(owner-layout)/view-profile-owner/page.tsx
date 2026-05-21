"use client";

import React from "react";

export default function ViewProfileOwnerPage() {
  // Data dummy owner, silakan sesuaikan dengan state atau data fetch dari API Anda nantinya
  const ownerData = {
    name: "Owner Dana Stockroom",
    email: "owner@danastockroom.com",
    role: "Owner",
    phone: "081234567890",
  };

  return (
    <div className="w-full p-6">
      {/* Header Halaman */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-800">View Profile</h1>
        <p className="text-sm text-slate-500">Informasi akun owner Dana Stockroom</p>
      </div>

      {/* Card Container Utama */}
      <div className="bg-white rounded-2xl border border-slate-100 p-8 shadow-sm max-w-5xl">
        <div className="flex flex-col md:flex-row gap-8 items-start">
          
          {/* Avatar Bulat Besar */}
          <div className="flex-shrink-0">
            <div className="w-32 h-32 bg-[#00a3ff] rounded-full flex items-center justify-center text-white text-5xl font-semibold shadow-sm">
              {ownerData.name.charAt(0)}
            </div>
          </div>

          {/* Form Grid Fields (Read Only / Disabled) */}
          <div className="flex-grow w-full grid grid-cols-1 gap-5">
            
            {/* Field: Nama Lengkap */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-slate-600">Nama Lengkap</label>
              <input
                type="text"
                value={ownerData.name}
                disabled
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 outline-none cursor-not-allowed"
              />
            </div>

            {/* Field: Email */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-slate-600">Email</label>
              <input
                type="email"
                value={ownerData.email}
                disabled
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 outline-none cursor-not-allowed"
              />
            </div>

            {/* Field: Role */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-slate-600">Role</label>
              <input
                type="text"
                value={ownerData.role}
                disabled
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 outline-none cursor-not-allowed"
              />
            </div>

            {/* Field: Nomor Telepon */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-slate-600">Nomor Telepon</label>
              <input
                type="text"
                value={ownerData.phone}
                disabled
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 outline-none cursor-not-allowed"
              />
            </div>

          </div>
        </div>
      </div>
    </div>
  );
} 