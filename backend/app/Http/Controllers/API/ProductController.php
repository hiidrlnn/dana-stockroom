<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage; // Wajib di-import untuk handle hapus/simpan file

class ProductController extends Controller
{
    public function index()
    {
        $products = Product::latest()->get();
        return response()->json($products, 200);
    }

    public function store(Request $request)
    {
        // 1. Validasi request dari Next.js
        $validated = $request->validate([
            'nama' => 'required|string|max:255',
            'kategori' => 'required|string|max:255',
            'size' => 'required|string',
            'harga_beli' => 'required|numeric|min:0',
            'harga_jual' => 'required|numeric|min:0',
            'stok' => 'required|integer|min:0',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048', 
        ]);

        // 2. Handle upload gambar jika ada file yang dikirim
        if ($request->hasFile('image')) {
            // Menyimpan ke storage/app/public/products
            $path = $request->file('image')->store('products', 'public');
            $validated['image'] = $path;
        } else {
            $validated['image'] = null;
        }

        // 3. MAPPING FIELD: Masukkan nilai harga_jual ke kolom 'harga' database
        $validated['harga'] = $request->harga_jual; 

        // 4. Create data ke database
        $product = Product::create($validated);

        return response()->json($product, 201);
    }

    public function update(Request $request, $id)
    {
        $product = Product::findOrFail($id);

        // 1. Validasi request untuk update
        $validated = $request->validate([
            'nama' => 'required|string|max:255',
            'kategori' => 'required|string|max:255',
            'size' => 'required|string',
            'harga_beli' => 'required|numeric|min:0',
            'harga_jual' => 'required|numeric|min:0',
            'stok' => 'required|integer|min:0',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048',
        ]);

        // 2. Handle update gambar baru
        if ($request->hasFile('image')) {
            // Hapus gambar lama dari storage jika sebelumnya ada
            if ($product->image && Storage::disk('public')->exists($product->image)) {
                Storage::disk('public')->delete($product->image);
            }
            
            // Simpan gambar baru
            $path = $request->file('image')->store('products', 'public');
            $validated['image'] = $path;
        }

        // 3. MAPPING FIELD: Update juga kolom 'harga' dengan nilai harga_jual baru
        $validated['harga'] = $request->harga_jual;

        // 4. Update data di database
        $product->update($validated);

        return response()->json($product, 200);
    }

    public function destroy($id)
    {
        $product = Product::findOrFail($id);

        // Hapus file gambar dari storage sebelum datanya dihapus dari database
        if ($product->image && Storage::disk('public')->exists($product->image)) {
            Storage::disk('public')->delete($product->image);
        }

        $product->delete();

        return response()->json(['message' => 'Produk berhasil dihapus'], 200);
    }
}