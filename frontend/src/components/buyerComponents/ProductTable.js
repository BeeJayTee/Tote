import { useState } from 'react'
import { useAuthContext } from '../../hooks/useAuthContext'

const ProductTable = ({products, productsMessage, hidden}) => {
    const [error, setError] = useState(null)
    const [errorIDs, setErrorIDs] = useState([])

    const { user } = useAuthContext()

    const handleSubmit = async (e, id, minPurchase) => {
        if (e.target[0].value < minPurchase) {
            e.preventDefault()
            setErrorIDs([...errorIDs, id])
            setError(`You must order at least ${minPurchase}.`)
            return
        }
        setError(null)
        const updateNumber = e.target[0].value
        const response = await fetch('http://localhost:4141/products/' + id, {
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${user.token}`,
                'Content-type': 'application/json'
            },
            body: JSON.stringify({updateNumber: updateNumber})
        })
        const json = await response.json()
        console.log(json)
    }

    return (
        <div className="ProductTable">
            <div className={hidden}>
                {productsMessage && <div>{productsMessage}</div>}
                <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Type</th>
                                <th>Amount</th>
                                <th>Price per Unit</th>
                                <th>Minimum</th>
                                <th>Producer</th>
                                <th>&nbsp;</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product, index) => (
                                <tr key={product._id} className={index % 2 === 0 ? 'dark-row' : ''}>
                                    <td>{product.name}</td>
                                    <td>{product.type}</td>
                                    <td>{product.amount} {product.unit}</td>
                                    <td>{product.pricePerUnit}</td>
                                    <td>{product.minPurchase}</td>
                                    <td>{product.organization}</td>
                                    <td>
                                        <form onSubmit={(e) => handleSubmit(e, product._id, product.minPurchase)}>
                                            <input type="number" name="number" />
                                            <button>Add to cart</button>
                                            {error && errorIDs.includes(product._id) && <div className='error'>{error}</div>}
                                        </form>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
    )
}

export default ProductTable