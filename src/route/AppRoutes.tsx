import { Routes, Route } from "react-router-dom";
import HomePage from "../page/HomePage";
import ProductPage from "../page/ProductPage";
import CategoryPage from "../page/CategoryPage";
import CartPage from "../page/CartPage";
import ProductDetails from "../components/ProductDetails";
import ProductForm from "../components/ProductForm";
const AppRoutes = () => {
  return (
    <Routes>
      <Route index element={<HomePage />} />
      <Route path="products" element={<ProductPage />} />
      <Route path="categories" element={<CategoryPage />} />
      <Route path="products/:id" element={<ProductDetails />} />
      <Route path="add-product" element={<ProductForm />} />
      <Route path="edit-product/:id" element={<ProductForm />} />
      <Route path="cart" element={<CartPage />} />
      <Route
        path="*"
        element={<div className="text-center">404 - Page Not Found</div>}
      />
    </Routes>
  );
};

export default AppRoutes;
