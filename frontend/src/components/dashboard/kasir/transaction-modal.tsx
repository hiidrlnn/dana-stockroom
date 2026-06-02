"use client";

import { useState, useEffect } from "react";

const JASA_LIST = [
  { nama: "Reglue (LEM)", price: 100000 },
  { nama: "Repaint (CAT)", price: 100000 },
  { nama: "Sepatu (Sneaker)", price: 40000 },
  { nama: "Sepatu (Kulit)", price: 40000 },
  { nama: "Cuci Premium (Kulit)", price: 50000 },
  { nama: "Cuci Premium (Suede)", price: 50000 },
  { nama: "Cuci Premium (Semua Bahan)", price: 50000 },
];

export function TransactionModal({ 
  onClose, 
  onSuccess, 
  products, 
  mode = 'produk', 
  initialData 
}: { 
  onClose: () => void, 
  onSuccess: () => void, 
  products: any[],
  mode?: 'produk' | 'jasa',
  initialData?: { name: string, price: number } | null
}) {
  const isJasaMode = mode === 'jasa';
  
  // Inisialisasi keranjang: jika ada initialData (jasa), masukkan langsung
  const [cart, setCart] = useState<any[]>(() => {
    if (initialData) {
      return [{ nama: initialData.name, price: initialData.price, qty: 1, isJasa: true }];
    }
    return [];
  });
  
  const [uangMasuk, setUangMasuk] = useState(0);

  const addToCart = (item: any) => {
    const isJasa = isJasaMode;
    
    setCart((prev) => {
      const exist = prev.find((i) => (isJasa ? i.nama === item.nama : i.id === item.id));
      if (exist) {
        return prev.map(i => (isJasa ? i.nama === item.nama : i.id === item.id) ? { ...i, qty: i.qty + 1 } : i);
      }
      return [...prev, { ...item, qty: 1, isJasa }];
    });
  };

  const totalHarga = cart.reduce((acc, item) => acc + (item.harga_jual || item.price) * item.qty, 0);
  const kembalian = uangMasuk - totalHarga;

  const handleSubmit = async () => {
    const items = cart.map(item => ({
      product_id: isJasaMode ? null : item.id,
      jasa_name: isJasaMode ? (item.nama || item.name) : null,
      quantity: item.qty,
      price: item.harga_jual || item.price,
      is_jasa: isJasaMode
    }));
    
    const res = await fetch("http://127.0.0.1:8000/api/transactions", {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}` 
      },
      body: JSON.stringify({ 
        total: totalHarga, 
        items: items, 
        type: isJasaMode ? 'jasa' : 'produk',
        customer_name: 'Pelanggan Umum'
      }),
    });

    if (res.ok) {
        onSuccess();
    } else {
        const errorData = await res.json();
        alert(errorData.message || "Gagal melakukan transaksi");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className="bg-white dark:bg-[#0F172A] w-full max-w-4xl h-[80vh] rounded-3xl flex overflow-hidden shadow-2xl">
        
        {/* KIRI: DAFTAR PILIHAN */}
        <div className="w-1/2 p-6 overflow-y-auto border-r dark:border-white/10">
          <h2 className="text-xl font-bold mb-4 dark:text-white">
            {isJasaMode ? "Detail Layanan Jasa" : "Pilih Produk"}
          </h2>
          <div className="space-y-3">
            {/* Jika mode jasa dan ada initialData, tampilkan item tersebut saja atau list jasa */}
            {(isJasaMode ? JASA_LIST : products).map((item, i) => (
              <div key={i} className="flex justify-between items-center p-3 border rounded-xl dark:border-white/10">
                <div>
                  <p className="font-semibold dark:text-white">{item.nama || item.name}</p>
                  <p className="text-sm text-gray-500">Rp {(item.harga_jual || item.price).toLocaleString()}</p>
                </div>
                <button onClick={() => addToCart(item)} className="bg-sky-500 text-white px-4 py-2 rounded-lg hover:bg-sky-600 transition">Tambah</button>
              </div>
            ))}
          </div>
        </div>

        {/* KANAN: FORM & PERHITUNGAN */}
        <div className="w-1/2 p-6 flex flex-col justify-between">
          <div>
            <h2 className="text-xl font-bold mb-4 dark:text-white">Keranjang & Pembayaran</h2>
            <div className="space-y-2 mb-6 max-h-[40vh] overflow-y-auto">
              {cart.length === 0 && <p className="text-gray-400 text-sm">Keranjang kosong...</p>}
              {cart.map((item, idx) => (
                <div key={idx} className="flex justify-between dark:text-gray-300 text-sm">
                  <span>{item.nama || item.name} (x{item.qty})</span>
                  <span>Rp {((item.harga_jual || item.price) * item.qty).toLocaleString()}</span>
                </div>
              ))}
            </div>
            
            <div className="border-t pt-4 space-y-3 dark:border-white/10">
              <p className="font-bold text-lg dark:text-white">Total: Rp {totalHarga.toLocaleString()}</p>
              <input 
                type="number" 
                placeholder="Masukkan Uang Tunai" 
                className="w-full p-3 rounded-lg border dark:bg-slate-800 dark:border-none dark:text-white focus:ring-2 focus:ring-sky-500 outline-none"
                onChange={(e) => setUangMasuk(Number(e.target.value))}
              />
              <p className="font-semibold dark:text-gray-300">Kembalian: Rp {kembalian >= 0 ? kembalian.toLocaleString() : 0}</p>
            </div>
          </div>

          <div className="flex gap-3 mt-6">
            <button onClick={onClose} className="flex-1 py-3 rounded-xl bg-gray-200 dark:bg-slate-700 dark:text-white hover:bg-gray-300 dark:hover:bg-slate-600">Batal</button>
            <button 
              onClick={handleSubmit} 
              disabled={cart.length === 0 || kembalian < 0} 
              className="flex-1 py-3 rounded-xl bg-blue-600 text-white disabled:bg-gray-400 hover:bg-blue-700 transition"
            >
              Bayar Sekarang
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}