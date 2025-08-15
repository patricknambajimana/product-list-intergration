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
    navigate("/edit-product", { state: { product } });
  };

  const handleView = () => {
    navigate(`/products/${product.id}`);
  };

  return (
    <div className="flex flex-col rounded-2xl shadow-lg p-4 hover:bg-gray-100 transition-all duration-300 w-full sm:max-w-sm md:max-w-md mx-auto">
      {/* Title */}
      <h2 className="text-center text-green-700 text-xl sm:text-2xl font-bold bg-gray-100 p-2 rounded">
        {product.title}
      </h2>

      {/* Image */}
      <img
        src={product.thumbnail}
        alt={product.title}
        className="w-full h-40 sm:h-48 md:h-56 object-cover my-2 rounded"
      />

      {/* Description */}
      <p className="text-gray-700 text-sm sm:text-base">
        {product.description}
      </p>

      {/* Category + Brand */}
      <div className="flex flex-col sm:flex-row justify-between mt-2 gap-1 text-sm sm:text-base">
        <span>
          Category: <strong>{product.category}</strong>
        </span>
        <span>
          Brand: <strong>{product.brand}</strong>
        </span>
      </div>

      {/* Price + Rating */}
      <div className="flex flex-col sm:flex-row justify-between mt-1 text-sm sm:text-base">
        <span className="text-yellow-500 font-bold">
          Price: ${product.price}
        </span>
        <span>Rate: {product.rating}</span>
      </div>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row gap-2 mt-3">
        <button
          className="bg-green-300 px-3 py-1 rounded hover:bg-green-400 transition"
          onClick={handleEdit}>
          Edit
        </button>
        <button
          className="bg-blue-300 px-3 py-1 rounded hover:bg-blue-400 transition"
          onClick={handleView}>
          View
        </button>
        <button
          className="bg-red-400 px-3 py-1 rounded text-white hover:bg-red-500 transition"
          onClick={handleDelete}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
