<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('nama');
            $table->string('kategori');
            $table->string('size');
            
            // PERBAIKAN: Memecah 'harga' menjadi 'harga_beli' dan 'harga_jual'
            $table->decimal('harga_beli', 12, 2);
            $table->decimal('harga_jual', 12, 2);
            
            $table->integer('stok');
            $table->string('image')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};