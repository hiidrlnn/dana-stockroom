<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\API\ProductController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Di sini adalah tempat di mana Anda dapat mendaftarkan rute API untuk aplikasi Anda.
| Rute-rute ini dimuat oleh RouteServiceProvider dan semuanya akan
| diberikan ke grup middleware "api".
|
*/

// Endpoint untuk mengambil data user yang sedang login (Menggunakan Sanctum)
Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

// Endpoint Autentikasi (Public - Tidak butuh token untuk diakses)
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// Endpoint yang Dilindungi oleh Sanctum (Wajib menyertakan Bearer Token)
Route::middleware('auth:sanctum')->group(function () {
    
    /**
     * Menggunakan apiResource jauh lebih bersih dan otomatis membuat rute:
     * - GET    /api/products          -> index
     * - POST   /api/products          -> store
     * - GET    /api/products/{product} -> show (jika nanti dibutuhkan)
     * - PUT    /api/products/{product} -> update
     * - DELETE /api/products/{product} -> destroy
     */
    Route::apiResource('products', ProductController::class)->parameters([
        'products' => 'id' // Memastikan parameter URL yang dibaca Controller tetap bernama '{id}' sesuai isi ProductController kamu
    ]);
    
});