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
        Schema::create('transactions', function (Blueprint $table) {
            $table->id();
            $table->string('invoice_number')->unique(); // Untuk nomor unik transaksi
            $table->string('customer_name');            // Nama pelanggan
            $table->decimal('total', 15, 2);           // Total harga (15 digit, 2 desimal)
            $table->string('status')->default('Selesai'); // Status transaksi
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('transactions');
    }
};