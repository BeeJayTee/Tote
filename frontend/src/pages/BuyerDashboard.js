import { useState, useEffect } from 'react'
import { useAuthContext } from '../hooks/useAuthContext'

const BuyerDashboard = () => {
    const [allProducts, setAllProducts] = useState([])
    const [producerNames, setProducerNames] = useState([])
    const [producerName, setProducerName] = useState('poop')

    const { user } = useAuthContext()

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
                <select name="producers" id="producer-select">
                    <option value="">No Producer Selected</option>
                    {producerNames.map(producer => (
                        <option key={producer.id} value={producer.name}>{producer.name}</option>
                    ))}
                </select>
            </form>
        </div>
    )
}

export default BuyerDashboard