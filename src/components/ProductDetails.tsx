import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useProducts } from "../hooks/useProducts";
import type { Product } from "../type/Products";

const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { products } = useProducts(); // get products from context

  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    if (!id) return;

    const foundProduct = products.find((p) => p.id === Number(id));
    setProduct(foundProduct || null);
  }, [id, products]);

  if (!product)
    return (
      <div className="flex items-center justify-center min-h-screen text-xl text-gray-600">
        Loading...
      </div>
    );

  return (
    <div className="flex items-center justify-center min-h-screen bg-green-50 p-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-xl">
        <button
          onClick={() => navigate(-1)}
          className="mb-6 px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500 transition"
        >
          Back
        </button>

        <h1 className="text-4xl font-bold text-green-700 mb-4 text-center">
          {product.title}
        </h1>

        <div className="flex flex-col md:flex-row gap-6">
          <img
            src={product.thumbnail}
            alt={product.title}
            className="w-full md:w-1/2 h-auto object-cover rounded-lg shadow"
          />

          <div className="flex-1 flex flex-col gap-2">
            <p className="text-gray-700 text-lg">{product.description}</p>
            <div className="flex justify-between mt-4">
              <span className="font-medium">
                Category: <strong>{product.category}</strong>
              </span>
              <span className="font-medium">
                Brand: <strong>{product.brand}</strong>
              </span>
            </div>
            <div className="flex justify-between mt-2">
              <span className="text-yellow-500 font-bold text-lg">
                Price: ${product.price}
              </span>
              <span className="font-semibold text-lg">
                Rating: {product.rating}
              </span>
            </div>
            <div className="flex flex-col text-xl">
              <span className="mt-2 text-gray-600">Stock: {product.stock}</span>
              <span className="mt-2 text-gray-600">
                Quantity: {product.quantity}
              </span>
              <span className="mt-2 text-gray-600">
                Weight: {product.weight}
              </span>
              <span className="mt-2 text-gray-600">
                Discount: {product.discountPercentage}%
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
