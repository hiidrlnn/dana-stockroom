<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $table = 'products';

    // Mendefinisikan tipe data kolom untuk memastikan data API konsisten
    protected $casts = [
        'harga_beli' => 'integer',
        'harga_jual' => 'integer',
        'stok'       => 'integer',
    ];

    protected $fillable = [
        'sku',
        'nama',
        'kategori',
        'size',
        'harga_beli',
        'harga_jual',
        'stok',
        'image'
    ];

    // Menambahkan custom attribute 'status' pada response JSON secara otomatis
    protected $appends = ['status'];

    /**
     * Relasi ke TransactionDetail agar data produk bisa diakses dari transaksi
     */
    public function details()
    {
        return $this->hasMany(TransactionDetail::class, 'product_id');
    }

    /**
     * Accessor untuk mendapatkan status produk berdasarkan jumlah stok.
     */
    public function getStatusAttribute()
    {
        if ($this->stok <= 0) {
            return 'Habis';
        }
        
        if ($this->stok <= 5) {
            return 'Stok Menipis';
        }
        
        return 'Tersedia';
    }
}