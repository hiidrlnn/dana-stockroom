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
  image?: string;
};

export default function ProdukPage() {
  const router = useRouter();

  const [search, setSearch] = useState("");
  const [products, setProducts] = useState<ProductType[]>([]);
  const [editingProduct, setEditingProduct] =
    useState<ProductType | null>(null);
  const [editImageFile, setEditImageFile] =
    useState<File | null>(null);
  const [loading, setLoading] = useState(true);

  const API_URL =
    "http://127.0.0.1:8000/api/products";

  const IMAGE_URL =
    "http://127.0.0.1:8000/storage/";

  const getAuthToken = () => {
    if (typeof window !== "undefined") {
      const token =
        localStorage.getItem("token");

      return token
        ? token.replace(/['"]+/g, "")
        : null;
    }

    return null;
  };

  const checkAuth = (
    token: string | null,
  ) => {
    if (
      !token ||
      token === "undefined" ||
      token === "null"
    ) {
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

      console.log("Produk:", data);

      if (Array.isArray(data)) {
        setProducts(data);
      } else if (
        data.data &&
        Array.isArray(data.data)
      ) {
        setProducts(data.data);
      } else if (
        data.products &&
        Array.isArray(data.products)
      ) {
        setProducts(data.products);
      } else {
        setProducts([]);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const sendAuthenticatedRequest =
    async (
      url: string,
      method: string,
      body?: FormData | null,
    ) => {
      const token = getAuthToken();

      if (!checkAuth(token))
        return null;

      const res = await fetch(url, {
        method,
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        body,
      });

      if (res.status === 401) {
        localStorage.removeItem("token");
        router.push("/login");
      }

      return res;
    };

  const handleAddProduct = async (
    newProduct: Omit<
      ProductType,
      "id" | "status"
    >,
  ) => {
    const formData = new FormData();

    Object.entries(newProduct).forEach(
      ([key, value]) => {
        if (
          key !== "image" &&
          value !== undefined
        ) {
          formData.append(
            key,
            String(value),
          );
        }
      },
    );

    if (newProduct.image) {
      formData.append(
        "image",
        newProduct.image,
      );
    }

    const res =
      await sendAuthenticatedRequest(
        API_URL,
        "POST",
        formData,
      );

    if (res?.ok) {
      fetchProducts();
    } else {
      alert("Gagal menambah produk.");
    }
  };

  const handleUpdateProduct =
    async () => {
      if (!editingProduct) return;

      const formData =
        new FormData();

      formData.append(
        "nama",
        editingProduct.nama,
      );

      formData.append(
        "kategori",
        editingProduct.kategori,
      );

      formData.append(
        "size",
        editingProduct.size,
      );

      formData.append(
        "harga_beli",
        String(
          editingProduct.harga_beli,
        ),
      );

      formData.append(
        "harga_jual",
        String(
          editingProduct.harga_jual,
        ),
      );

      formData.append(
        "stok",
        String(editingProduct.stok),
      );

      if (editImageFile) {
        formData.append(
          "image",
          editImageFile,
        );
      }

      formData.append(
        "_method",
        "PUT",
      );

      const res =
        await sendAuthenticatedRequest(
          `${API_URL}/${editingProduct.id}`,
          "POST",
          formData,
        );

      if (res?.ok) {
        alert(
          "Produk berhasil diupdate",
        );

        fetchProducts();
        setEditingProduct(null);
        setEditImageFile(null);
      } else {
        alert("Gagal update produk");
      }
    };

  const handleDeleteProduct =
    async (
      id: number,
      nama: string,
    ) => {
      if (
        confirm(
          `Hapus produk ${nama}?`,
        )
      ) {
        const res =
          await sendAuthenticatedRequest(
            `${API_URL}/${id}`,
            "DELETE",
          );

        if (res?.ok) {
          setProducts((prev) =>
            prev.filter(
              (item) =>
                item.id !== id,
            ),
          );
        }
      }
    };

  const filteredProduk =
    useMemo(() => {
      return products.filter((item) =>
        item.nama
          ?.toLowerCase()
          .includes(
            search.toLowerCase(),
          ),
      );
    }, [products, search]);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Daftar Produk
        </h1>
      </div>

      <Card className="border border-gray-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-[#0F172A]">
        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <input
            type="text"
            placeholder="Cari produk..."
            value={search}
            onChange={(e) =>
              setSearch(
                e.target.value,
              )
            }
            className="w-full rounded-xl border border-gray-200 bg-gray-100 px-4 py-3 outline-none focus:border-sky-500 dark:bg-[#1E293B] md:max-w-sm"
          />

          <AddProductModal
          onAddProduct={(
            product: any,
          ) =>
            handleAddProduct(product)
          }
        />
        </div>

        <div className="overflow-x-auto">
          {loading ? (
            <div className="animate-pulse py-10 text-center text-gray-500">
              Memuat data...
            </div>
          ) : (
            <DataTable
              headers={[
                "Gambar",
                "Produk",
                "Size",
                "Kategori",
                "Harga Beli",
                "Harga Jual",
                "Stok",
                "Status",
                "Action",
              ]}>
              {filteredProduk.map(
                (produk) => (
                  <tr
                    key={produk.id}
                    className="border-b border-gray-200 dark:border-white/5">
                    <td className="py-5">
                      {produk.image ? (
                        <Image
                          src={`${IMAGE_URL}${produk.image}`}
                          alt={
                            produk.nama
                          }
                          width={60}
                          height={60}
                          className="h-14 w-14 rounded-xl object-cover"
                        />
                      ) : (
                        <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gray-200 text-xs dark:bg-gray-700">
                          No Img
                        </div>
                      )}
                    </td>

                    <td className="py-5 font-semibold text-gray-900 dark:text-white">
                      {produk.nama}
                    </td>

                    <td className="py-5">
                      {produk.size}
                    </td>

                    <td className="py-5">
                      {
                        produk.kategori
                      }
                    </td>

                    <td className="py-5 text-red-600">
                      {formatRupiah(
                        produk.harga_beli,
                      )}
                    </td>

                    <td className="py-5 text-green-600">
                      {formatRupiah(
                        produk.harga_jual,
                      )}
                    </td>

                    <td className="py-5">
                      {produk.stok}
                    </td>

                    <td className="py-5">
                      {
                        produk.status
                      }
                    </td>

                    <td className="flex gap-2 py-5">
                      <button
                        onClick={() =>
                          setEditingProduct(
                            produk,
                          )
                        }
                        className="rounded bg-sky-100 px-3 py-1 text-sky-600">
                        Edit
                      </button>

                      <button
                        onClick={() =>
                          handleDeleteProduct(
                            produk.id,
                            produk.nama,
                          )
                        }
                        className="rounded bg-red-100 px-3 py-1 text-red-600">
                        Hapus
                      </button>
                    </td>
                  </tr>
                ),
              )}
            </DataTable>
          )}
        </div>
      </Card>

    {/* MODAL EDIT */}
    {editingProduct && (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
        <div className="w-full max-w-4xl rounded-3xl border border-white/10 bg-[#0F172A] p-8 shadow-2xl">

          {/* HEADER */}
          <div className="mb-8 flex items-start justify-between">
            <div>
              <h2 className="text-3xl font-bold text-white">
                Edit Produk
              </h2>

              <p className="mt-2 text-gray-400">
                Perbarui data produk Dana Stockroom
              </p>
            </div>

            <button
              onClick={() => {
                setEditingProduct(null);
                setEditImageFile(null);
              }}
              className="text-2xl text-gray-400 hover:text-white"
            >
              ×
            </button>
          </div>

          {/* FORM */}
          <div className="space-y-6">

            {/* NAMA */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-300">
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
                  py-4
                  text-white
                  outline-none
                  focus:border-sky-500
                "
              />
            </div>

            {/* SIZE + KATEGORI */}
            <div className="grid gap-5 md:grid-cols-2">

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-300">
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
                    py-4
                    text-white
                    outline-none
                  "
                >
                  {[38,39,40,41,42,43,44,45].map((size) => (
                    <option
                      key={size}
                      value={size}
                    >
                      {size}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-300">
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
                    py-4
                    text-white
                    outline-none
                    focus:border-sky-500
                  "
                />
              </div>

            </div>

            {/* HARGA */}
            <div className="grid gap-5 md:grid-cols-2">

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-300">
                  Harga Beli (Modal HPP)
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
                    py-4
                    text-white
                    outline-none
                    focus:border-sky-500
                  "
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-300">
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
                    py-4
                    text-white
                    outline-none
                    focus:border-sky-500
                  "
                />
              </div>

            </div>

            {/* STOK + FOTO */}
            <div className="grid gap-5 md:grid-cols-2">

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-300">
                  Stok Awal
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
                    py-4
                    text-white
                    outline-none
                    focus:border-sky-500
                  "
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-300">
                  Foto Produk
                </label>

                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    setEditImageFile(
                      e.target.files?.[0] || null
                    )
                  }
                  className="
                    w-full
                    rounded-xl
                    border
                    border-white/10
                    bg-[#1E293B]
                    px-4
                    py-4
                    text-white
                  "
                />
              </div>

            </div>

            {/* PREVIEW */}
            <div>
              <label className="mb-3 block text-sm font-medium text-gray-300">
                Foto Saat Ini
              </label>

              <div className="flex items-center gap-4">

                {editImageFile ? (
                  <Image
                    src={URL.createObjectURL(editImageFile)}
                    alt="preview"
                    width={120}
                    height={120}
                    className="h-28 w-28 rounded-xl object-cover"
                  />
                ) : editingProduct.image ? (
                  <Image
                    src={`${IMAGE_URL}${editingProduct.image}`}
                    alt={editingProduct.nama}
                    width={120}
                    height={120}
                    className="h-28 w-28 rounded-xl object-cover"
                  />
                ) : (
                  <div className="flex h-28 w-28 items-center justify-center rounded-xl bg-gray-700 text-sm text-gray-400">
                    No Image
                  </div>
                )}

              </div>
            </div>

            {/* ACTION */}
            <div className="flex justify-end gap-4 pt-4">

              <button
                onClick={() => {
                  setEditingProduct(null);
                  setEditImageFile(null);
                }}
                className="
                  rounded-xl
                  border
                  border-white/10
                  px-7
                  py-3
                  text-white
                "
              >
                Batal
              </button>

              <button
                onClick={handleUpdateProduct}
                className="
                  rounded-xl
                  bg-sky-500
                  px-7
                  py-3
                  font-semibold
                  text-white
                  hover:bg-sky-600
                "
              >
                Update Produk
              </button>

            </div>

          </div>
        </div>
      </div>
    )}
    </div>
  );
}