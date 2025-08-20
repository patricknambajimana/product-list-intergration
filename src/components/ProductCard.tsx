import React from "react";
import { useNavigate } from "react-router-dom";
import type { Product } from "../type/Products";
import { Eye, SquarePen, Trash, ShoppingCart } from "lucide-react";
import { useProducts } from "../hooks/useProducts";

interface ProductCardProps {
  product: Product;
  onDelete?: (id: number) => void; // optional
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onDelete }) => {
  const navigate = useNavigate();
  const { addToCart } = useProducts(); // ✅ use addToCart from context

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    try {
      await fetch(`/products/${product.id}`, { method: "DELETE" });
      onDelete?.(product.id);
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddToCart = async () => {
    try {
      const userId = 1; // example: current logged-in user ID
      await addToCart(userId, { id: product.id, quantity: 1 });

      // Navigate to cart page after adding
      navigate("/cart");
    } catch (err) {
      console.error(err);
      alert("Failed to add product to cart.");
    }
  };

  return (
    <div className="flex flex-col rounded-2xl shadow-lg p-4 hover:bg-gray-100 transition-all duration-300 w-full sm:max-w-sm md:max-w-md mx-auto">
      <h2 className="text-center text-green-700 text-xl sm:text-2xl font-bold bg-gray-100 p-2 rounded">
        {product.title}
      </h2>
      <img
        src={product.thumbnail}
        alt={product.title}
        className="w-full h-40 sm:h-48 md:h-56 object-cover my-2 rounded"
      />
      <p className="text-gray-700 text-sm sm:text-base">
        {product.description}
      </p>
      <div className="flex flex-col sm:flex-row justify-between mt-2 gap-1 text-sm sm:text-base">
        <span>
          Category: <strong>{product.category}</strong>
        </span>
        <span>
          Brand: <strong>{product.brand}</strong>
        </span>
      </div>
      <div className="flex flex-col sm:flex-row justify-between mt-1 text-sm sm:text-base">
        <span className="text-yellow-500 font-bold">
          Price: ${product.price}
        </span>
        <span>Rate: {product.rating}</span>
      </div>
      <div className="flex flex-col sm:flex-row gap-2 mt-3">
        <button
          className="flex gap-1 text-white bg-neutral-500 rounded hover:bg-neutral-400 transition w-24 h-10 justify-center items-center"
          onClick={() => navigate("/edit-product", { state: { product } })}>
          <SquarePen className="size-5" /> Edit
        </button>
        <button
          className="flex gap-1 text-white bg-gray-500 rounded hover:bg-gray-400 transition w-24 h-10 justify-center items-center"
          onClick={() => navigate(`/products/${product.id}`)}>
          <Eye className="size-5" /> View
        </button>
        <button
          className="flex gap-1 text-white bg-red-500 rounded hover:bg-red-400 transition w-24 h-10 justify-center items-center"
          onClick={handleDelete}>
          <Trash className="size-5" /> Delete
        </button>
        <button
          className="flex gap-1 text-white bg-green-500 rounded hover:bg-green-400 transition w-32 h-10 justify-center items-center"
          onClick={handleAddToCart}>
          <ShoppingCart className="size-5" /> Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
