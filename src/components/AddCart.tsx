import React from "react";
import { useNavigate } from "react-router-dom";
import { useProducts } from "../hooks/useProducts";
import CartItem from "./CartItem";
import CartSummary from "./CartSummary";

const AddCart: React.FC = () => {
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
  const subtotal = cart.total;
  const discountedTotal = cart.discountedTotal;

  return (
    <div className="container mx-auto mt-20 p-4 flex flex-col md:flex-row gap-6">
      <div className="flex-1 bg-white p-4 rounded shadow-md">
        <h1 className="text-2xl font-bold mb-6 text-center text-green-700">
          Your Cart
        </h1>

        {/* Back to Products button */}
        <button
          className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={() => navigate("/products")}>
          &larr; Back to Products
        </button>

        {cart.products.map((product) => (
          <CartItem key={product.id} product={product} cartId={cart.id} />
        ))}
      </div>

      <CartSummary
        totalItems={totalItems}
        subtotal={subtotal}
        discountedTotal={discountedTotal}
        onDeleteCart={() => deleteCart(cart.id)}
      />
    </div>
  );
};

export default AddCart;
