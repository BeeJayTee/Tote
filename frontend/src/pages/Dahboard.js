import { useEffect, useState } from 'react'
import AddProduct from '../components/AddProduct'
import DashboardMenu from '../components/DashboardMenu'
import ProducerProduct from '../components/ProducerProduct'

const Home = () => {
    const [products, setProducts] = useState(null)

    useEffect(() => {
        // test id for testing. Need to replace with current user ID after auth added
        const producerID = 'test id'

        const fetchProducts = async () => {
            const response = await fetch('http://localhost:4141/products/producer/' + producerID)
            const products = await response.json()
            
            if (response.ok) {
                setProducts(products)
                console.log(products)
            }
        }

        fetchProducts()
    }, [])

    return (
        <div className="home container">
            <nav>
                <DashboardMenu />
            </nav>
            <div className="main">
                <div className="products">
                    {products && <ProducerProduct products={products} />}
                </div>
                <AddProduct />
            </div>
        </div>

    )
}

export default Home