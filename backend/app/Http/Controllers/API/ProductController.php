<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Log; // Tambahkan ini untuk debugging

class ProductController extends Controller
{
    public function index()
    {
        return response()->json(Product::latest()->get(), 200);
    }

    public function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'nama' => 'required|string|max:255',
                'kategori' => 'required|string|max:255',
                'size' => 'required|string',
                'harga_beli' => 'required|numeric',
                'harga_jual' => 'required|numeric',
                'stok' => 'required|integer',
                'image' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048',
            ]);

            if ($request->hasFile('image')) {
                $validated['image'] = $request->file('image')->store('products', 'public');
            }

            // MAPPING FIELD: Pastikan kolom 'harga' ada di database
            $validated['harga'] = $request->harga_jual; 
            // Pastikan field 'status' ada atau set default
            $validated['status'] = $request->status ?? 'active'; 

            $product = Product::create($validated);
            return response()->json($product, 201);

        } catch (\Exception $e) {
            Log::error('Error Store Product: ' . $e->getMessage());
            return response()->json(['message' => 'Gagal simpan produk', 'error' => $e->getMessage()], 500);
        }
    }

    public function update(Request $request, $id)
    {
        try {
            $product = Product::findOrFail($id);

            $validated = $request->validate([
                'nama' => 'required|string|max:255',
                'kategori' => 'required|string|max:255',
                'size' => 'required|string',
                'harga_beli' => 'required|numeric',
                'harga_jual' => 'required|numeric',
                'stok' => 'required|integer',
                'image' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048',
            ]);

            if ($request->hasFile('image')) {
                if ($product->image && Storage::disk('public')->exists($product->image)) {
                    Storage::disk('public')->delete($product->image);
                }
                $validated['image'] = $request->file('image')->store('products', 'public');
            }

            $validated['harga'] = $request->harga_jual;
            $product->update($validated);

            return response()->json($product, 200);

        } catch (\Exception $e) {
            Log::error('Error Update Product: ' . $e->getMessage());
            return response()->json(['message' => 'Gagal update produk', 'error' => $e->getMessage()], 500);
        }
    }

    public function destroy($id)
    {
        $product = Product::findOrFail($id);
        if ($product->image && Storage::disk('public')->exists($product->image)) {
            Storage::disk('public')->delete($product->image);
        }
        $product->delete();
        return response()->json(['message' => 'Produk berhasil dihapus'], 200);
    }
}