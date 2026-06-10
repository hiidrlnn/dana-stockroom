<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\ValidationException;

class ProductController extends Controller
{
    public function index()
    {
        // Mengembalikan daftar produk (Accessor 'status' akan otomatis muncul di JSON)
        return response()->json(Product::latest()->get(), 200);
    }

    private function generateUniqueSku($kategori, $nama, $size)
    {
        $kat = strtoupper(substr($kategori, 0, 3));
        $nam = strtoupper(substr($nama, 0, 3));
        $sz  = $size;
        $random = mt_rand(1000, 9999);
        
        $sku = "{$kat}-{$nam}-{$sz}-{$random}";

        if (Product::where('sku', $sku)->exists()) {
            return $this->generateUniqueSku($kategori, $nama, $size);
        }

        return $sku;
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

            $validated['sku'] = $this->generateUniqueSku($validated['kategori'], $validated['nama'], $validated['size']);

            if ($request->hasFile('image')) {
                $validated['image'] = $request->file('image')->store('products', 'public');
            }

            // Status ditangani oleh Accessor di Model, tidak perlu set manual
            $product = Product::create($validated);
            
            return response()->json(['message' => 'Produk berhasil ditambahkan', 'data' => $product], 201);

        } catch (ValidationException $e) {
            return response()->json(['message' => 'Validasi gagal', 'errors' => $e->errors()], 422);
        } catch (\Exception $e) {
            Log::error('Error Store Product: ' . $e->getMessage());
            return response()->json(['message' => 'Terjadi kesalahan server', 'error' => $e->getMessage()], 500);
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

            $product->update($validated);

            return response()->json(['message' => 'Produk berhasil diupdate', 'data' => $product], 200);

        } catch (ValidationException $e) {
            return response()->json(['message' => 'Validasi gagal', 'errors' => $e->errors()], 422);
        } catch (\Exception $e) {
            Log::error('Error Update Product: ' . $e->getMessage());
            return response()->json(['message' => 'Terjadi kesalahan server', 'error' => $e->getMessage()], 500);
        }
    }

    public function destroy($id)
    {
        try {
            $product = Product::findOrFail($id);
            if ($product->image && Storage::disk('public')->exists($product->image)) {
                Storage::disk('public')->delete($product->image);
            }
            $product->delete();
            return response()->json(['message' => 'Produk berhasil dihapus'], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Gagal menghapus produk'], 500);
        }
    }
}