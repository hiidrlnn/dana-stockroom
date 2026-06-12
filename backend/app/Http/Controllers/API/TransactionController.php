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
        $transactions = Transaction::with(['details.product'])
            ->latest()
            ->get()
            ->map(function ($transaction) {
                return [
                    'id'             => $transaction->id,
                    'invoice_number' => $transaction->invoice_number,
                    'customer_name'  => $transaction->customer_name,
                    'total'          => $transaction->total,
                    'status'         => $transaction->status,
                    'type'           => $transaction->type,
                    'payment_method' => $transaction->payment_method,
                    'created_at'     => $transaction->created_at,
                    'items'          => $transaction->details->map(function ($detail) {
                        return [
                            'sku'   => $detail->product ? $detail->product->sku : '-',
                            'nama'  => $detail->product ? $detail->product->nama : $detail->jasa_name,
                            'qty'   => $detail->quantity,
                            'harga' => $detail->price,
                        ];
                    }),
                ];
            });

        return response()->json($transactions);
    }

    public function store(Request $request)
    {
        $request->validate([
            'customer_name'  => 'nullable|string|max:255',
            'items'          => 'required|array|min:1',
            'items.*.product_id' => 'nullable|exists:products,id',
            'items.*.jasa_name'  => 'nullable|string|max:255',
            'items.*.quantity'   => 'required|integer|min:1',
            'items.*.price'      => 'required|numeric',
            'type'           => 'required|in:produk,jasa',
            'total'          => 'required|numeric|min:0',
            'payment_method' => 'required|in:cash,qris,transfer',
            'transfer_info'  => 'nullable|string|max:255',
        ]);

        try {
            DB::beginTransaction();

            $invoiceNumber = 'INV-' . date('Ymd') . '-' . strtoupper(substr(uniqid(), -5));
            
            $transaction = Transaction::create([
                'invoice_number' => $invoiceNumber,
                'customer_name'  => $request->customer_name ?? 'Umum',
                'total'          => $request->total,
                'type'           => $request->type,
                'payment_method' => $request->payment_method,
                'transfer_info'  => $request->transfer_info,
                'status'         => 'Selesai'
            ]);

            foreach ($request->items as $item) {
                if (!empty($item['product_id'])) {
                    $product = Product::lockForUpdate()->findOrFail($item['product_id']);

                    if ($product->stok < $item['quantity']) {
                        throw new \Exception("Stok {$product->nama} tidak cukup.");
                    }

                    $product->decrement('stok', $item['quantity']);
                }

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
        $transaction = Transaction::with(['details.product'])->find($id);

        if (!$transaction) {
            return response()->json(['message' => 'Transaksi tidak ditemukan'], 404);
        }

        return response()->json([
            'id'             => $transaction->id,
            'invoice_number' => $transaction->invoice_number,
            'customer_name'  => $transaction->customer_name,
            'total'          => $transaction->total,
            'status'         => $transaction->status,
            'payment_method' => $transaction->payment_method,
            'created_at'     => $transaction->created_at,
            'items'          => $transaction->details->map(function ($detail) {
                return [
                    'sku'   => $detail->product ? $detail->product->sku : '-',
                    'nama'  => $detail->product ? $detail->product->nama : $detail->jasa_name,
                    'qty'   => $detail->quantity,
                    'harga' => $detail->price,
                ];
            }),
        ]);
    }

    public function destroy($id)
    {
        DB::beginTransaction();
        try {
            $transaction = Transaction::with('details')->findOrFail($id);

            foreach ($transaction->details as $detail) {
                if ($detail->product_id) {
                    Product::where('id', $detail->product_id)->increment('stok', $detail->quantity);
                }
            }

            $transaction->details()->delete();
            $transaction->delete();

            DB::commit();
            return response()->json(['message' => 'Transaksi berhasil dihapus']);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['message' => 'Gagal menghapus transaksi', 'error' => $e->getMessage()], 500);
        }
    }
    public function salesReport()
{
    $transactions = Transaction::with(['details.product'])
        ->latest()
        ->get();

    return response()->json([
        'summary' => [
            'pendapatan' => (int) $transactions
                ->where('status', 'Selesai')
                ->sum('total'),

            'transaksi' => $transactions->count(),

            'pending' => $transactions
                ->where('status', 'Pending')
                ->count(),

            'dibatalkan' => $transactions
                ->where('status', 'Dibatalkan')
                ->count(),
        ],

        'reports' => $transactions->map(function ($transaction) {
            return [
                'id' => $transaction->id,
                'invoice_number' => $transaction->invoice_number,
                'customer_name' => $transaction->customer_name,
                'total' => (int) $transaction->total,
                'status' => $transaction->status,
                'payment_method' => $transaction->payment_method,
                'created_at' => $transaction->created_at,

                'items' => $transaction->details->map(function ($detail) {
                    return [
                        'sku' => $detail->product
                            ? $detail->product->sku
                            : '-',

                        'nama' => $detail->product
                            ? $detail->product->nama
                            : $detail->jasa_name,

                        'qty' => (int) $detail->quantity,
                        'harga' => (int) $detail->price,
                    ];
                }),
            ];
        }),
    ]);
}
}