import { useEffect, useState } from "react";
import api from "../../App/api";
import type { Cart } from "../../type/Products";
import type { CartResponse } from "../../type/Products";

const CartList: React.FC<Cart> = () => {
  const [carts, setCarts] = useState<Cart[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCarts = async () => {
      try {
        const res = await api.get<CartResponse>("/carts");
        setCarts(res.data.carts);
      } catch (err) {
        setError("Failed to fetch carts");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCarts();
  }, []);
  const removeCart = (id: number) => {
    setCarts((prevCarts) => prevCarts.filter((cart) => cart.id !== id));
  };
  const deleteCart = async (id: number) => {
    try {
      await api.delete(`/carts/${id}`);
      // remove from state after successful API delete
      setCarts((prevCarts) => prevCarts.filter((cart) => cart.id !== id));
    } catch (err) {
      console.error("Failed to delete cart", err);
      setError("Failed to delete cart");
    }
  };
  if (loading) return <p className="text-gray-500">Loading carts...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="container mx-auto mt-20 p-4">
      <h1 className="text-2xl font-bold mb-6">All Carts</h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {carts.map((cart) => (
          <div
            key={cart.id}
            className="bg-white shadow-lg rounded-xl p-4 border hover:shadow-xl transition">
            <h2 className="text-lg font-semibold mb-3">Cart #{cart.id}</h2>
            <ul className="space-y-2">
              {cart.products.map((product) => (
                <li
                  key={product.id}
                  className="flex justify-between items-center text-sm border-b pb-1">
                  <span>
                    {product.title} ({product.quantity} * ${product.price})
                  </span>
                  <span className="font-semibold">${product.total}</span>
                </li>
              ))}
            </ul>
            <div className="mt-4 border-t pt-2 text-right">
              <p className="text-gray-600">Subtotal: ${cart.total}</p>
              <p className="font-bold text-green-700">
                Discounted: ${cart.discountedTotal}
              </p>
            </div>
            <div className="flex text-xm gap-4 text-center">
              <button type="button" onClick={()=>{removeCart}} className="capitalize border-none  bg-red-400 p-3 rounded">
                delete
              </button>
              <button onClick={()=>{deleteCart}} className="capitalize border-none bg-green-400 p-3 rounded">edit</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CartList;
