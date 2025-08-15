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

  // Hardcoded categories
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

  // Fetch products for selected category
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

  if (loading) return <div className="p-10 text-xl">Loading products...</div>;

  return (
    <div className="p-10 mt-20">
      <h1 className="text-3xl font-bold mb-6 text-green-700 ">
        {selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)}
      </h1>

      {/* Category select dropdown */}
      <div className="mb-6">
        <label className="mr-3 font-semibold">Select Category:</label>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="border p-2 rounded focus:ring-2 focus:ring-green-400">
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </option>
          ))}
        </select>
      </div>

      {/* Products grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 pl-20 pr-20">
        {products.length > 0 ? (
          products.map((product) => (
            <div
              key={product.id}
              className="border rounded-lg p-4 hover:bg-green-50 shadow">
              <img
                src={product.thumbnail}
                alt={product.title}
                className="w-full h-48 object-cover mb-3 rounded"
              />
              <h2 className="text-xl font-semibold">{product.title}</h2>
              <p className="text-gray-700">{product.description}</p>
              <p className="text-yellow-600 font-bold mt-2">${product.price}</p>
              <p className="text-gray-500 text-sm mt-1">{product.brand}</p>
            </div>
          ))
        ) : (
          <p>No products found in this category.</p>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;
