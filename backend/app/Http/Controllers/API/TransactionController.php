<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Transaction;
use App\Models\TransactionDetail;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class TransactionController extends Controller
{
    public function index()
{
    return Transaction::with([
        'details.product'
    ])
    ->latest()
    ->get();
}

    public function store(Request $request)
    {
        // Validasi diperbarui: menambahkan jasa_name sebagai opsional
        $request->validate([
            'customer_name' => 'nullable|string|max:255',
            'items' => 'required|array|min:1',
            'items.*.product_id' => 'nullable|exists:products,id',
            'items.*.jasa_name' => 'nullable|string|max:255', // Validasi untuk jasa_name
            'items.*.quantity' => 'required|integer|min:1',
            'items.*.price' => 'required|numeric',
            'type' => 'required|in:produk,jasa',
            'total' => 'required|numeric|min:0',
        ]);

        try {
            DB::beginTransaction();

            $invoiceNumber = 'INV-' . date('Ymd') . '-' . strtoupper(substr(uniqid(), -5));
            
            // 1. Simpan Transaksi Utama
            $transaction = Transaction::create([
                'invoice_number' => $invoiceNumber,
                'customer_name'  => $request->customer_name ?? 'Umum',
                'total'          => $request->total,
                'type'           => $request->type,
                'status'         => 'Selesai'
            ]);

            // 2. Proses Items
            foreach ($request->items as $item) {
                // Jika produk, cek stok dan kurangi
                if (!empty($item['product_id'])) {
                    $product = Product::lockForUpdate()->findOrFail($item['product_id']);

                    if ($product->stok < $item['quantity']) {
                        throw new \Exception("Stok {$product->nama} tidak cukup.");
                    }

                    $product->decrement('stok', $item['quantity']);
                }

                // 3. Simpan Detail Transaksi
                TransactionDetail::create([
                    'transaction_id' => $transaction->id,
                    'product_id'     => $item['product_id'] ?? null,
                    'jasa_name'      => $item['jasa_name'] ?? null, 
                    'quantity'       => $item['quantity'],
                    'price'          => $item['price'],
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

public function show($id)
{
    $transaction = Transaction::with([
        'details.product'
    ])->find($id);

    if (!$transaction) {
        return response()->json([
            'message' => 'Transaksi tidak ditemukan'
        ], 404);
    }

    return response()->json($transaction);
}

public function destroy($id)
{
    DB::beginTransaction();

    try {

        $transaction = Transaction::with('details')
            ->findOrFail($id);

        foreach ($transaction->details as $detail) {

            if ($detail->product_id) {

                Product::where(
                    'id',
                    $detail->product_id
                )->increment(
                    'stok',
                    $detail->quantity
                );
            }
        }

        $transaction->details()->delete();

        $transaction->delete();

        DB::commit();

        return response()->json([
            'message' => 'Transaksi berhasil dihapus'
        ]);

    } catch (\Exception $e) {

        DB::rollBack();

        return response()->json([
            'message' => 'Gagal menghapus transaksi',
            'error' => $e->getMessage()
        ], 500);
    }
}
}