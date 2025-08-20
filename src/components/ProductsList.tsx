import React from "react";
import ProductCard from "./ProductCard";
import { useProducts } from "../hooks/useProducts";

const ProductList: React.FC = () => {
  const { products, deleteProduct } = useProducts();

  const handleDelete = (id: number) => {
    deleteProduct(id);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-4">
      {products.length ? (
        products.map((p) => (
          <ProductCard key={p.id} product={p} onDelete={handleDelete} />
        ))
      ) : (
        <p className="text-center text-gray-500 col-span-full">
          No products found.
        </p>
      )}
    </div>
  );
};

export default ProductList;
