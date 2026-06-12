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
  mode = "produk",
  initialData,
}: {
  onClose: () => void;
  onSuccess: () => void;
  products: any[];
  mode?: "produk" | "jasa";
  initialData?: { name: string; price: number } | null;
}) {
  const isJasaMode = mode === "jasa";

  const [cart, setCart] = useState<any[]>(() => {
    if (initialData) {
      return [
        {
          nama: initialData.name,
          price: initialData.price,
          qty: 1,
          isJasa: true,
        },
      ];
    }
    return [];
  });

  const [step, setStep] = useState<"cart" | "payment">("cart");
  const [formData, setFormData] = useState({
    customer_name: "",
    payment_method: "cash",
    transfer_info: "",
  });

  const [uangMasuk, setUangMasuk] = useState(0);
  const [showReceipt, setShowReceipt] = useState(false);
  const [receiptData, setReceiptData] = useState<any>(null);

  const addToCart = (item: any) => {
    setCart((prev) => {
      const exist = prev.find((i) =>
        isJasaMode ? i.nama === item.nama : i.id === item.id,
      );
      if (exist) {
        if (!isJasaMode && exist.qty >= item.stok) {
          return prev;
        }
        return prev.map((i) =>
          (isJasaMode ? i.nama === item.nama : i.id === item.id)
            ? { ...i, qty: i.qty + 1 }
            : i,
        );
      }
      if (!isJasaMode && item.stok <= 0) {
        alert("Stok produk habis");
        return prev;
      }
      return [...prev, { ...item, qty: 1, isJasa: isJasaMode }];
    });
  };

  const totalHarga = cart.reduce(
    (acc, item) => acc + (item.harga_jual || item.price) * item.qty,
    0,
  );
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
        timestamp: now.toLocaleString("id-ID", {
          day: "numeric",
          month: "numeric",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }),
      });
      setShowReceipt(true);
    } catch (error: any) {
      alert(error.message || "Gagal melakukan transaksi");
    }
  };

  const handlePrint = () => window.print();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div
        className="
    w-full

    max-w-md
    sm:max-w-2xl
    lg:max-w-6xl

    max-h-[85vh]

    rounded-3xl

    bg-white
    dark:bg-[#0F172A]

    shadow-2xl

    overflow-hidden

    flex
    flex-col
    lg:flex-row
  "
      >
        <div
          className="
    w-full
    lg:w-1/2

    p-4
    sm:p-6

    overflow-y-auto
  "
        >
          <h2
            className="
    mb-4

    text-lg
    sm:text-xl

    font-bold

    dark:text-white
  "
          >
            {isJasaMode ? "Detail Layanan Jasa" : "Pilih Produk"}
          </h2>
          <div
            className="
            space-y-3
            max-h-[300px]
            sm:max-h-[400px]

            overflow-y-auto
          "
          >
            {(isJasaMode ? JASA_LIST : products).map((item) => (
              <div
                key={item.id ?? item.nama}
                className="flex justify-between items-center p-3 border rounded-xl dark:border-white/10"
              >
                <div>
                  <p className="font-semibold dark:text-white">
                    {item.nama || item.name}
                  </p>
                  <p className="text-sm text-gray-500">
                    Rp {(item.harga_jual || item.price).toLocaleString()}
                  </p>
                </div>
                <button
                  disabled={!isJasaMode && item.stok <= 0}
                  onClick={() => addToCart(item)}
                  className="
                  shrink-0
                  rounded-lg
                  bg-sky-500
                  px-3
                  sm:px-4
                  py-2
                  text-sm
                  text-white
                  transition
                  hover:bg-sky-600
                  disabled:bg-slate-400
                  disabled:cursor-not-allowed
                "
                >
                  {!isJasaMode && item.stok <= 0 ? "Habis" : "Tambah"}
                </button>
              </div>
            ))}
          </div>
        </div>

        <div
          className="
    w-full
    lg:w-1/2
    p-4
    sm:p-6
    overflow-y-auto
  "
        >
          <div>
            <h2
              className="
    mb-4

    text-lg
    sm:text-xl

    font-bold

    dark:text-white
  "
            >
              {step === "cart" ? "Keranjang & Pembayaran" : "Detail Pembayaran"}
            </h2>
            {step === "cart" ? (
              <div
                className="
              mb-6

              rounded-2xl

              border
              border-gray-200

              p-3

              dark:border-white/10

              space-y-2

              max-h-[220px]

              overflow-y-auto
            "
              >
                {cart.length === 0 && (
                  <p className="text-gray-400 text-sm">Keranjang kosong...</p>
                )}
                {cart.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex justify-between dark:text-gray-300 text-sm"
                  >
                    <span>
                      {item.nama || item.name} (x{item.qty})
                    </span>
                    <span>
                      Rp{" "}
                      {(
                        (item.harga_jual || item.price) * item.qty
                      ).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                <select
                  value={formData.payment_method}
                  className="
      w-full
      rounded-xl
      border
      border-gray-200
      p-3

      dark:border-white/10
      dark:bg-slate-800
      dark:text-white
    "
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      payment_method: e.target.value,
                    })
                  }
                >
                  <option value="cash">Cash</option>
                  <option value="qris">QRIS</option>
                  <option value="transfer">Transfer</option>
                </select>

                <input
                  value={formData.customer_name}
                  placeholder="Nama Customer"
                  className="
      w-full
      rounded-xl
      border
      border-gray-200
      p-3

      dark:border-white/10
      dark:bg-slate-800
      dark:text-white
    "
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      customer_name: e.target.value,
                    })
                  }
                />

                {formData.payment_method === "transfer" && (
                  <input
                    value={formData.transfer_info}
                    placeholder="Nomor Referensi Transfer"
                    className="
        w-full
        rounded-xl
        border
        border-gray-200
        p-3

        dark:border-white/10
        dark:bg-slate-800
        dark:text-white
      "
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        transfer_info: e.target.value,
                      })
                    }
                  />
                )}
              </div>
            )}
            <p className="font-bold text-lg dark:text-white">
              Total: Rp {totalHarga.toLocaleString()}
            </p>

            {step === "payment" && (
              <div className="border-t pt-4 space-y-3 dark:border-white/10">
                <input
                  type="number"
                  placeholder="Masukkan Nominal Uang"
                  className="w-full p-3 rounded-lg border dark:bg-slate-800 dark:border-none dark:text-white focus:ring-2 focus:ring-sky-500 outline-none"
                  onChange={(e) => setUangMasuk(Number(e.target.value))}
                />

                <p className="font-semibold dark:text-gray-300">
                  Kembalian: Rp{" "}
                  {kembalian >= 0 ? kembalian.toLocaleString() : 0}
                </p>

                {uangMasuk > 0 && uangMasuk < totalHarga && (
                  <p className="text-sm text-red-500">
                    Nominal pembayaran kurang
                  </p>
                )}
              </div>
            )}
          </div>
          <div
            className="
              mt-6

              flex
              flex-col
              sm:flex-row

              gap-3
            "
          >
            <button
              onClick={step === "payment" ? () => setStep("cart") : onClose}
              className="
                w-full
                sm:flex-1

                rounded-xl

                bg-slate-200
                dark:bg-slate-700

                py-3

                font-semibold

                text-slate-700
                dark:text-white

                transition

                hover:bg-slate-300
                dark:hover:bg-slate-600
              "
            >
              {step === "payment" ? "Kembali" : "Batal"}
            </button>
            <button
              onClick={
                step === "cart" ? () => setStep("payment") : handleSubmit
              }
              disabled={
                cart.length === 0 ||
                (step === "payment" && uangMasuk < totalHarga)
              }
              className="
                  w-full
                  sm:flex-1

                  rounded-xl

                  bg-sky-500

                  py-3

                  font-semibold
                  text-white

                  transition

                  hover:bg-sky-600

                  disabled:bg-slate-500
                  disabled:cursor-not-allowed
                "
            >
              {step === "cart" ? "Lanjut Pembayaran" : "Bayar Sekarang"}
            </button>
          </div>
        </div>
      </div>

      {showReceipt && receiptData && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/70 p-4">
          <div
            className="
            w-full

            max-w-[300px]
            sm:max-w-[340px]

            max-h-[80vh]

            overflow-y-auto

            rounded-2xl

            bg-[#0F172A]

            p-4

            text-white
          "
          >
            <div className="text-center mb-6">
              <h2 className="text-lg font-bold">DANA STOCKROOM</h2>

              <p className="text-[11px] text-gray-400">
                Premium Sneakers Store
              </p>

              <p className="mt-2 text-[10px] leading-relaxed text-gray-400">
                Jl. Raya Cirendang, Cirendang, Kec. Kuningan,
                <br />
                Kabupaten Kuningan, Jawa Barat 45518
                <br />
                0851-7965-8320
              </p>
            </div>
            <hr className="border-dashed border-gray-600 mb-4" />
            <div className="text-xs sm:text-sm space-y-2 mb-4">
              <div className="flex justify-between">
                <span className="text-gray-400">Invoice</span>{" "}
                <span>{receiptData.invoice}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Customer</span>{" "}
                <span>{receiptData.customer_name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Kasir</span>{" "}
                <span>Kasir Utama</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Tanggal</span>{" "}
                <span>{receiptData.timestamp}</span>
              </div>
            </div>
            <hr className="border-dashed border-gray-600 mb-4" />
            <div className="mb-4">
              <p className="font-semibold text-sm mb-2">Detail Item</p>
              {receiptData.items.map((item: any, idx: number) => (
                <div key={idx} className="space-y-1 mb-3">
                  <p className="text-sm">{item.nama || item.name}</p>
                  {/* Menambahkan tampilan SKU */}
                  {item.sku && (
                    <p className="text-[11px] text-gray-500">SKU: {item.sku}</p>
                  )}
                  <div className="flex justify-between text-[11px] text-gray-400">
                    <span>x{item.qty}</span>
                    <span>
                      Subtotal Rp{" "}
                      {(
                        (item.harga_jual || item.price) * item.qty
                      ).toLocaleString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <hr className="border-dashed border-gray-600 mb-4" />
            <div className="flex justify-between">
              <span className="text-gray-400">Total</span>
              <span>Rp {receiptData.total.toLocaleString()}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-400">Bayar</span>
              <span>Rp {receiptData.uangMasuk.toLocaleString()}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-400">Kembalian</span>
              <span>Rp {receiptData.kembalian.toLocaleString()}</span>
            </div>
            <div className="text-[12px] space-y-1.5 mb-4">
              <div className="flex justify-between">
                <span className="text-gray-400">Metode</span>{" "}
                <span>{receiptData.payment_method.toUpperCase()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Status</span>{" "}
                <span className="font-semibold text-green-400">Selesai</span>
              </div>
            </div>
            <hr className="border-dashed border-gray-600 mb-4" />
            <div className="text-center text-sm text-gray-400">
              Terima kasih telah berbelanja
            </div>
            <div className="mt-4 flex gap-2">
              <button
                onClick={handlePrint}
                className="
                  flex-1
                  rounded-lg
                  bg-green-600
                  py-2

                  text-sm
                  font-semibold
                  text-white
                "
              >
                Print
              </button>
              <button
                onClick={() => {
                  setShowReceipt(false);
                  onSuccess();
                  onClose();
                }}
                className="
                  flex-1
                  rounded-lg
                  bg-gray-600
                  py-2

                  text-sm
                  font-semibold
                  text-white
                "
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
