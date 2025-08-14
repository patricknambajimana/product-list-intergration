import React, { useEffect, useState } from "react";
import api from "../../App/api";
import ProductCard from "./ProductCard";
import type { Product } from "../../type/Products";

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await api.get<{ products: Product[] }>("/products");
        setProducts(res.data.products);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div>
      <div>
        <h2 className="text-center text-5xl capitalize pt-10 text-green-900 bg-green-100 p-5 fixed w-full z-100">
          product Management
        </h2>
      </div>
      <div className="items-center w-full p-10 flex gap-3 justify-between relative top-30">
        <div className="w-100 ">
        <input
          type="search"
          placeholder="search product....."
          className="border border-green-600 focus:outline-none rounded-full w-full p-2 placeholder:text-xl"
        />
        </div>
        <div className="w-100 ">
          <select name="" id="" className="w-full text-right border focus:outline-none p-2 rounded-2xl capitalize ">
            <option value=""className="capitalize ">price</option>
            <option value="" className="capitalize">category</option> 
            <option value="" className="capitalize">brand</option>
          </select>
        </div>
        <div className="">
          <button className="p-3 capitalize  rounded  bg-green-100 text-2xl text-green-700 ">add product</button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-15 p-10 z-20">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
