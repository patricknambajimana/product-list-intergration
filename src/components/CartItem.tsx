import React from "react";
import type { Product } from "../type/Products";
import { Trash } from "lucide-react";
import { useProducts } from "../hooks/useProducts";

interface CartItemProps {
  product: Product;
  cartId: number;
}

const CartItem: React.FC<CartItemProps> = ({ product, cartId }) => {
  const { removeCartItem } = useProducts()!;

  const handleRemove = () => {
    removeCartItem(cartId, product.id);
  };

  return (
    <div className="flex justify-between items-center border-b py-2">
      <div className="flex items-center gap-4">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="w-16 h-16 object-cover rounded"
        />
        <div>
          <h3 className="font-semibold">{product.title}</h3>
          <p className="text-gray-600">
            {product.quantity} × ${product.price}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <span className="font-semibold">${product.total}</span>
        <button
          onClick={handleRemove}
          className="text-red-500 hover:text-red-700">
          <Trash />
        </button>
      </div>
    </div>
  );
};

export default CartItem;
