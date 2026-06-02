<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class TransactionDetail extends Model
{
    /**
     * Mengizinkan kolom-kolom ini untuk diisi (mass assignment).
     * Kolom 'jasa_name' ditambahkan agar bisa diisi saat transaksi berupa jasa.
     */
    protected $fillable = [
        'transaction_id',
        'product_id',
        'jasa_name', // Menambahkan ini sangat penting
        'quantity',
        'price',
    ];

    /**
     * Relasi ke Transaction (satu detail milik satu transaksi)
     */
    public function transaction(): BelongsTo
    {
        return $this->belongsTo(Transaction::class, 'transaction_id');
    }

    /**
     * Relasi ke Product.
     * Catatan: Karena product_id sekarang bisa NULL (untuk jasa), 
     * relasi ini akan mengembalikan null jika transaksi adalah jasa.
     */
    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class, 'product_id');
    }
}