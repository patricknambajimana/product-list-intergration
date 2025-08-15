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

  // Fetch all products or filtered products
  const fetchProducts = async () => {
    try {
      let res;
      if (searchTerm) {
        res = await api.get<{ products: Product[] }>(
          `/products/search?q=${searchTerm}`
        );
        setProducts(res.data.products);
      } else {
        res = await api.get<{ products: Product[] }>(`/products?sortBy=title&order=${sortOrder}`);
        setProducts(res.data.products);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [searchTerm, sortOrder]);

  // Remove product from list after delete
  const handleDelete = (id: number) => {
    setProducts(products.filter((p) => p.id !== id));
  };

  // Update product in list after edit
  const handleUpdate = (updated: Product) => {
    setProducts(products.map((p) => (p.id === updated.id ? updated : p)));
  };

  return (
    <div className="p-5">
      <div className="flex flex-col md:flex-row gap-4 justify-center items-center p-20">
        <button
          onClick={() => navigate("/add-product")}
          className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition">
          Add Product
        </button>

        <input
          type="text"
          placeholder="Search product..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-gray-300 rounded p-2 w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-green-400"
        />

        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value as "asc" | "desc")}
          className="border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-green-400"
        >
          <option value="asc">Title Ascending</option>
          <option value="desc">Title Descending</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 pl-20 pr-20">
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
