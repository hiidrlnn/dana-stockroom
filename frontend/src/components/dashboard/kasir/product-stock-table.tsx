export function ProductStockTable() {
  const products = [
    {
      name: "Air Force 1",
      brand: "Nike",
      size: 42,
      stock: 12,
      price: "Rp 1.850.000",
    },
    {
      name: "Samba",
      brand: "Adidas",
      size: 41,
      stock: 8,
      price: "Rp 1.650.000",
    },
    {
      name: "530",
      brand: "New Balance",
      size: 43,
      stock: 5,
      price: "Rp 2.100.000",
    },
  ];

  return (
    <div
      className="
        rounded-3xl
        border
        border-gray-200
        bg-white
        p-6
        shadow-sm

        dark:border-white/10
        dark:bg-[#0F172A]
      ">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">
          Produk Tersedia
        </h2>

        <span className="text-sm text-gray-500">
          {products.length} produk
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[700px]">
          <thead>
            <tr className="border-b border-gray-200 dark:border-white/10">
              <th className="py-4 text-left text-gray-500">
                Produk
              </th>

              <th className="text-left text-gray-500">
                Merk
              </th>

              <th className="text-left text-gray-500">
                Size
              </th>

              <th className="text-left text-gray-500">
                Stock
              </th>

              <th className="text-left text-gray-500">
                Harga
              </th>
            </tr>
          </thead>

          <tbody>
            {products.map(
              (product, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-100 dark:border-white/5">
                  <td className="py-5 font-semibold text-slate-900 dark:text-white">
                    {product.name}
                  </td>

                  <td>
                    {product.brand}
                  </td>

                  <td>
                    {product.size}
                  </td>

                  <td>
                    {product.stock}
                  </td>

                  <td className="font-semibold">
                    {product.price}
                  </td>
                </tr>
              ),
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}