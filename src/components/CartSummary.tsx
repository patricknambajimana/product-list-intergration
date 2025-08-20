import React from "react";

interface CartSummaryProps {
  totalItems: number;
  subtotal: number;
  discountedTotal: number;
  onDeleteCart: () => void;
}

const CartSummary: React.FC<CartSummaryProps> = ({ totalItems, subtotal, discountedTotal, onDeleteCart }) => (
  <div className="w-full md:w-1/3 bg-white p-4 rounded shadow-md">
    <h2 className="text-xl font-bold mb-4 text-green-700">Cart Summary</h2>
    <p>Total Items: {totalItems}</p>
    <p>Subtotal: ${subtotal}</p>
    <p className="font-bold text-green-700">Discounted Total: ${discountedTotal}</p>
    <button onClick={onDeleteCart} className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600 mt-4">
      Delete Cart
    </button>
  </div>
);

export default CartSummary;
