<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('transaction_details', function (Blueprint $table) {
            $table->id();
            
            // Relasi ke tabel transactions
            $table->foreignId('transaction_id')->constrained('transactions')->onDelete('cascade');
            
            // Relasi ke tabel products
            $table->foreignId('product_id')->constrained('products')->onDelete('cascade');
            
            // Data transaksi detail
            $table->integer('quantity');
            $table->decimal('price', 15, 2); // Menggunakan decimal untuk presisi harga
            
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('transaction_details');
    }
};