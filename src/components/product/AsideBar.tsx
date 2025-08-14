import React from "react";
import { Link } from "react-router-dom";

const AsideBar: React.FC = () => {
  return (
    <div className="p-10 min-h-screen fixed w-80  text-green-900 bg-green-100  text-2xl">
      <Link to="/" className="text-xl font-bold mb-2  sm:mb-0">
        Product Management
      </Link>
      <div className="space-y-2 mt-10 text-xl flex flex-col ">
        <Link to="/products" className="hover:underline">
          Products
        </Link>
        <Link to="/categories" className="hover:underline">
          Categories
        </Link>
        <Link to="/add-product" className="hover:underline">
          Add Product
        </Link>
      </div>
    </div>
  );
};

export default AsideBar;
