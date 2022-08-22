import { useState } from "react";

const AddProduct = () => {
    // producer id needs to be a dynamic value from the logged in user after auth set up
    const [producerID, setProducerID] = useState('test id')
    const [name, setName] = useState('')
    const [type, setType] = useState('')
    const [amount, setAmount] = useState('')
    const [unit, setUnit] = useState('')
    const [minPurchase, setMinPurchase] = useState('')
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])

    const handleSubmit = async (e) => {
        e.preventDefault()
        
        const product = {producerID, name, type, amount, unit, minPurchase}

        const response = await fetch('http://localhost:4141/products/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(product)
        })

        const data = await response.json()

        if (!response.ok) {
            setError(data.error)
            setEmptyFields(data.emptyFields)
        }

        if (response.ok) {
            setEmptyFields([])
            setError(null)
            setName('')
            setType('')
            setUnit('')
            setAmount('')
            setMinPurchase('')
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
            <input 
                type='text'
                onChange={(e) => setType(e.target.value)}
                value={type}
                className={emptyFields.includes('type') ? 'error-input' : ''}
            />
            <label>Amount Available for Sale: </label>
            <input 
                type='number'
                onChange={(e) => setAmount(e.target.value)}
                value={amount}
                className={emptyFields.includes('amount') ? 'error-input' : ''}
            />
            <select
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
                className={emptyFields.includes('unit') ? 'error-input' : ''}
            >
                <option value=''>select unit</option>
                <option value="lbs">lbs</option>
            </select>
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