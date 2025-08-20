// EditProduct.tsx
import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import type { Product } from "../type/Products";
import { useProducts } from "../hooks/useProducts";

const EditProduct: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { updateProduct } = useProducts(); // use context
  const editingProduct = location.state?.product as Product | undefined;

  const [product, setProduct] = useState<Omit<Product, "id" | "rating">>({
    title: "",
    description: "",
    category: "",
    price: 0,
    brand: "",
    thumbnail: "",
  });

  useEffect(() => {
    if (editingProduct) {
      const { title, description, category, price, brand, thumbnail } =
        editingProduct;
      setProduct({ title, description, category, price, brand, thumbnail });
    }
  }, [editingProduct]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setProduct((prev) => ({
      ...prev,
      [name]: name === "price" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;

    try {
      const updatedProduct = { ...product, rating: editingProduct.rating };
      await updateProduct(editingProduct.id, updatedProduct);
      navigate("/"); // go back to product list
    } catch (err) {
      console.error("Update failed:", err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50 px-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center text-green-700">
          Edit Product
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="title"
            placeholder="Product Title"
            value={product.title}
            onChange={handleChange}
            className="border p-2 w-full rounded focus:ring-2 focus:ring-green-400"
            required
          />
          <textarea
            name="description"
            placeholder="Description"
            value={product.description}
            onChange={handleChange}
            className="border p-2 w-full rounded focus:ring-2 focus:ring-green-400"
            required
          />
          <input
            type="text"
            name="category"
            placeholder="Category"
            value={product.category}
            onChange={handleChange}
            className="border p-2 w-full rounded focus:ring-2 focus:ring-green-400"
            required
          />
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={product.price}
            onChange={handleChange}
            className="border p-2 w-full rounded focus:ring-2 focus:ring-green-400"
            required
          />
          <input
            type="text"
            name="brand"
            placeholder="Brand"
            value={product.brand}
            onChange={handleChange}
            className="border p-2 w-full rounded focus:ring-2 focus:ring-green-400"
            required
          />
          <input
            type="text"
            name="thumbnail"
            placeholder="Thumbnail URL"
            value={product.thumbnail}
            onChange={handleChange}
            className="border p-2 w-full rounded focus:ring-2 focus:ring-green-400"
            required
          />
          <div className="flex justify-between mt-6">
            <button
              type="submit"
              className="bg-green-600 text-white px-5 py-2 rounded hover:bg-green-700 transition">
              Update Product
            </button>
            <button
              type="button"
              onClick={() => navigate("/")}
              className="bg-gray-400 text-white px-5 py-2 rounded hover:bg-gray-500 transition">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProduct;
