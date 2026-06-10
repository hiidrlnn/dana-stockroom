<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Transaction extends Model
{
    use HasFactory;

    /**
     * Mengizinkan kolom-kolom ini untuk diisi (mass assignment)
     * Ditambahkan kolom 'type', 'payment_method', dan 'transfer_info'
     */
    protected $fillable = [
        'invoice_number', 
        'customer_name', 
        'total', 
        'status',
        'type',           // untuk 'produk' atau 'jasa'
        'payment_method', // untuk 'cash', 'qris', atau 'transfer'
        'transfer_info'   // untuk nomor referensi atau nama pengirim
    ];

    /**
     * Mendefinisikan relasi ke TransactionDetail
     */
    public function details(): HasMany
    {
        return $this->hasMany(TransactionDetail::class, 'transaction_id');
    }
}