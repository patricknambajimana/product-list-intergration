import React from "react";
import type { Product } from "../../type/Products";

export interface productprops {
  product: Product;
}

const ProductCard: React.FC<productprops> = ({ product }) => {
  return (
    <div className="flex flex-col text-2xl border-0 rounded-2xl shadow-2xl w-full p-4 hover:bg-gray-200 relative top-30">
      <h1 className="text-center w-full  text-green-700 bg-neutral-100 p-4 ">
        {product.title}
      </h1>
      <div className="w-full place-items-center ">
        <img src={product.thumbnail} className="w-55  " />
      </div>
      <span className="text-xl p-5">{product.description}</span>
      <div className="flex justify-between space-y-2 mr-4 ml-5">
        <span className="text-1xl capitalize">
          categoty:<strong className="text-xl">{product.category}</strong>
        </span>
        <span className="font-extrabold text-1xl capitalize">
          <strong className="text-xl">{product.brand}</strong>
        </span>
      </div>
      <div className="flex justify-between space-y-2 mr-4 ml-5">
        <span className="font-extrabold text-xl capitalize mr-4 ml-5 ">
          price:<strong className="text-yellow-400">${product.price}</strong>
        </span>
        <span className="font-extrabold text-xl capitalize mr-4 ml-5">
          rate:{product.rating}
        </span>
      </div>
      <div className="flex gap-5 ml-2">
        <div className=" capitalize w-25 text-center rounded bg-neutral-300 text-2xl text-green-600 ">
          <button type="button" className="p-2 capitalize">
            edit
          </button>
        </div>
        <div className=" capitalize w-25 text-center rounded bg-neutral-300 text-2xl text-green-600 ">
          <button type="button" className="p-2 capitalize">
            view
          </button>
        </div>
        <div className="text-red-500 w-25 text-center rounded bg-neutral-300 capitalize">
          <button type="button" className="p-2 capitalize">
            delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
