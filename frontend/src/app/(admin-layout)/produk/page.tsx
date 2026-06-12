"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { ProductInputType } from "@/types/product";
import Card from "@/components/ui/card";
import DataTable from "@/components/tabel/data-table";
import { formatRupiah } from "@/lib/format-rupiah";
import AddProductModal from "@/components/produk/add-product-modal";
import EditProductModal from "@/components/produk/EditProductModal";

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
  const [editingProduct, setEditingProduct] = useState<ProductType | null>(
    null,
  );
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
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      setProducts(
        data.data || data.products || (Array.isArray(data) ? data : []),
      );
    } catch (error) {
      console.error("Fetch Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const sendAuthenticatedRequest = async (
    url: string,
    method: string,
    body?: FormData | null,
  ) => {
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
      alert(
        "Gagal menambah produk. Silakan cek Console (F12) untuk detail error.",
      );
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

    const res = await sendAuthenticatedRequest(
      `${API_URL}/${editingProduct.id}`,
      "POST",
      formData,
    );
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
    return products.filter((item) =>
      item.nama?.toLowerCase().includes(search.toLowerCase()),
    );
  }, [products, search]);

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold md:text-3xl">Daftar Produk</h1>
      <Card
        className="
    p-4
    md:p-6
    bg-white
    border-gray-200

    dark:bg-[#0F172A]
    dark:border-white/10
  "
      >
        <div
          className="
          mb-6
          flex
          flex-col
          gap-4
          md:flex-row
        "
        >
          <input
            type="text"
            placeholder="Cari..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="
            w-full
            min-h-[52px]
            rounded-xl
            border
            p-3
          "
          />
          <AddProductModal onAddProduct={handleAddProduct} />
        </div>

        {loading ? (
          <div>Memuat...</div>
        ) : (
          <>
            {/* MOBILE */}
            <div className="grid gap-4 lg:hidden">
              {filteredProduk.map((p) => (
                <div
                  key={p.id}
                  className="
                  rounded-2xl
                  border
                  border-gray-200
                  bg-white
                  p-4
                  shadow-sm

                  dark:border-white/10
                  dark:bg-[#0F172A]
                "
                >
                  <div className="flex gap-4">
                    {p.image ? (
                      <div className="relative h-20 w-20 overflow-hidden rounded-xl">
                        <Image
                          src={`${IMAGE_URL}${p.image}`}
                          alt={p.nama}
                          fill
                          sizes="64px"
                          className="object-cover"
                        />
                      </div>
                    ) : (
                      <div
                        className="
                          flex
                          h-20
                          w-20
                          items-center
                          justify-center
                          rounded-xl
                          border
                          border-dashed
                          border-gray-300
                          text-xs
                          text-gray-500

                          dark:border-white/10
                          dark:text-gray-400
                        "
                      >
                        No Image
                      </div>
                    )}

                    <div className="flex flex-1 flex-col justify-center">
                      <h3
                        className="
                            text-base
                            font-semibold
                            text-gray-900

                            dark:text-white
                          "
                      >
                        {p.nama}
                      </h3>

                      <p
                        className="
                          text-sm
                          text-gray-500

                          dark:text-gray-400
                        "
                      >
                        SKU: {p.sku}
                      </p>

                      <p
                        className="
                          text-sm
                          text-gray-700

                          dark:text-gray-300
                        "
                      >
                        Size: {p.size}
                      </p>

                      <p
                        className="
                            text-sm
                            text-gray-700

                            dark:text-gray-300
                          "
                      >
                        Kategori: {p.kategori}
                      </p>
                      <p
                        className="
                          mt-2
                          font-bold
                          text-sky-600

                          dark:text-sky-400
                        "
                      >
                        {formatRupiah(p.harga_jual)}
                      </p>

                      <p
                        className="
                          text-sm
                          font-medium
                          text-gray-700

                          dark:text-gray-300
                        "
                      >
                        Stok: {p.stok}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 flex gap-2">
                    <button
                      onClick={() => setEditingProduct(p)}
                      className="
                        flex-1
                        rounded-lg
                        bg-sky-500
                        px-3
                        py-2
                        text-white
                      "
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleDeleteProduct(p.id, p.nama)}
                      className="
                        flex-1
                        rounded-lg
                        bg-red-500
                        px-3
                        py-2
                        text-white
                      "
                    >
                      Hapus
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* TABLET + DESKTOP */}
            <div className="hidden lg:block">
              <DataTable
                headers={[
                  "Gambar",
                  "SKU",
                  "Produk",
                  "Size",
                  "Kategori",
                  "Harga Jual",
                  "Stok",
                  "Action",
                ]}
              >
                {filteredProduk.map((p) => (
                  <tr key={p.id}>
                    <td className="py-4">
                      {p.image ? (
                        <div className="relative h-16 w-16 overflow-hidden rounded-xl border border-gray-200 dark:border-white/10">
                          <Image
                            src={`${IMAGE_URL}${p.image}`}
                            alt={p.nama}
                            fill
                            sizes="64px"
                            className="object-cover"
                          />
                        </div>
                      ) : (
                        <div className="flex h-16 w-16 items-center justify-center rounded-xl border border-dashed border-gray-300 text-xs text-gray-400">
                          No Image
                        </div>
                      )}
                    </td>

                    <td>{p.sku}</td>

                    <td>{p.nama}</td>

                    <td>{p.size}</td>

                    <td>{p.kategori}</td>

                    <td>{formatRupiah(p.harga_jual)}</td>

                    <td>{p.stok}</td>

                    <td className="py-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => setEditingProduct(p)}
                          className="
                            rounded-lg
                            bg-sky-500
                            px-3
                            py-2
                            text-sm
                            font-medium
                            text-white
                            hover:bg-sky-600
                          "
                        >
                          Edit
                        </button>

                        <button
                          onClick={() => handleDeleteProduct(p.id, p.nama)}
                          className="
                            rounded-lg
                            bg-red-500
                            px-3
                            py-2
                            text-sm
                            font-medium
                            text-white
                            hover:bg-red-600
                          "
                        >
                          Hapus
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </DataTable>
            </div>
          </>
        )}
      </Card>
      {editingProduct && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 px-4">
          <div
            className="
          w-full
          max-w-4xl
          max-h-[90vh]
          overflow-y-auto
          rounded-3xl
          border
          border-white/10
          bg-[#0F172A]
          p-4
          md:p-8
          shadow-2xl
        "
          >
            {/* HEADER */}
            <div className="mb-8 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white md:text-3xl">
                Edit Produk
              </h2>

              <button
                onClick={() => setEditingProduct(null)}
                className="text-2xl text-gray-400 hover:text-white"
              >
                ×
              </button>
            </div>

            <div className="space-y-5">
              {/* NAMA */}
              <div>
                <label className="mb-2 block text-sm text-gray-300">
                  Nama Produk
                </label>

                <input
                  type="text"
                  value={editingProduct.nama}
                  onChange={(e) =>
                    setEditingProduct({
                      ...editingProduct,
                      nama: e.target.value,
                    })
                  }
                  className="
              w-full
              rounded-xl
              border
              border-white/10
              bg-[#1E293B]
              px-4
              py-3
              text-white
              outline-none
              focus:border-sky-500
            "
                />
              </div>

              {/* GRID */}
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm text-gray-300">
                    Size
                  </label>

                  <select
                    value={editingProduct.size}
                    onChange={(e) =>
                      setEditingProduct({
                        ...editingProduct,
                        size: e.target.value,
                      })
                    }
                    className="
                w-full
                rounded-xl
                border
                border-white/10
                bg-[#1E293B]
                px-4
                py-3
                text-white
              "
                  >
                    {["38", "39", "40", "41", "42", "43", "44", "45"].map(
                      (size) => (
                        <option key={size} value={size}>
                          {size}
                        </option>
                      ),
                    )}
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm text-gray-300">
                    Kategori
                  </label>

                  <input
                    type="text"
                    value={editingProduct.kategori}
                    onChange={(e) =>
                      setEditingProduct({
                        ...editingProduct,
                        kategori: e.target.value,
                      })
                    }
                    className="
                w-full
                rounded-xl
                border
                border-white/10
                bg-[#1E293B]
                px-4
                py-3
                text-white
              "
                  />
                </div>
              </div>

              {/* HARGA */}
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm text-gray-300">
                    Harga Beli
                  </label>

                  <input
                    type="number"
                    value={editingProduct.harga_beli}
                    onChange={(e) =>
                      setEditingProduct({
                        ...editingProduct,
                        harga_beli: Number(e.target.value),
                      })
                    }
                    className="
                w-full
                rounded-xl
                border
                border-white/10
                bg-[#1E293B]
                px-4
                py-3
                text-white
              "
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm text-gray-300">
                    Harga Jual
                  </label>

                  <input
                    type="number"
                    value={editingProduct.harga_jual}
                    onChange={(e) =>
                      setEditingProduct({
                        ...editingProduct,
                        harga_jual: Number(e.target.value),
                      })
                    }
                    className="
                w-full
                rounded-xl
                border
                border-white/10
                bg-[#1E293B]
                px-4
                py-3
                text-white
              "
                  />
                </div>
              </div>

              {/* STOK + FOTO */}
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm text-gray-300">
                    Stok
                  </label>

                  <input
                    type="number"
                    value={editingProduct.stok}
                    onChange={(e) =>
                      setEditingProduct({
                        ...editingProduct,
                        stok: Number(e.target.value),
                      })
                    }
                    className="
                w-full
                rounded-xl
                border
                border-white/10
                bg-[#1E293B]
                px-4
                py-3
                text-white
              "
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm text-gray-300">
                    Ganti Foto
                  </label>

                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                      setEditImageFile(e.target.files?.[0] || null)
                    }
                    className="
                w-full
                rounded-xl
                border
                border-white/10
                bg-[#1E293B]
                px-4
                py-[10px]
                text-white
              "
                  />
                </div>
              </div>

              {/* PREVIEW */}
              {editingProduct.image && (
                <div>
                  <label className="mb-3 block text-sm text-gray-300">
                    Foto Saat Ini
                  </label>

                  <div className="relative h-32 w-32 overflow-hidden rounded-2xl border border-white/10">
                    <Image
                      src={`${IMAGE_URL}${editingProduct.image}`}
                      alt={editingProduct.nama}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              )}

              {/* BUTTON */}
              <div
                className="
            mt-8
            flex
            flex-col
            gap-3
            md:flex-row
            md:justify-end
          "
              >
                <button
                  onClick={() => setEditingProduct(null)}
                  className="
              w-full 
              md:w-auto
              rounded-xl
              border
              border-white/10
              px-6
              py-3
              text-white
            "
                >
                  Batal
                </button>

                <button
                  onClick={handleUpdateProduct}
                  className="
              w-full 
              md:w-auto
              rounded-xl
              bg-sky-500
              px-6
              py-3
              font-semibold
              text-white
              hover:bg-sky-600
            "
                >
                  Simpan Perubahan
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
