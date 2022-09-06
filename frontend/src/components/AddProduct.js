import { useState } from "react";
import { useProductsContext } from "../hooks/useProductsContext";
import { useAuthContext } from '../hooks/useAuthContext'

const AddProduct = () => {
    const {dispatch} = useProductsContext()
    // producer id needs to be a dynamic value from the logged in user after auth set up
    const [name, setName] = useState('')
    const [type, setType] = useState('')
    const [amount, setAmount] = useState('')
    const [unit, setUnit] = useState('')
    const [pricePerUnit, setPricePerUnit] = useState('')
    const [minPurchase, setMinPurchase] = useState('')
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])
    const {user} = useAuthContext()

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!user) {
            setError('You must be logged in')
            return
        }
        
        const product = {name, type, amount, unit, pricePerUnit, minPurchase}

        const response = await fetch('http://localhost:4141/products/', {
            method: 'POST',
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
            dispatch({type: 'CREATE_PRODUCT', payload: json})
        }
    }

    return (
        <form className="add-product-form" onSubmit={handleSubmit}>
            <h3>Add a New Product</h3>
            <label>Product Name: </label>
            <input 
                type='text'
                onChange={(e) => setName(e.target.value)}
                value={name}
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
            <button>Add Product</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}

export default AddProduct