import { createContext, useReducer } from "react";

export const ShoppingCartContext = createContext();

export const shoppingCartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_PRODUCT":
      if (state.cartProducts) {
        return { cartProducts: [action.payload, ...state.cartProducts] };
      } else {
        return { cartProducts: [action.payload] };
      }
    case "DELETE_PRODUCT":
      return {
        cartProducts: state.cartProducts.filter(
          (p) => p._id !== action.payload._id
        ),
      };
    case "EDIT_PRODUCT":
      let productToReplace = state.cartProducts.filter(
        (p) => p._id === action.payload._id
      );
      productToReplace = action.payload;
      const remainingProducts = state.cartProducts.filter(
        (p) => p._id !== action.payload._id
      );
      return { cartProducts: [productToReplace, ...remainingProducts] };
    default:
      return state;
  }
};

export const ShoppingCartContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(shoppingCartReducer, {
    cartProducts: null,
  });

  return (
    <ShoppingCartContext.Provider value={{ ...state, dispatch }}>
      {children}
    </ShoppingCartContext.Provider>
  );
};
