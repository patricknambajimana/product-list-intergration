import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import type { Product } from "../type/Products";
import { useProducts } from "../hooks/useProducts";

const ProductForm: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { addProduct, updateProduct } = useProducts();

  const editingProduct = location.state?.product as Product | undefined;

  const [formData, setFormData] = useState<Omit<Product, "id" | "rating">>({
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
      setFormData({ title, description, category, price, brand, thumbnail });
    }
  }, [editingProduct]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "price" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingProduct) {
        await updateProduct(editingProduct.id, formData);
      } else {
        await addProduct(formData);
      }
      navigate("/");
    } catch (error) {
      console.error("Error submitting product:", error);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen w-screen bg-green-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center text-green-700">
          {editingProduct ? "Edit Product" : "Add New Product"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="title"
            placeholder="Product Title"
            value={formData.title}
            onChange={handleChange}
            className="border p-2 w-full rounded focus:ring-2 focus:ring-green-400"
            required
          />
          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            className="border p-2 w-full rounded focus:ring-2 focus:ring-green-400"
            required
          />
          <input
            type="text"
            name="category"
            placeholder="Category"
            value={formData.category}
            onChange={handleChange}
            className="border p-2 w-full rounded focus:ring-2 focus:ring-green-400"
            required
          />
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={formData.price}
            onChange={handleChange}
            className="border p-2 w-full rounded focus:ring-2 focus:ring-green-400"
            required
          />
          <input
            type="text"
            name="brand"
            placeholder="Brand"
            value={formData.brand}
            onChange={handleChange}
            className="border p-2 w-full rounded focus:ring-2 focus:ring-green-400"
            required
          />
          <input
            type="text"
            name="thumbnail"
            placeholder="Thumbnail URL"
            value={formData.thumbnail}
            onChange={handleChange}
            className="border p-2 w-full rounded focus:ring-2 focus:ring-green-400"
            required
          />
          <div className="flex justify-between mt-6">
            <button
              type="submit"
              className="bg-green-600 text-white px-5 py-2 rounded hover:bg-green-700 transition"
            >
              {editingProduct ? "Update Product" : "Add Product"}
            </button>
            <button
              type="button"
              onClick={() => navigate("/")}
              className="bg-gray-400 text-white px-5 py-2 rounded hover:bg-gray-500 transition"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductForm;
