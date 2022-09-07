import { useEffect } from 'react'
import AddProduct from '../components/AddProduct'
import ProducerProduct from '../components/ProducerProduct'
import { useProductsContext } from '../hooks/useProductsContext'
import './styles/dashboard.css'
import { useAuthContext } from '../hooks/useAuthContext'

const SellerDashboard = () => {
    const {products, dispatch} = useProductsContext()
    const {user} = useAuthContext()

    useEffect(() => {
        // test id for testing. Need to replace with current user ID after auth added
        const producerID = JSON.parse(localStorage.getItem('user')).token

        const fetchProducts = async () => {
            const response = await fetch('http://localhost:4141/products/producer/' + producerID, {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })
            const json = await response.json()
            
            if (response.ok) {
                dispatch({type: 'SET_PRODUCTS', payload: json})
            }
        }
        if (user) {
            fetchProducts()
        }
    }, [dispatch, user])

    return (
        <div className="home container">
            <div className="main">
                <div className="products">
                    {products && <ProducerProduct />}
                </div>
                <AddProduct />
            </div>
        </div>

    )
}

export default SellerDashboard