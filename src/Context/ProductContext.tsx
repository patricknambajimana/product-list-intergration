import React, {
  createContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import type { Product, Cart, CartResponse } from "../type/Products";
import api from "../App/api";

interface ProductContextType {
  products: Product[];
  carts: Cart[];
  categories: string[];
  smartphones: Product[];
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  sortOrder: "asc" | "desc";
  setSortOrder: (order: "asc" | "desc") => void;
  fetchProducts: () => void;
  fetchCategories: () => void;
  fetchSmartphones: () => void;
  addProduct: (newProduct: Partial<Product>) => Promise<void>;
  updateProduct: (
    id: number,
    updatedProduct: Partial<Product>
  ) => Promise<void>;
  deleteProduct: (id: number) => Promise<void>;
  fetchCarts: () => void;
  deleteCart: (id: number) => Promise<void>;
  addToCart: (
    userId: number,
    product: { id: number; quantity: number }
  ) => Promise<void>;
  removeCartItem: (cartId: number, productId: number) => Promise<void>;
}

export const ProductContext = createContext<ProductContextType | undefined>(
  undefined
);

export const ProductProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [carts, setCarts] = useState<Cart[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [smartphones, setSmartphones] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  // Fetch products
  const fetchProducts = async () => {
    try {
      let url = "/products";
      if (searchTerm) url = `/products/search?q=${searchTerm}`;
      else if (sortOrder) url = `/products?sortBy=title&order=${sortOrder}`;
      const res = await api.get<{ products: Product[] }>(url);
      setProducts(res.data.products);
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };

  // Fetch categories
  const fetchCategories = async () => {
    try {
      const res = await fetch("https://dummyjson.com/products/categories");
      const data: string[] = await res.json();
      setCategories(data);
    } catch (err) {
      console.error("Error fetching categories:", err);
    }
  };

  // Fetch smartphones
  const fetchSmartphones = async () => {
    try {
      const res = await fetch(
        "https://dummyjson.com/products/category/smartphones"
      );
      const data = await res.json();
      setSmartphones(data.products);
    } catch (err) {
      console.error("Error fetching smartphones:", err);
    }
  };

  // Add product
  const addProduct = async (newProduct: Partial<Product>) => {
    try {
      const res = await api.post<Product>("/products/add", newProduct);
      setProducts((prev) => [...prev, res.data]);
    } catch (err) {
      console.error("Error adding product:", err);
    }
  };

  // Update product
  const updateProduct = async (
    id: number,
    updatedProduct: Partial<Product>
  ) => {
    try {
      const res = await api.put<Product>(`/products/${id}`, updatedProduct);
      setProducts((prev) => prev.map((p) => (p.id === id ? res.data : p)));
    } catch (err) {
      console.error("Error updating product:", err);
    }
  };

  // Delete product
  const deleteProduct = async (id: number) => {
    try {
      await api.delete(`/products/${id}`);
      setProducts((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      console.error("Error deleting product:", err);
    }
  };

  // Fetch carts
  const fetchCarts = async () => {
    try {
      const res = await fetch("https://dummyjson.com/carts");
      const data: CartResponse = await res.json();
      setCarts(data.carts);
    } catch (err) {
      console.error("Error fetching carts:", err);
    }
  };

  // Delete cart
  const deleteCart = async (cartId: number) => {
    try {
      const res = await fetch(`https://dummyjson.com/carts/${cartId}`, {
        method: "DELETE",
      });
      await res.json();
      setCarts((prev) => prev.filter((cart) => cart.id !== cartId));
    } catch (err) {
      console.error("Error deleting cart:", err);
    }
  };

  // Add to cart
  const addToCart = async (
    userId: number,
    product: { id: number; quantity: number }
  ) => {
    try {
      const res = await fetch("https://dummyjson.com/carts/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId,
          products: [product],
        }),
      });
      const data = await res.json();
      console.log("Added to cart:", data);
      fetchCarts();
    } catch (err) {
      console.error("Error adding to cart:", err);
    }
  };

  // Remove cart item
  const removeCartItem = async (cartId: number, productId: number) => {
    try {
      const res = await fetch(`https://dummyjson.com/carts/${cartId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          merge: true,
          products: [{ id: productId, quantity: 0 }],
        }),
      });
      const data = await res.json();
      console.log("Removed item:", data);
      fetchCarts();
    } catch (err) {
      console.error("Error removing cart item:", err);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
    fetchSmartphones();
    fetchCarts();
  }, [searchTerm, sortOrder]);

  return (
    <ProductContext.Provider
      value={{
        products,
        carts,
        categories,
        smartphones,
        searchTerm,
        setSearchTerm,
        sortOrder,
        setSortOrder,
        fetchProducts,
        fetchCategories,
        fetchSmartphones,
        addProduct,
        updateProduct,
        deleteProduct,
        fetchCarts,
        deleteCart,
        addToCart,
        removeCartItem,
      }}>
      {children}
    </ProductContext.Provider>
  );
};
