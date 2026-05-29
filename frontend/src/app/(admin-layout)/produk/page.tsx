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

  const API_URL = "http://localhost:8000/api/products";

  /* ====================================
      HELPER AUTH HEADERS & REDIRECT
  ==================================== */
  const getAuthTokenOrRedirect = () => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      if (!token || token === "undefined") {
        localStorage.removeItem("token");
        router.push("/login");
        return null;
      }
      return token;
    }
    return null;
  };

  const getAuthHeaderFormData = (token: string) => {
    return {
      "Accept": "application/json",
      "Authorization": `Bearer ${token}`,
    };
  };

  const getAuthHeaderJSON = (token: string) => {
    return {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "Authorization": `Bearer ${token}`,
    };
  };

  /* ====================================
      READ: AMBIL DATA DARI API LARAVEL
  ==================================== */
  const fetchProducts = async () => {
    const token = getAuthTokenOrRedirect();
    if (!token) return;

    try {
      setLoading(true);
      const res = await fetch(API_URL, {
        method: "GET",
        headers: getAuthHeaderJSON(token),
      });

      if (res.status === 401) {
        localStorage.removeItem("token");
        router.push("/login");
        return;
      }

      if (res.ok) {
        const data = await res.json();
        setProducts(data);
      } else {
        console.error("Gagal mengambil data produk dari server. Status:", res.status);
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

  /* ====================================
      CREATE: TAMBAH PRODUK KE API
  ==================================== */
  const handleAddProduct = async (newProduct: Omit<ProductType, "id" | "status">) => {
    const token = getAuthTokenOrRedirect();
    if (!token) return;

    try {
      const formData = new FormData();
      formData.append("nama", newProduct.nama);
      formData.append("kategori", newProduct.kategori);
      formData.append("size", newProduct.size);
      formData.append("harga_beli", String(newProduct.harga_beli));
      formData.append("harga_jual", String(newProduct.harga_jual));
      formData.append("stok", String(newProduct.stok));
      
      if (newProduct.image) {
        formData.append("image", newProduct.image);
      }

      const res = await fetch(API_URL, {
        method: "POST",
        headers: getAuthHeaderFormData(token),
        body: formData,
      });

      if (res.status === 401) {
        localStorage.removeItem("token");
        router.push("/login");
        return;
      }

      if (res.ok) {
        fetchProducts();
      } else {
        const errorData = await res.json().catch(() => ({}));
        alert(errorData.message || "Gagal menambahkan produk.");
      }
    } catch (error) {
      console.error("Error creating product:", error);
      alert("Terjadi kesalahan jaringan saat menambah produk.");
    }
  };

  /* ====================================
      UPDATE: SIMPAN PERUBAHAN KE API
  ==================================== */
  const handleUpdateProduct = async (updatedProduct: ProductType) => {
    const token = getAuthTokenOrRedirect();
    if (!token) return;

    try {
      const formData = new FormData();
      formData.append("nama", updatedProduct.nama);
      formData.append("kategori", updatedProduct.kategori);
      formData.append("size", updatedProduct.size);
      formData.append("harga_beli", String(updatedProduct.harga_beli));
      formData.append("harga_jual", String(updatedProduct.harga_jual));
      formData.append("stok", String(updatedProduct.stok));

      if (editImageFile) {
        formData.append("image", editImageFile);
      }

      // Method Spoofing untuk mengatasi batasan Multipart FormData di PUT Laravel
      formData.append("_method", "PUT");

      const res = await fetch(`${API_URL}/${updatedProduct.id}`, {
        method: "POST",
        headers: getAuthHeaderFormData(token),
        body: formData,
      });

      if (res.status === 401) {
        localStorage.removeItem("token");
        router.push("/login");
        return;
      }

      if (res.ok) {
        fetchProducts();
        setEditingProduct(null);
        setEditImageFile(null);
      } else {
        const errorData = await res.json().catch(() => ({}));
        alert(errorData.message || "Gagal memperbarui produk.");
      }
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  /* ====================================
      DELETE: HAPUS PRODUK DARI API
  ==================================== */
  const handleDeleteProduct = async (id: number, nama: string) => {
    const token = getAuthTokenOrRedirect();
    if (!token) return;

    const confirmDelete = confirm(`Hapus produk ${nama}?`);

    if (confirmDelete) {
      try {
        const res = await fetch(`${API_URL}/${id}`, {
          method: "DELETE",
          headers: getAuthHeaderJSON(token),
        });

        if (res.status === 401) {
          localStorage.removeItem("token");
          router.push("/login");
          return;
        }

        if (res.ok) {
          setProducts((prev) => prev.filter((item) => item.id !== id));
        } else {
          alert("Gagal menghapus produk. Sesi mungkin kedaluwarsa.");
        }
      } catch (error) {
        console.error("Error deleting product:", error);
      }
    }
  };

  const filteredProduk = useMemo(() => {
    return products.filter((item) =>
      item.nama.toLowerCase().includes(search.toLowerCase())
    );
  }, [products, search]);

  return (
    <div>
      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Daftar Produk
        </h1>
        <p className="mt-2 text-gray-500 dark:text-gray-400">
          Kelola semua produk Dana Stockroom
        </p>
      </div>

      {/* CARD */}
      <Card className="border border-gray-200 bg-white shadow-sm dark:border-white/10 dark:bg-[#0F172A]">
        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="w-full md:max-w-sm">
            <input
              type="text"
              placeholder="Cari produk..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl border border-gray-200 bg-gray-100 px-4 py-3 text-gray-900 placeholder:text-gray-500 outline-none transition focus:border-sky-500 dark:border-white/10 dark:bg-[#1E293B] dark:text-white dark:placeholder:text-gray-400"
            />
          </div>

          <AddProductModal onAddProduct={handleAddProduct} />
        </div>

        <div className="overflow-x-auto">
          {loading ? (
            <div className="py-10 text-center font-medium text-gray-500 dark:text-gray-400 animate-pulse">
              Memuat data produk dari database...
            </div>
          ) : (
            <DataTable
              headers={[
                "Produk",
                "Size",
                "Kategori",
                "Harga Beli",
                "Harga Jual",
                "Stok",
                "Status",
                "Action",
              ]}
            >
              {filteredProduk.map((produk) => (
                <tr
                  key={produk.id}
                  className="border-b border-gray-200 dark:border-white/5"
                >
                  <td className="py-5">
                    <div className="flex items-center gap-4">
                      <div className="relative h-14 w-14 overflow-hidden rounded-xl border border-gray-200 bg-gray-100 dark:border-white/10 dark:bg-[#1E293B]">
                        <Image
                          src={
                            produk.image 
                              ? typeof produk.image === "string" && produk.image.startsWith("http")
                                ? produk.image 
                                : `http://localhost:8000/storage/${produk.image}`
                              : "/images/no-image.png"
                          }
                          alt={produk.nama}
                          fill
                          sizes="56px"
                          priority
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 dark:text-white">
                          {produk.nama}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Sepatu Original
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="py-5 text-gray-700 dark:text-gray-300">
                    {produk.size}
                  </td>

                  <td className="py-5 text-gray-700 dark:text-gray-300">
                    {produk.kategori}
                  </td>

                  <td className="py-5 font-medium text-red-600 dark:text-red-400">
                    {formatRupiah(produk.harga_beli)}
                  </td>

                  <td className="py-5 font-medium text-green-600 dark:text-green-400">
                    {formatRupiah(produk.harga_jual)}
                  </td>

                  <td className="py-5 text-gray-700 dark:text-gray-300">
                    {produk.stok}
                  </td>

                  <td className="py-5">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        produk.status === "Tersedia"
                          ? "bg-green-100 text-green-600 dark:bg-green-500/20 dark:text-green-400"
                          : produk.status === "Stok Menipis"
                          ? "bg-yellow-100 text-yellow-600 dark:bg-yellow-500/20 dark:text-yellow-400"
                          : "bg-red-100 text-red-600 dark:bg-red-500/20 dark:text-red-400"
                      }`}
                    >
                      {produk.status}
                    </span>
                  </td>

                  <td className="py-5">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => {
                          setEditingProduct(produk);
                          setEditImageFile(null); 
                        }}
                        className="rounded-lg bg-sky-100 px-4 py-2 text-sm font-medium text-sky-600 transition hover:bg-sky-200 dark:bg-sky-500/20 dark:text-sky-400 dark:hover:bg-sky-500/30"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => handleDeleteProduct(produk.id, produk.nama)}
                        className="rounded-lg bg-red-100 px-4 py-2 text-sm font-medium text-red-600 transition hover:bg-red-200 dark:bg-red-500/20 dark:text-red-400 dark:hover:bg-red-500/30"
                      >
                        Hapus
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </DataTable>
          )}
        </div>
      </Card>

      {/* EDIT MODAL BANNER */}
      {editingProduct && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 px-4">
          <div className="w-full max-w-2xl rounded-2xl border border-gray-200 bg-white p-8 shadow-2xl dark:border-white/10 dark:bg-[#0F172A]">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Edit Produk
                </h2>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  Update data produk
                </p>
              </div>

              <button
                onClick={() => setEditingProduct(null)}
                className="text-2xl text-gray-500 transition hover:text-black dark:text-gray-400 dark:hover:text-white"
              >
                ×
              </button>
            </div>

            <div className="space-y-5">
              {/* NAMA */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Nama Produk
                </label>
                <input
                  type="text"
                  value={editingProduct.nama}
                  onChange={(e) =>
                    setEditingProduct({ ...editingProduct, nama: e.target.value })
                  }
                  className="w-full rounded-xl border border-gray-200 bg-gray-100 px-4 py-3 text-gray-900 outline-none transition focus:border-sky-500 dark:border-white/10 dark:bg-[#1E293B] dark:text-white"
                />
              </div>

              {/* SIZE & KATEGORI */}
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Size
                  </label>
                  <select
                    value={editingProduct.size}
                    onChange={(e) =>
                      setEditingProduct({ ...editingProduct, size: e.target.value })
                    }
                    className="w-full rounded-xl border border-gray-200 bg-gray-100 px-4 py-3 text-gray-900 outline-none transition focus:border-sky-500 dark:border-white/10 dark:bg-[#1E293B] dark:text-white"
                  >
                    {["38", "39", "40", "41", "42", "43", "44", "45"].map((sz) => (
                      <option key={sz}>{sz}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Kategori
                  </label>
                  <input
                    type="text"
                    value={editingProduct.kategori}
                    onChange={(e) =>
                      setEditingProduct({ ...editingProduct, kategori: e.target.value })
                    }
                    className="w-full rounded-xl border border-gray-200 bg-gray-100 px-4 py-3 text-gray-900 outline-none transition focus:border-sky-500 dark:border-white/10 dark:bg-[#1E293B] dark:text-white"
                  />
                </div>
              </div>

              {/* HARGA BELI & HARGA JUAL */}
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Harga Beli (Modal)
                  </label>
                  <input
                    type="number"
                    value={editingProduct.harga_beli || 0}
                    onChange={(e) =>
                      setEditingProduct({ ...editingProduct, harga_beli: Number(e.target.value) })
                    }
                    className="w-full rounded-xl border border-gray-200 bg-gray-100 px-4 py-3 text-gray-900 outline-none transition focus:border-sky-500 dark:border-white/10 dark:bg-[#1E293B] dark:text-white"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Harga Jual
                  </label>
                  <input
                    type="number"
                    value={editingProduct.harga_jual || 0}
                    onChange={(e) =>
                      setEditingProduct({ ...editingProduct, harga_jual: Number(e.target.value) })
                    }
                    className="w-full rounded-xl border border-gray-200 bg-gray-100 px-4 py-3 text-gray-900 outline-none transition focus:border-sky-500 dark:border-white/10 dark:bg-[#1E293B] dark:text-white"
                  />
                </div>
              </div>

              {/* STOK */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Stok
                </label>
                <input
                  type="number"
                  value={editingProduct.stok}
                  onChange={(e) =>
                    setEditingProduct({ ...editingProduct, stok: Number(e.target.value) })
                  }
                  className="w-full rounded-xl border border-gray-200 bg-gray-100 px-4 py-3 text-gray-900 outline-none transition focus:border-sky-500 dark:border-white/10 dark:bg-[#1E293B] dark:text-white"
                />
              </div>

              {/* UPDATE INPUT GAMBAR BARU */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Ganti Foto Produk (Opsional)
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      setEditImageFile(e.target.files[0]);
                    }
                  }}
                  className="w-full rounded-xl border border-gray-200 bg-gray-100 px-4 py-3 text-gray-900 outline-none transition focus:border-sky-500 dark:border-white/10 dark:bg-[#1E293B] dark:text-white file:mr-4 file:rounded-lg file:border-0 file:bg-sky-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-sky-700 hover:file:bg-sky-100 dark:file:bg-sky-500/10 dark:file:text-sky-400"
                />
              </div>
            </div>

            {/* FOOTER ACTION */}
            <div className="mt-8 flex justify-end gap-4">
              <button
                onClick={() => setEditingProduct(null)}
                className="rounded-xl border border-gray-200 px-5 py-3 text-gray-700 transition hover:bg-gray-100 dark:border-white/10 dark:text-gray-300 dark:hover:bg-white/5"
              >
                Batal
              </button>

              <button
                onClick={() => handleUpdateProduct(editingProduct)}
                className="rounded-xl bg-sky-500 px-6 py-3 font-semibold text-white transition hover:bg-sky-600"
              >
                Simpan Perubahan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}