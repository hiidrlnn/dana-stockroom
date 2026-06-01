"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import Card from "@/components/ui/card";
import DataTable from "@/components/tabel/data-table";
import { formatRupiah } from "@/lib/format-rupiah";
import AddProductModal from "@/components/produk/add-product-modal";

type ProductType = {
  id: number;
  nama: string;
  kategori: string;
  size: string;
  harga_beli: number;
  harga_jual: number;
  stok: number;
  status: string;
  image?: any;
};

export default function ProdukPage() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState<ProductType[]>([]);
  const [editingProduct, setEditingProduct] = useState<ProductType | null>(null);
  const [editImageFile, setEditImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(true);

  const API_URL = "http://127.0.0.1:8000/api/products";

  const getAuthToken = () => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      return token ? token.replace(/['"]+/g, "") : null;
    }
    return null;
  };

  const checkAuth = (token: string | null) => {
    if (!token || token === "undefined" || token === "null") {
      localStorage.removeItem("token");
      router.push("/login");
      return false;
    }
    return true;
  };

  const fetchProducts = async () => {
    const token = getAuthToken();
    if (!checkAuth(token)) return;

    try {
      setLoading(true);
      const res = await fetch(API_URL, {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.status === 401) {
        localStorage.removeItem("token");
        router.push("/login");
        return;
      }

      const data = await res.json();
      
      // Log untuk debug jika masih kosong
      console.log("Data dari API:", data);

      // Menangani berbagai format JSON Laravel
      if (Array.isArray(data)) {
        setProducts(data);
      } else if (data.data && Array.isArray(data.data)) {
        setProducts(data.data);
      } else if (data.products && Array.isArray(data.products)) {
        setProducts(data.products);
      } else {
        setProducts([]);
      }
    } catch (error) {
      console.error("Gagal memuat produk:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const sendAuthenticatedRequest = async (url: string, method: string, body?: FormData | null) => {
    const token = getAuthToken();
    if (!checkAuth(token)) return null;

    const options: RequestInit = {
      method,
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body,
    };

    const res = await fetch(url, options);
    if (res.status === 401) {
      localStorage.removeItem("token");
      router.push("/login");
    }
    return res;
  };

  const handleAddProduct = async (newProduct: Omit<ProductType, "id" | "status">) => {
    const formData = new FormData();
    Object.entries(newProduct).forEach(([key, value]) => formData.append(key, String(value)));
    if (newProduct.image) formData.append("image", newProduct.image);

    const res = await sendAuthenticatedRequest(API_URL, "POST", formData);
    if (res?.ok) fetchProducts();
    else alert("Gagal menambah produk.");
  };

  const handleUpdateProduct = async (updatedProduct: ProductType) => {
    const formData = new FormData();
    formData.append("nama", updatedProduct.nama);
    formData.append("kategori", updatedProduct.kategori);
    formData.append("size", updatedProduct.size);
    formData.append("harga_beli", String(updatedProduct.harga_beli));
    formData.append("harga_jual", String(updatedProduct.harga_jual));
    formData.append("stok", String(updatedProduct.stok));
    if (editImageFile) formData.append("image", editImageFile);
    formData.append("_method", "PUT");

    const res = await sendAuthenticatedRequest(`${API_URL}/${updatedProduct.id}`, "POST", formData);
    if (res?.ok) {
      fetchProducts();
      setEditingProduct(null);
      setEditImageFile(null);
    } else alert("Gagal update produk.");
  };

  const handleDeleteProduct = async (id: number, nama: string) => {
    if (confirm(`Hapus produk ${nama}?`)) {
      const res = await sendAuthenticatedRequest(`${API_URL}/${id}`, "DELETE");
      if (res?.ok) setProducts((prev) => prev.filter((item) => item.id !== id));
    }
  };

  const filteredProduk = useMemo(() => {
    return products.filter((item) =>
      item.nama?.toLowerCase().includes(search.toLowerCase())
    );
  }, [products, search]);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Daftar Produk</h1>
      </div>

      <Card className="border border-gray-200 bg-white shadow-sm dark:border-white/10 dark:bg-[#0F172A] p-6">
        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <input
            type="text"
            placeholder="Cari produk..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full md:max-w-sm rounded-xl border border-gray-200 bg-gray-100 px-4 py-3 outline-none focus:border-sky-500 dark:bg-[#1E293B]"
          />
          <AddProductModal onAddProduct={handleAddProduct} />
        </div>

        <div className="overflow-x-auto">
          {loading ? (
            <div className="py-10 text-center text-gray-500 animate-pulse">Memuat data...</div>
          ) : (
            <DataTable
              headers={["Produk", "Size", "Kategori", "Harga Beli", "Harga Jual", "Stok", "Status", "Action"]}
            >
              {filteredProduk.map((produk) => (
                <tr key={produk.id} className="border-b border-gray-200 dark:border-white/5">
                  <td className="py-5 font-semibold text-gray-900 dark:text-white">{produk.nama}</td>
                  <td className="py-5">{produk.size}</td>
                  <td className="py-5">{produk.kategori}</td>
                  <td className="py-5 text-red-600">{formatRupiah(produk.harga_beli)}</td>
                  <td className="py-5 text-green-600">{formatRupiah(produk.harga_jual)}</td>
                  <td className="py-5">{produk.stok}</td>
                  <td className="py-5">{produk.status}</td>
                  <td className="py-5 flex gap-2">
                    <button onClick={() => setEditingProduct(produk)} className="bg-sky-100 px-3 py-1 rounded text-sky-600">Edit</button>
                    <button onClick={() => handleDeleteProduct(produk.id, produk.nama)} className="bg-red-100 px-3 py-1 rounded text-red-600">Hapus</button>
                  </td>
                </tr>
              ))}
            </DataTable>
          )}
        </div>
      </Card>
    </div>
  );
}