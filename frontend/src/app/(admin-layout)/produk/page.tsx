"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { ProductInputType } from "@/types/product"; 
import Card from "@/components/ui/card";
import DataTable from "@/components/tabel/data-table";
import { formatRupiah } from "@/lib/format-rupiah";
import AddProductModal from "@/components/produk/add-product-modal";

type ProductType = {
  id: number;
  sku: string;
  nama: string;
  kategori: string;
  size: string;
  harga_beli: number;
  harga_jual: number;
  stok: number;
  status: string;
  image?: File | string | null;
};

export default function ProdukPage() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState<ProductType[]>([]);
  const [editingProduct, setEditingProduct] = useState<ProductType | null>(null);
  const [editImageFile, setEditImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(true);

  const API_URL = "http://127.0.0.1:8000/api/products";
  const IMAGE_URL = "http://127.0.0.1:8000/storage/";

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
        headers: { Accept: "application/json", Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setProducts(data.data || data.products || (Array.isArray(data) ? data : []));
    } catch (error) {
      console.error("Fetch Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchProducts(); }, []);

  const sendAuthenticatedRequest = async (url: string, method: string, body?: FormData | null) => {
    const token = getAuthToken();
    if (!checkAuth(token)) return null;
    const res = await fetch(url, {
      method,
      headers: { Accept: "application/json", Authorization: `Bearer ${token}` },
      body,
    });
    return res;
  };

  const handleAddProduct = async (newProduct: ProductInputType) => {
    const formData = new FormData();
    formData.append("nama", newProduct.nama);
    formData.append("kategori", newProduct.kategori);
    formData.append("size", newProduct.size);
    formData.append("harga_beli", String(newProduct.harga_beli));
    formData.append("harga_jual", String(newProduct.harga_jual));
    formData.append("stok", String(newProduct.stok));

    if (newProduct.image instanceof File) {
      formData.append("image", newProduct.image);
    }

    const res = await sendAuthenticatedRequest(API_URL, "POST", formData);
    
    // Perbaikan: Menangkap response sebagai teks agar error 500 terlihat jelas di console
    if (res?.ok) {
      fetchProducts();
      alert("Produk berhasil ditambahkan!");
    } else {
      const errorText = await res?.text();
      console.error("DEBUG ERROR RESPONS SERVER:", errorText);
      alert("Gagal menambah produk. Silakan cek Console (F12) untuk detail error.");
    }
  };

  const handleUpdateProduct = async () => {
    if (!editingProduct) return;
    const formData = new FormData();
    formData.append("nama", editingProduct.nama);
    formData.append("kategori", editingProduct.kategori);
    formData.append("size", editingProduct.size);
    formData.append("harga_beli", String(editingProduct.harga_beli));
    formData.append("harga_jual", String(editingProduct.harga_jual));
    formData.append("stok", String(editingProduct.stok));
    formData.append("_method", "PUT");

    if (editImageFile) formData.append("image", editImageFile);

    const res = await sendAuthenticatedRequest(`${API_URL}/${editingProduct.id}`, "POST", formData);
    if (res?.ok) {
      alert("Produk berhasil diupdate");
      fetchProducts();
      setEditingProduct(null);
    } else {
      alert("Gagal update produk");
    }
  };

  const handleDeleteProduct = async (id: number, nama: string) => {
    if (confirm(`Hapus produk ${nama}?`)) {
      const res = await sendAuthenticatedRequest(`${API_URL}/${id}`, "DELETE");
      if (res?.ok) fetchProducts();
    }
  };

  const filteredProduk = useMemo(() => {
    return products.filter((item) => item.nama?.toLowerCase().includes(search.toLowerCase()));
  }, [products, search]);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Daftar Produk</h1>
      <Card className="p-6">
        <div className="flex gap-4 mb-6">
          <input type="text" placeholder="Cari..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full border p-3 rounded-xl" />
          <AddProductModal onAddProduct={handleAddProduct} />
        </div>
        
        {loading ? <div>Memuat...</div> : (
          <DataTable headers={["Gambar", "SKU", "Produk", "Size", "Kategori", "Harga Jual", "Stok", "Action"]}>
            {filteredProduk.map((p) => (
              <tr key={p.id}>
                <td>{p.image ? <Image src={`${IMAGE_URL}${p.image}`} width={50} height={50} alt="img" /> : "No Img"}</td>
                <td>{p.sku}</td>
                <td>{p.nama}</td>
                <td>{p.size}</td>
                <td>{p.kategori}</td>
                <td>{formatRupiah(p.harga_jual)}</td>
                <td>{p.stok}</td>
                <td>
                  <button onClick={() => setEditingProduct(p)} className="text-sky-600">Edit</button>
                  <button onClick={() => handleDeleteProduct(p.id, p.nama)} className="text-red-600 ml-2">Hapus</button>
                </td>
              </tr>
            ))}
          </DataTable>
        )}
      </Card>
    </div>
  );
}