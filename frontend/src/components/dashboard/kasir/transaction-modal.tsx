"use client";

import { useState } from "react";

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
  
  const [cart, setCart] = useState<any[]>(() => {
    if (initialData) {
      return [{ nama: initialData.name, price: initialData.price, qty: 1, isJasa: true }];
    }
    return [];
  });
  
  const [step, setStep] = useState<'cart' | 'payment'>('cart');
  const [formData, setFormData] = useState({ 
    customer_name: 'Pelanggan Umum', 
    payment_method: 'cash', 
    transfer_info: '' 
  });
  
  const [uangMasuk, setUangMasuk] = useState(0);
  const [showReceipt, setShowReceipt] = useState(false);
  const [receiptData, setReceiptData] = useState<any>(null);

  const addToCart = (item: any) => {
    setCart((prev) => {
      const exist = prev.find((i) => (isJasaMode ? i.nama === item.nama : i.id === item.id));
      if (exist) {
        return prev.map(i => (isJasaMode ? i.nama === item.nama : i.id === item.id) ? { ...i, qty: i.qty + 1 } : i);
      }
      return [...prev, { ...item, qty: 1, isJasa: isJasaMode }];
    });
  };

  const totalHarga = cart.reduce((acc, item) => acc + (item.harga_jual || item.price) * item.qty, 0);
  const kembalian = uangMasuk - totalHarga;

  const handleSubmit = async () => {
    if (uangMasuk < totalHarga) {
      alert("Nominal pembayaran kurang dari total harga");
      return;
    }

    try {
      const items = cart.map((item) => ({
        product_id: isJasaMode ? null : item.id,
        jasa_name: isJasaMode ? item.nama || item.name : null,
        quantity: item.qty,
        price: item.harga_jual || item.price,
      }));

      const res = await fetch("http://127.0.0.1:8000/api/transactions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          total: totalHarga,
          items,
          type: isJasaMode ? "jasa" : "produk",
          customer_name: formData.customer_name,
          payment_method: formData.payment_method,
          transfer_info: formData.transfer_info,
        }),
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.message);

      const now = new Date();
      setReceiptData({ 
        invoice: result.invoice, 
        items: cart, 
        total: totalHarga, 
        uangMasuk, 
        kembalian,
        customer_name: formData.customer_name,
        payment_method: formData.payment_method,
        timestamp: now.toLocaleString('id-ID', { 
            day: 'numeric', 
            month: 'numeric', 
            year: 'numeric', 
            hour: '2-digit', 
            minute: '2-digit',
            second: '2-digit' 
        })
      });
      setShowReceipt(true);
    } catch (error: any) {
      alert(error.message || "Gagal melakukan transaksi");
    }
  };

  const handlePrint = () => window.print();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className="bg-white dark:bg-[#0F172A] w-full max-w-4xl h-[80vh] rounded-3xl flex overflow-hidden shadow-2xl">
        <div className="w-1/2 p-6 overflow-y-auto border-r dark:border-white/10">
          <h2 className="text-xl font-bold mb-4 dark:text-white">{isJasaMode ? "Detail Layanan Jasa" : "Pilih Produk"}</h2>
          <div className="space-y-3">
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

        <div className="w-1/2 p-6 flex flex-col justify-between">
          <div>
            <h2 className="text-xl font-bold mb-4 dark:text-white">{step === 'cart' ? "Keranjang & Pembayaran" : "Detail Pembayaran"}</h2>
            {step === 'cart' ? (
              <div className="space-y-2 mb-6 max-h-[40vh] overflow-y-auto">
                {cart.length === 0 && <p className="text-gray-400 text-sm">Keranjang kosong...</p>}
                {cart.map((item, idx) => (
                  <div key={idx} className="flex justify-between dark:text-gray-300 text-sm">
                    <span>{item.nama || item.name} (x{item.qty})</span>
                    <span>Rp {((item.harga_jual || item.price) * item.qty).toLocaleString()}</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                <select className="w-full p-3 rounded-lg border dark:bg-slate-800 dark:border-none dark:text-white" onChange={(e) => setFormData({...formData, payment_method: e.target.value})}>
                  <option value="cash">Cash</option>
                  <option value="qris">QRIS</option>
                  <option value="transfer">Transfer</option>
                </select>
                <input placeholder="Nama Customer" className="w-full p-3 rounded-lg border dark:bg-slate-800 dark:border-none dark:text-white" onChange={(e) => setFormData({...formData, customer_name: e.target.value})} />
                <input placeholder="Info Transfer / Ref" className="w-full p-3 rounded-lg border dark:bg-slate-800 dark:border-none dark:text-white" onChange={(e) => setFormData({...formData, transfer_info: e.target.value})} />
              </div>
            )}
            <div className="border-t pt-4 space-y-3 dark:border-white/10">
              <p className="font-bold text-lg dark:text-white">Total: Rp {totalHarga.toLocaleString()}</p>
              <input type="number" placeholder="Masukkan Nominal Uang" className="w-full p-3 rounded-lg border dark:bg-slate-800 dark:border-none dark:text-white focus:ring-2 focus:ring-sky-500 outline-none" onChange={(e) => setUangMasuk(Number(e.target.value))} />
              <p className="font-semibold dark:text-gray-300">Kembalian: Rp {kembalian >= 0 ? kembalian.toLocaleString() : 0}</p>
            </div>
          </div>
          <div className="flex gap-3 mt-6">
            <button onClick={step === 'payment' ? () => setStep('cart') : onClose} className="flex-1 py-3 rounded-xl bg-gray-200 dark:bg-slate-700 dark:text-white hover:bg-gray-300 dark:hover:bg-slate-600">{step === 'payment' ? "Kembali" : "Batal"}</button>
            <button onClick={step === 'cart' ? () => setStep('payment') : handleSubmit} disabled={cart.length === 0 || kembalian < 0} className="flex-1 py-3 rounded-xl bg-blue-600 text-white disabled:bg-gray-400 hover:bg-blue-700 transition">{step === 'cart' ? "Lanjut Pembayaran" : "Bayar Sekarang"}</button>
          </div>
        </div>
      </div>

      {showReceipt && receiptData && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/70 p-4">
          <div className="w-full max-w-sm rounded-2xl bg-[#0F172A] p-6 text-white shadow-xl border border-white/10">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold">DANA STOCKROOM</h2>
              <p className="text-sm text-gray-400">Premium Sneakers Store</p>
            </div>
            <hr className="border-dashed border-gray-600 mb-4" />
            <div className="text-sm space-y-2 mb-6">
              <div className="flex justify-between"><span className="text-gray-400">Invoice</span> <span>{receiptData.invoice}</span></div>
              <div className="flex justify-between"><span className="text-gray-400">Customer</span> <span>{receiptData.customer_name}</span></div>
              <div className="flex justify-between"><span className="text-gray-400">Kasir</span> <span>Kasir Utama</span></div>
              <div className="flex justify-between"><span className="text-gray-400">Tanggal</span> <span>{receiptData.timestamp}</span></div>
            </div>
            <hr className="border-dashed border-gray-600 mb-4" />
            <div className="mb-6">
              <p className="font-bold mb-2">Detail Item</p>
              {receiptData.items.map((item: any, idx: number) => (
                <div key={idx} className="space-y-1 mb-3">
                  <p>{item.nama || item.name}</p>
                  {/* Menambahkan tampilan SKU */}
                  {item.sku && <p className="text-xs text-gray-500">SKU: {item.sku}</p>}
                  <div className="flex justify-between text-sm text-gray-400">
                    <span>x{item.qty}</span>
                    <span>Subtotal Rp {( (item.harga_jual || item.price) * item.qty).toLocaleString()}</span>
                  </div>
                </div>
              ))}
            </div>
            <hr className="border-dashed border-gray-600 mb-4" />
            <div className="text-sm space-y-2 mb-6">
              <div className="flex justify-between"><span className="text-gray-400">Metode</span> <span>{receiptData.payment_method.toUpperCase()}</span></div>
              <div className="flex justify-between"><span className="text-gray-400">Status</span> <span className="font-semibold text-green-400">Selesai</span></div>
            </div>
            <hr className="border-dashed border-gray-600 mb-4" />
            <div className="text-center text-sm text-gray-400">Terima kasih telah berbelanja 🙏</div>
            <div className="mt-6 flex gap-2">
              <button onClick={handlePrint} className="flex-1 rounded-lg bg-green-600 py-2 text-white font-semibold">Print</button>
              <button onClick={() => { setShowReceipt(false); onSuccess(); onClose(); }} className="flex-1 rounded-lg bg-gray-600 py-2 text-white font-semibold">Tutup</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}