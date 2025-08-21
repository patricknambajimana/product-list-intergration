import React from "react";
import { Trash } from "lucide-react";
import { useProducts } from "../hooks/useProducts";
import type { Product } from "../type/Products";

interface CartItemProps {
  product: Product;
  cartId: number;
}

const CartItem: React.FC<CartItemProps> = ({ product, cartId }) => {
  const { removeCartItem, addToCart } = useProducts();

  const handleRemove = () => removeCartItem(cartId, product.id);

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const quantity = parseInt(e.target.value);
    if (quantity > 0) addToCart(cartId, { id: product.id, quantity });
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
            ${product.price} ×{" "}
            <input
              type="number"
              min={1}
              value={product.quantity}
              onChange={handleQuantityChange}
              className="w-12 border rounded px-1"
            />
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
