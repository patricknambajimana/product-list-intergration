import React, { createContext, useState, useEffect, type ReactNode } from "react";
import axios from "axios";

interface CartItem {
  id: number;
  quantity: number;
  [key: string]: any;
}

interface CartContextType {
  cartItems: CartItem[];
  totalItems: number;
  fetchCartItems: () => Promise<void>;
}

export const CartContext = createContext<CartContextType | undefined>(
  undefined
);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [totalItems, setTotalItems] = useState(0);

  const fetchCartItems = async () => {
    try {
      const res = await axios.get("https://dummyjson.com/carts");
      const allProducts: CartItem[] = [];

      res.data.carts.forEach((cart: any) => {
        cart.products.forEach((prod: any) => allProducts.push(prod));
      });

      setCartItems(allProducts);
      const total = allProducts.reduce((sum, item) => sum + (item.quantity ?? 0), 0);
      setTotalItems(total);
    } catch (err) {
      console.error("Error fetching carts:", err);
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

  return (
    <CartContext.Provider value={{ cartItems, totalItems, fetchCartItems }}>
      {children}
    </CartContext.Provider>
  );
};
