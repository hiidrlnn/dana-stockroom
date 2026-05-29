<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $table = 'products';

    // Daftarkan semua field agar diizinkan menggunakan metode Mass Assignment (create/update)
    protected $fillable = [
        'nama',
        'kategori',
        'size',
        'harga_beli', // Tambahkan ini agar modal tersimpan ke database
        'harga_jual', // Tambahkan ini agar harga jual tersimpan ke database
        'harga',      // Tetap pertahankan ini untuk kolom utama database kamu
        'stok',
        'image'
    ];

    // Menambahkan custom attribute 'status' secara otomatis pada response JSON
    protected $appends = ['status'];

    /**
     * Accessor untuk mendapatkan status produk berdasarkan jumlah stok.
     * Otomatis dipanggil saat data dikonversi ke JSON di frontend.
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