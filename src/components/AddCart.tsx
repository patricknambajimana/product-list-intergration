import React, { useEffect } from "react";
import { useProducts } from "../hooks/useProducts";
import { Trash } from "lucide-react";

const AddCart: React.FC = () => {
  const { carts, fetchCarts, deleteCart } = useProducts();

  // Fetch cart items on mount
  useEffect(() => {
    fetchCarts();
  }, []);

  const handleRemove = (cartId: number) => {
    deleteCart(cartId);
  };

  if (!carts || carts.length === 0)
    return <p className="text-gray-500 mt-6 text-center">Your cart is empty.</p>;

  return (
    <div className="container mx-auto mt-10 p-4">
      <h2 className="text-2xl font-bold mb-4 text-center text-green-700">My Cart</h2>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {carts.map((cart) => (
          <div
            key={cart.id}
            className="bg-white shadow-lg rounded-xl p-4 hover:bg-neutral-100 transition"
          >
            <h3 className="text-lg font-semibold mb-2">Cart #{cart.id}</h3>
            <ul className="space-y-2">
              {cart.products.map((product) => (
                <li
                  key={product.id}
                  className="flex justify-between items-center text-sm border-b pb-1"
                >
                  <span>
                    {product.title} ({product.quantity} × ${product.price})
                  </span>
                  <span className="font-semibold">${product.total}</span>
                </li>
              ))}
            </ul>
            <div className="mt-2 border-t pt-2 text-right">
              <p className="text-gray-600">Subtotal: ${cart.total}</p>
              <p className="font-bold text-green-700">Discounted: ${cart.discountedTotal}</p>
            </div>
            <div className="flex justify-center mt-3">
              <button
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition flex items-center gap-1"
                onClick={() => handleRemove(cart.id)}
              >
                <Trash className="w-4 h-4" /> Remove Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AddCart;
