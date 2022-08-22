import EditModal from './EditModal'
import { useState } from "react"

const ProducerProduct = ({products}) => {
    const [show, setShow] = useState(false)
    const [product, setProduct] = useState({})

    const handleEditClick = (e, currentProduct) => {
        setShow(true)
        setProduct(currentProduct)
    }

    const handleDeleteClick = async (e, id) => {
        const response = await fetch('http://localhost:4141/products/' + id, {
            method: 'DELETE'
        })
        const data = await response.json()
        console.log(data)
        if (response.ok) {
            window.location.reload()
        }

    }

    return (
        <div className="producer-products">
            <EditModal onClose={() => setShow(false)} show={show} product={product} />
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Type</th>
                        <th>Amount</th>
                        <th>Price per Unit</th>
                        <th>Minimum</th>
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
                            <td><button onClick={(e) => handleEditClick(e, product)}>Edit</button> | <button onClick={(e) => handleDeleteClick(e, product._id)}>Delete</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default ProducerProduct