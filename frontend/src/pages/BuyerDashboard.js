import { useState, useEffect, useContext } from 'react'
import { useAuthContext } from '../hooks/useAuthContext'
import ProductTypesContext from '../context/ProductTypesContext'
import ProductTable from '../components/buyerComponents/ProductTable'
import MarketSelect from '../components/buyerComponents/MarketSelect'
import './styles/buyer-dashboard.css'

const BuyerDashboard = () => {
    const [allProducts, setAllProducts] = useState([])
    const [displayProducts, setDisplayProducts] = useState([])
    const [producerNames, setProducerNames] = useState([])
    const [producerName, setProducerName] = useState('')
    const [searchQuery, setSearchQuery] = useState('')
    const [productType, setProductType] = useState('')
    const [productsMessage, setProductsMessage] = useState(null)
    const [marketID, setMarketID] = useState('')
    const [hidden, setHidden] = useState('')

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
            const filteredProducts = json.filter(product => {
                return product.marketID === marketID
            })
            setAllProducts(filteredProducts)
            setDisplayProducts(filteredProducts)
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
    }, [user, marketID])

    useEffect(() => {
        if (displayProducts.length === 0) {
            return setProductsMessage('There are no products to display.')
        }
        setProductsMessage(null)
    }, [displayProducts])

    // changes when marketID is changed
    useEffect(() => {
        if (!marketID) {
            return setHidden('hidden')
        }
        setTimeout(() => {
            setHidden('')
        }, 100);
    }, [marketID])

    const handleChange = (type, input) => {
        const setDisplayProductsReducer = (query=null, producer=null, type=null) => {
            let products = allProducts
            if (query.length) {
                products = products.filter(product => {
                    return product.name.startsWith(query)
                })
                setProductsMessage(null)
            }
            if (producer) {
                products = products.filter(product => {
                    return product.producerID === producer
                })
                setProductsMessage(null)
            }
            if (type) {
                products = products.filter(product => {
                    return product.type === type
                })
                setProductsMessage(null)
            }

            setDisplayProducts(products)
        }

        switch(type) {
            case 'query':
                if (input === '') {
                    setDisplayProducts(allProducts)
                    break
                }
                setDisplayProductsReducer(input, producerName, productType)
                break
            case 'producer':
                setDisplayProductsReducer(searchQuery, input, productType)
                break
            case 'type':
                setDisplayProductsReducer(searchQuery, producerName, input)
                break
            default:
                break
        }
    }


    return (
        <div className="BuyerDashboard">
            <MarketSelect marketID={marketID} setMarketID={setMarketID}/>
            <form className={hidden}>
                <input
                    type="text"
                    onChange={(e) => {
                        setSearchQuery(e.target.value)
                        handleChange('query', e.target.value)
                    }}
                    value={searchQuery}
                />

                {/* producer name dropdown */}
                <label>Producer</label>
                <select
                    name="producers"
                    onChange={(e) => {
                        setProducerName(e.target.value)
                        handleChange('producer', e.target.value)
                    }}
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
                    onChange={(e) => {
                        setProductType(e.target.value)
                        handleChange('type', e.target.value)
                    }}
                >
                        <option value="">No Product Type Selected</option>
                        {types.map(type => (
                            <option key={type} value={type}>{type}</option>
                        ))}
                </select>
            </form>
            <ProductTable hidden={hidden} products={displayProducts} productsMessage={productsMessage}/>
        </div>
    )
}

export default BuyerDashboard