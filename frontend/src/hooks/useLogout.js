import { useAuthContext } from "./useAuthContext"
import { useProductsContext } from "./useProductsContext"

export const useLogout = () => {
    const { dispatch } = useAuthContext()
    const { dispatch:workoutsDispatch } = useProductsContext()
    const logout = () => {
        localStorage.removeItem('user')

        dispatch({type: 'LOGOUT'})
        workoutsDispatch({type: 'SET_PRODUCTS', payload: null})
    }
    return { logout }
}