<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\Transaction;
use Carbon\Carbon;

class DashboardController extends Controller
{
    public function index()
    {
        /*
        |--------------------------------------------------------------------------
        | CARD STATISTIK
        |--------------------------------------------------------------------------
        */

        $totalPenjualan = (float) Transaction::sum('total');

        $totalStok = (int) Product::sum('stok');

        $totalTransaksi = (int) Transaction::count();

        $totalRestock = (int) Product::where('stok', '<=', 5)->count();

        /*
        |--------------------------------------------------------------------------
        | TRANSAKSI TERBARU
        |--------------------------------------------------------------------------
        */

        $latestTransactions = Transaction::orderByDesc('created_at')
            ->take(5)
            ->get([
                'id',
                'invoice_number',
                'customer_name',
                'total',
                'status',
                'created_at'
            ]);

        /*
        |--------------------------------------------------------------------------
        | GRAFIK BULANAN
        |--------------------------------------------------------------------------
        */

        $monthlySales = [];
        $monthlyLabels = [];

        for ($month = 1; $month <= 12; $month++) {

            $monthlyLabels[] = Carbon::create()
                ->month($month)
                ->locale('id')
                ->translatedFormat('M');

            $monthlySales[] = (float) Transaction::whereYear(
                'created_at',
                now()->year
            )
            ->whereMonth(
                'created_at',
                $month
            )
            ->sum('total');
        }

        /*
        |--------------------------------------------------------------------------
        | GRAFIK MINGGUAN (7 HARI TERAKHIR)
        |--------------------------------------------------------------------------
        */

        $weeklySales = [];
        $weeklyLabels = [];

        for ($day = 6; $day >= 0; $day--) {

            $date = Carbon::now()->subDays($day);

            $weeklyLabels[] = $date
                ->locale('id')
                ->translatedFormat('D');

            $weeklySales[] = (float) Transaction::whereDate(
                'created_at',
                $date->toDateString()
            )->sum('total');
        }

        /*
        |--------------------------------------------------------------------------
        | RESPONSE
        |--------------------------------------------------------------------------
        */

        return response()->json([
            'success' => true,

            'penjualan' => $totalPenjualan,
            'stok_produk' => $totalStok,
            'transaksi' => $totalTransaksi,
            'restock' => $totalRestock,

            'monthly_labels' => $monthlyLabels,
            'monthly_sales' => $monthlySales,

            'weekly_labels' => $weeklyLabels,
            'weekly_sales' => $weeklySales,

            'payments_chart' => [
                'received' => $monthlySales,
                'due' => array_fill(0, 12, 0),
            ],

            'profit_chart' => [
                'sales' => $weeklySales,
                'revenue' => $weeklySales,
            ],

            'latest_transactions' => $latestTransactions,
        ]);
    }
}