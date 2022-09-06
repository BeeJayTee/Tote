import { useEffect, useState } from "react"
import { useProductsContext } from "../hooks/useProductsContext"
import { useAuthContext } from "../hooks/useAuthContext"

const EditModal = (props) => {
    const {dispatch} = useProductsContext()
    const [producerID, setProducerID] = useState('test id')
    const [productID, setProductID] = useState('a value')
    const [name, setName] = useState('a value')
    const [type, setType] = useState('a value')
    const [amount, setAmount] = useState('a value')
    const [unit, setUnit] = useState('a value')
    const [pricePerUnit, setPricePerUnit] = useState('a value')
    const [minPurchase, setMinPurchase] = useState('a value')
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])
    const {user} = useAuthContext()

    const product = props.product

    useEffect(() => {
        setProducerID(product.producerID)
        setProductID(product._id)
        setName(product.name)
        setType(product.type)
        setAmount(product.amount)
        setUnit(product.unit)
        setPricePerUnit(product.pricePerUnit)
        setMinPurchase(product.minPurchase)
    }, [props.show, product.producerID, product._id, product.name, product.type, product.amount, product.unit, product.pricePerUnit, product.minPurchase])

    const handleSubmit = async (e) => {
        e.preventDefault()
        
        const product = {producerID, _id: productID, name, type, amount, unit, pricePerUnit, minPurchase}
        const response = await fetch('http://localhost:4141/products/', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            },
            body: JSON.stringify(product)
        })

        const json = await response.json()

        if (!response.ok) {
            setError(json.error)
            setEmptyFields(json.emptyFields)
        }

        if (response.ok) {
            setEmptyFields([])
            setError(null)
            setName('')
            setType('')
            setUnit('')
            setPricePerUnit('')
            setAmount('')
            setMinPurchase('')
            dispatch({type: 'EDIT_PRODUCT', payload: product})
            // remove the modal from the screen
            props.setShowFalse()
        }
    }

    if (!props.show) {
        return null
    }

    return (
        <div className="modal">
            <div className="modal-content">
                <div className="modal-header">
                    <h4 className="modal-title">Modal Title</h4>
                </div>
                <div className="modal-body">
                    <form className="add-product-form" onSubmit={handleSubmit}>
                        <h3>Add a New Product</h3>
                        <label>Product Name: </label>
                        <input 
                            type='text'
                            onChange={(e) => setName(e.target.value)}
                            value={props.show && name}
                            className={emptyFields.includes('name') ? 'error-input' : ''}
                        />
                        <label>Product Type: </label>
                        <select
                            value={type}
                            onChange={(e) => setType(e.target.value)}
                            className={emptyFields.includes('unit') ? 'error-input' : ''}
                        >
                            <option value=''>select type</option>
                            <option value="produce">produce</option>
                            <option value="meat">meat</option>
                            <option value="dairy">dairy</option>
                            <option value="other">other</option>
                        </select>
                        <label>Amount Availbale: </label>
                        <input 
                            type='number'
                            onChange={(e) => setAmount(e.target.value)}
                            value={amount}
                            className={emptyFields.includes('amount') ? 'error-input' : ''}
                        />
                        <label>Unit: </label>
                        <select
                            value={unit}
                            onChange={(e) => setUnit(e.target.value)}
                            className={emptyFields.includes('unit') ? 'error-input' : ''}
                        >
                            <option value=''>select unit</option>
                            <option value="lbs">lbs</option>
                            <option value="bunches">bunches</option>
                            <option value="kg">kg</option>
                            <option value="each">each</option>
                        </select>
                        <label>Price Per Unit: </label>
                        <input 
                            type='number'
                            onChange={(e) => setPricePerUnit(e.target.value)}
                            value={pricePerUnit}
                            className={emptyFields.includes('pricePerUnit') ? 'error-input' : ''}
                        />
                        <label>Minimum Purchase Amount: </label>
                        <input 
                            type='number'
                            onChange={(e) => setMinPurchase(e.target.value)}
                            value={minPurchase}
                            className={emptyFields.includes('minPurchase') ? 'error-input' : ''}
                        />
                        <button>Edit Product</button>
                        {error && <div className="error">{error}</div>}
                    </form>
                </div>
                <div className="modal-footer">
                    <button onClick={props.onClose} className="button">cancel</button>
                </div>
            </div>
        </div>
    )
}

export default EditModal