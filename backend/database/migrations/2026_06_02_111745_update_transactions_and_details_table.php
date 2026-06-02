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
        // Update tabel transactions untuk menambahkan kolom 'type'
        Schema::table('transactions', function (Blueprint $table) {
            $table->string('type')->default('produk')->after('total');
        });

        // Update tabel transaction_details untuk menambahkan kolom 'jasa_name'
        // dan membuat product_id menjadi nullable agar jasa bisa diproses
        Schema::table('transaction_details', function (Blueprint $table) {
            $table->unsignedBigInteger('product_id')->nullable()->change();
            $table->string('jasa_name')->nullable()->after('product_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('transactions', function (Blueprint $table) {
            $table->dropColumn('type');
        });

        Schema::table('transaction_details', function (Blueprint $table) {
            $table->dropColumn('jasa_name');
            // Jika Anda ingin mengembalikan product_id ke kondisi semula (non-nullable)
            // $table->unsignedBigInteger('product_id')->nullable(false)->change();
        });
    }
};