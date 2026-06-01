<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Transaction;
use App\Models\TransactionDetail; // Pastikan model detail ada
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class TransactionController extends Controller
{
    public function index()
    {
        // Mengambil transaksi dengan relasi jika diperlukan
        $transactions = Transaction::latest()->take(10)->get();
        return response()->json($transactions, 200);
    }

    public function store(Request $request)
    {
        $request->validate([
            'customer_name' => 'required|string|max:255',
            'items' => 'required|array|min:1',
            'items.*.product_id' => 'required|exists:products,id',
            'items.*.quantity' => 'required|integer|min:1',
            'total' => 'required|numeric|min:0',
        ]);

        try {
            DB::beginTransaction();

            // 1. Simpan Transaksi Utama
            $invoiceNumber = 'INV-' . date('Ymd') . '-' . strtoupper(substr(uniqid(), -5));
            
            $transaction = Transaction::create([
                'invoice_number' => $invoiceNumber,
                'customer_name' => $request->customer_name,
                'total' => $request->total,
                'status' => 'Selesai'
            ]);

            // 2. Proses Items
            foreach ($request->items as $item) {
                $product = Product::lockForUpdate()->findOrFail($item['product_id']); // lockForUpdate mencegah race condition

                if ($product->stok < $item['quantity']) {
                    throw new \Exception("Stok {$product->nama} tidak cukup.");
                }

                // Kurangi stok
                $product->decrement('stok', $item['quantity']);

                // 3. Simpan Detail Transaksi (Opsional tapi disarankan)
                TransactionDetail::create([
                    'transaction_id' => $transaction->id,
                    'product_id' => $product->id,
                    'quantity' => $item['quantity'],
                    'price' => $product->harga_jual,
                ]);
            }

            DB::commit();

            return response()->json([
                'message' => 'Transaksi berhasil diproses',
                'invoice' => $invoiceNumber
            ], 201);

        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'message' => 'Gagal memproses transaksi', 
                'error' => $e->getMessage()
            ], 400);
        }
    }
}