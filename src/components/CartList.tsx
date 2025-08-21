import React from "react";
import { useNavigate } from "react-router-dom";
import { useProducts } from "../hooks/useProducts";
import CartItem from "./CartItem";

const CartList: React.FC = () => {
  const navigate = useNavigate();
  const { carts, deleteCart } = useProducts()!;

  if (!carts || carts.length === 0)
    return (
      <p className="text-gray-500 mt-6 text-center">No carts available.</p>
    );

  const cart = carts[0]; // show first cart
  const totalItems = cart.products.reduce(
    (sum, p) => sum + (Number(p.quantity) || 0),
    0
  );

  return (
    <div className="container mx-auto mt-20 p-4 flex flex-col md:flex-row gap-6">
      <div className="flex-1 bg-white p-4 rounded shadow-md">
        <h1 className="text-2xl font-bold mb-6 text-center text-green-700">
          Your Cart ({totalItems} items)
        </h1>

        <button
          className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={() => navigate("/products")}>
          &larr; Back to Products
        </button>

        {cart.products.map((product) => (
          <CartItem key={product.id} product={product} cartId={cart.id} />
        ))}

        <div className="mt-4 flex justify-between items-center">
          <span className="font-bold">Subtotal:</span>
          <span className="font-bold">${cart.total}</span>
        </div>

        <button
          className="mt-4 w-full px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          onClick={() => deleteCart(cart.id)}>
          Delete Cart
        </button>
      </div>
    </div>
  );
};

export default CartList;
