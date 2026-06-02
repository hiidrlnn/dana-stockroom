<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Transaction extends Model
{
    /**
     * Mengizinkan kolom-kolom ini untuk diisi (mass assignment)
     * Ditambahkan kolom 'type' untuk membedakan Produk/Jasa
     */
    protected $fillable = [
        'invoice_number', 
        'customer_name', 
        'total', 
        'status',
        'type' // Tambahkan ini agar bisa menyimpan 'produk' atau 'jasa'
    ];

    /**
     * Mendefinisikan relasi ke TransactionDetail
     * Ini akan memperbaiki error "Call to undefined relationship [details]"
     */
    public function details(): HasMany
    {
        return $this->hasMany(TransactionDetail::class, 'transaction_id');
    }
}