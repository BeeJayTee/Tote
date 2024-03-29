import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { ProductsContextProvider } from "./context/ProductContext";
import { AuthContextProvider } from "./context/AuthContext";
import { ProductTypesProvider } from "./context/ProductTypesContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <ProductsContextProvider>
        <ProductTypesProvider>
          <App />
        </ProductTypesProvider>
      </ProductsContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
