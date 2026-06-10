// frontend/src/types/product.ts

export type ProductInputType = {
  nama: string;
  kategori: string;
  size: string;
  harga_beli: number;
  harga_jual: number;
  stok: number;
  image?: File | string | null;
};