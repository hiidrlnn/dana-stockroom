<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Transaction extends Model
{
    // Mengizinkan kolom-kolom ini untuk diisi (mass assignment)
    protected $fillable = [
        'invoice_number', 
        'customer_name', 
        'total', 
        'status'
    ];
}