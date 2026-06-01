"use client";

import { useState } from "react";

export function TransactionModal({ onClose, onSuccess, products }: { onClose: () => void, onSuccess: () => void, products: any[] }) {
  const [cart, setCart] = useState<any[]>([]);
  const [uangMasuk, setUangMasuk] = useState(0);

  // Menambah produk ke keranjang
  const addToCart = (product: any) => {
    const exist = cart.find((item) => item.id === product.id);
    if (exist) {
      setCart(cart.map(i => i.id === product.id ? { ...i, qty: i.qty + 1 } : i));
    } else {
      setCart([...cart, { ...product, qty: 1 }]);
    }
  };

  const totalHarga = cart.reduce((acc, item) => acc + (item.harga_jual * item.qty), 0);
  const kembalian = uangMasuk - totalHarga;

  const handleSubmit = async () => {
    // Format data untuk dikirim ke Laravel (mengirim array items)
    const items = cart.map(item => ({ product_id: item.id, quantity: item.qty }));
    
    const res = await fetch("http://127.0.0.1:8000/api/transactions", {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}` 
      },
      body: JSON.stringify({ 
        customer_name: "Umum", 
        total: totalHarga,
        items: items 
      }),
    });

    if (res.ok) {
      onSuccess();
    } else {
      alert("Gagal melakukan transaksi");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className="bg-white dark:bg-[#0F172A] w-full max-w-4xl h-[80vh] rounded-3xl flex overflow-hidden shadow-2xl">
        
        {/* KIRI: DAFTAR PRODUK */}
        <div className="w-1/2 p-6 overflow-y-auto border-r dark:border-white/10">
          <h2 className="text-xl font-bold mb-4 dark:text-white">Pilih Produk</h2>
          <div className="space-y-3">
            {products.map((p) => (
              <div key={p.id} className="flex justify-between items-center p-3 border rounded-xl dark:border-white/10">
                <div>
                  <p className="font-semibold dark:text-white">{p.nama}</p>
                  <p className="text-sm text-gray-500">Rp {p.harga_jual.toLocaleString()}</p>
                </div>
                <button onClick={() => addToCart(p)} className="bg-sky-500 text-white px-4 py-2 rounded-lg hover:bg-sky-600">Tambah</button>
              </div>
            ))}
          </div>
        </div>

        {/* KANAN: FORM & PERHITUNGAN */}
        <div className="w-1/2 p-6 flex flex-col justify-between">
          <div>
            <h2 className="text-xl font-bold mb-4 dark:text-white">Form Transaksi</h2>
            <div className="space-y-2 mb-6">
              {cart.map((item, idx) => (
                <div key={idx} className="flex justify-between dark:text-gray-300">
                  <span>{item.nama} (x{item.qty})</span>
                  <span>Rp {(item.harga_jual * item.qty).toLocaleString()}</span>
                </div>
              ))}
            </div>
            
            <div className="border-t pt-4 space-y-3 dark:border-white/10">
              <p className="font-bold text-lg dark:text-white">Total: Rp {totalHarga.toLocaleString()}</p>
              <input 
                type="number" 
                placeholder="Uang Masuk" 
                className="w-full p-3 rounded-lg border dark:bg-slate-800 dark:border-none dark:text-white"
                onChange={(e) => setUangMasuk(Number(e.target.value))}
              />
              <p className="font-semibold dark:text-gray-300">Kembalian: Rp {kembalian >= 0 ? kembalian.toLocaleString() : 0}</p>
            </div>
          </div>

          <div className="flex gap-3 mt-6">
            <button onClick={onClose} className="flex-1 py-3 rounded-xl bg-gray-200 dark:bg-slate-700 dark:text-white">Batal</button>
            <button onClick={handleSubmit} disabled={totalHarga === 0 || kembalian < 0} className="flex-1 py-3 rounded-xl bg-blue-600 text-white disabled:bg-gray-400">Bayar</button>
          </div>
        </div>
      </div>
    </div>
  );
}