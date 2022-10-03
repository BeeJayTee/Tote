import { useContext } from "react";
import { ShoppingCartContext } from "../context/ShoppingCartContext";

export const useShoppingCartContext = () => {
  const context = useContext(ShoppingCartContext);

  if (!context) {
    throw Error(
      "useProductsContext must be used inside a ProductsContextProvider"
    );
  }

  return context;
};
