import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import api from "../../App/api";
import type { Product } from "../../type/Products";
import { useNavigate } from "react-router-dom";

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const navigate = useNavigate();

  const fetchProducts = async () => {
    try {
      let res;
      if (searchTerm) {
        res = await api.get<{ products: Product[] }>(
          `/products/search?q=${searchTerm}`
        );
        setProducts(res.data.products);
      } else {
        res = await api.get<{ products: Product[] }>(
          `/products?sortBy=title&order=${sortOrder}`
        );
        setProducts(res.data.products);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [searchTerm, sortOrder]);

  const handleDelete = (id: number) => {
    setProducts(products.filter((p) => p.id !== id));
  };

  const handleUpdate = (updated: Product) => {
    setProducts(products.map((p) => (p.id === updated.id ? updated : p)));
  };

  return (
    <div className="p-4 md:p-6 mt-20">
      {/* Controls Section */}
      <div className="flex flex-col sm:flex-row flex-wrap gap-4 justify-center items-center mb-10">
        <button
          onClick={() => navigate("/add-product")}
          className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition w-full sm:w-auto">
          Add Product
        </button>

        <input
          type="text"
          placeholder="Search product..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-gray-300 rounded p-2 w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-green-400"
        />

        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value as "asc" | "desc")}
          className="border border-gray-300 rounded p-2 w-full sm:w-auto focus:outline-none focus:ring-2 focus:ring-green-400">
          <option value="asc">Title Ascending</option>
          <option value="desc">Title Descending</option>
        </select>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.length ? (
          products.map((p) => (
            <ProductCard
              key={p.id}
              product={p}
              onDelete={handleDelete}
              onUpdate={handleUpdate}
            />
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-full">
            No products found.
          </p>
        )}
      </div>
    </div>
  );
};

export default ProductList;
