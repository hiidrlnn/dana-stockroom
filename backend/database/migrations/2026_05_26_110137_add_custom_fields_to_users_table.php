<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::table('users', function (Blueprint $table) {
            // Menambahkan kolom jika belum ada
            if (!Schema::hasColumn('users', 'nama')) {
                $table->string('nama')->after('id');
            }
            if (!Schema::hasColumn('users', 'role')) {
                $table->string('role')->default('Kasir');
            }
            if (!Schema::hasColumn('users', 'status')) {
                $table->string('status')->default('Aktif');
            }
        });
    }

    public function down()
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn(['nama', 'role', 'status']);
        });
    }
};