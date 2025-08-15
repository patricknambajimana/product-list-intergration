import React, { useEffect, useState } from "react";
import api from "../App/api";

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  brand: string;
  category: string;
  thumbnail: string;
}

const CategoryPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("smartphones");
  const [loading, setLoading] = useState(true);

  const categories = [
    "smartphones",
    "laptops",
    "fragrances",
    "skincare",
    "groceries",
    "home-decoration",
    "furniture",
    "tops",
    "womens-dresses",
    "womens-shoes",
    "mens-shirts",
    "mens-shoes",
    "mens-watches",
    "womens-watches",
    "womens-bags",
    "womens-jewellery",
    "sunglasses",
    "automotive",
    "motorcycle",
    "lighting",
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await api.get(`products/category/${selectedCategory}`);
        setProducts(res.data.products);
      } catch (err) {
        console.error("Error fetching category products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [selectedCategory]);

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen text-xl text-gray-600">
        Loading products...
      </div>
    );

  return (
    <div className="px-4 md:px-8 lg:px-16 mt-24">
      <h1 className="text-3xl font-bold mb-6 text-green-700 text-center md:text-left">
        {selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)}
      </h1>

      {/* Category select */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-start gap-4 mb-6">
        <label className="font-semibold">Select Category:</label>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="border p-2 rounded focus:ring-2 focus:ring-green-400 w-full sm:w-auto">
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </option>
          ))}
        </select>
      </div>

      {/* Products grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.length > 0 ? (
          products.map((product) => (
            <div
              key={product.id}
              className="border rounded-lg p-4 hover:bg-green-50 shadow flex flex-col">
              <img
                src={product.thumbnail}
                alt={product.title}
                className="w-full h-48 object-cover mb-3 rounded"
              />
              <h2 className="text-lg font-semibold mb-1">{product.title}</h2>
              <p className="text-gray-700 text-sm flex-1">
                {product.description}
              </p>
              <div className="mt-2">
                <p className="text-yellow-600 font-bold">${product.price}</p>
                <p className="text-gray-500 text-sm">{product.brand}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">
            No products found in this category.
          </p>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;
