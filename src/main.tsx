import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ProductProvider } from "./Context/ProductContext.tsx";
import { AuthProvider } from "./Context/AuthContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
      <AuthProvider>
        <ProductProvider>
          <App />
        </ProductProvider>
      </AuthProvider>
  </StrictMode>
);
