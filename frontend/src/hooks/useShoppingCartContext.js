import { useContext } from "react";
import { ShoppingCartContext } from "../context/ProductContext";

export const useProductsContext = () => {
  const context = useContext(ShoppingCartContext);

  if (!context) {
    throw Error(
      "useProductsContext must be used inside a ProductsContextProvider"
    );
  }

  return context;
};
