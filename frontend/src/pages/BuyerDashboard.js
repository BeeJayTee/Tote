import { useState, useEffect, useContext } from 'react'
import { useAuthContext } from '../hooks/useAuthContext'
import ProductTypesContext from '../context/ProductTypesContext'
import ProductTable from '../components/sellerComponents/ProductTable'

const BuyerDashboard = () => {
    const [allProducts, setAllProducts] = useState([])
    const [producerNames, setProducerNames] = useState([])
    const [producerName, setProducerName] = useState('')
    const [searchQuery, setSearchQuery] = useState('')
    const [productType, setProductType] = useState('')

    const { user } = useAuthContext()
    const { types } = useContext(ProductTypesContext)

    useEffect(() => {
        const fetchProducts = async () => {
            const response = await fetch('http://localhost:4141/products', {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })
            const json = await response.json()
            setAllProducts(json)
        }

        const fetchProducers = async () => {
            const response = await fetch('http://localhost:4141/products/producers', {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }  
            })
            const json = await response.json()
            setProducerNames(json)
        }


        if (user) {
            fetchProducts()
            fetchProducers()
        }
    }, [user])


    return (
        <div className="BuyerDashboard">
            <form>
                <input
                    type="text"
                    onChange={(e) => setSearchQuery(e.target.value)}
                    value={searchQuery}
                />

                {/* producer name dropdown */}
                <label>Producer</label>
                <select
                    name="producers"
                    onChange={(e) => setProducerName(e.target.value)}
                >
                        <option value="">No Producer Selected</option>
                        {producerNames.map(producer => (
                            <option key={producer._id} value={producer._id}>{producer[producer._id]}</option>
                        ))}
                </select>

                {/* product type dropdown */}
                <label>Product Type</label>
                <select
                    name="productTypes"
                    onChange={(e) => setProductType(e.target.value)}
                >
                        <option value="">No Product Type Selected</option>
                        {types.map(type => (
                            <option key={type} value={type}>{type}</option>
                        ))}
                </select>
            </form>
            <ProductTable products={allProducts}/>
        </div>
    )
}

export default BuyerDashboard