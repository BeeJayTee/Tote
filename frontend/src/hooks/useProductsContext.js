import { useContext } from "react";
import { ProductsContext } from "../context/ProductContext";

export const useProductsContext = () => {
    const context = useContext(ProductsContext)

    if (!context) {
        throw Error('useProductsContext must be used inside a ProductsContextProvider')
    }

    return context
}