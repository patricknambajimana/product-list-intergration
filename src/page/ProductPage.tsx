import React from "react";
import Navbar from "../components/NavBar";
import ProductList from "../components/ProductsList";

const ProductPage: React.FC = () => {
  return (
    <div>
      <Navbar />
      <div className="mt-50 p-4 md:p-6">
        <ProductList />
      </div>
    </div>
  );
};

export default ProductPage;
