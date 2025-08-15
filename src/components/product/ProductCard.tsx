// ProductCard.tsx
import React from "react";
import { useNavigate } from "react-router-dom";
import type { Product } from "../../type/Products";
import api from "../../App/api";

interface ProductCardProps {
  product: Product;
  onDelete?: (id: number) => void;
  onUpdate?: (updated: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onDelete }) => {
  const navigate = useNavigate();

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    try {
      await api.delete(`/products/${product.id}`);
      onDelete?.(product.id);
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = () => {
    // navigate to ProductForm with state
    navigate("/product-form", { state: { product } });
  };

  const handleView = () => {
    navigate(`/products/${product.id}`);
  };

  return (
    <div className="flex flex-col border rounded-2xl shadow-lg p-4 hover:bg-gray-100">
      <h2 className="text-center text-green-700 text-2xl font-bold bg-gray-100 p-2 rounded">
        {product.title}
      </h2>
      <img
        src={product.thumbnail}
        alt={product.title}
        className="w-full h-48 object-cover my-2 rounded"
      />
      <p className="text-gray-700">{product.description}</p>
      <div className="flex justify-between mt-2">
        <span>
          Category: <strong>{product.category}</strong>
        </span>
        <span>
          Brand: <strong>{product.brand}</strong>
        </span>
      </div>
      <div className="flex justify-between mt-1">
        <span className="text-yellow-500 font-bold">
          Price: ${product.price}
        </span>
        <span>Rate: {product.rating}</span>
      </div>
      <div className="flex gap-2 mt-3">
        <button className="bg-green-300 px-3 py-1 rounded" onClick={handleEdit}>
          Edit
        </button>
        <button className="bg-blue-300 px-3 py-1 rounded" onClick={handleView}>
          View
        </button>
        <button
          className="bg-red-400 px-3 py-1 rounded text-white"
          onClick={handleDelete}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
