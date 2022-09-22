import { createContext } from "react";
import productTypes from '../data/productTypes'

const ProductTypesContext = createContext()

export function ProductTypesProvider({children}) {
    return (
        <ProductTypesContext.Provider value={{ types: productTypes }}>
            {children}
        </ProductTypesContext.Provider>
    )
}

export default ProductTypesContext