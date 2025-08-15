import { Routes, Route } from "react-router-dom";
import HomePage from "../page/HomePage";
import ProductForm from "../components/product/form/ProductForm";
import ProductDetails from "../components/product/ProductDetails";
import EditProduct from "../components/product/EditProduct";
import CategoryPage from "../page/CategoryPage";
import ProductList from "../components/product/ProductsList";
const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />}>
        <Route index element={<ProductList />} />
        <Route path="categories" element={<CategoryPage />} />
        <Route path="edit-product" element={<EditProduct />} />
        <Route path="products/:id" element={<ProductDetails />} />
        <Route path="add-product" element={<ProductForm />} />
      </Route>
      <Route path="*" element={<div className="text center">404 - Page Not Found</div>} />
    </Routes>
  );
};

export default AppRoutes;