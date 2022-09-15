import { useState, useEffect, useContext } from 'react'
import { useAuthContext } from '../hooks/useAuthContext'
import ProductTypesContext from '../context/ProductTypesContext'
import productTypes from '../data/productTypes'
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
            const producersArr = []
            json.forEach(producer => {
                const obj = {}
                obj.id = producer._id
                obj.name = producer.organization
                producersArr.push(obj)
            })
            setProducerNames(producersArr)
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
                <label>Producer</label>
                <select
                    name="producers"
                    onChange={(e) => setProducerName(e.target.value)}
                >
                        <option value="">No Producer Selected</option>
                        {producerNames.map(producer => (
                            <option key={producer.id} value={producer.name}>{producer.name}</option>
                        ))}
                </select>
                <label>Product Type</label>
                <select
                    name="productTypes"
                    onChange={(e) => setProducerName(e.target.value)}
                >
                        <option value="">No Product Type Selected</option>
                        {productTypes.map(product => (
                            <option key={product} value={product}>{product}</option>
                        ))}
                </select>
            </form>
            <ProductTable products={allProducts} />
        </div>
    )
}

export default BuyerDashboard