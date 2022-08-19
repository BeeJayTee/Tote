const Product = require('../models/productModel')
const mongoose = require('mongoose')

// get all products
const getProducts = async (req, res) => {
    const products = await Product.find({}).sort({createdAt: -1})

    res.status(200).json(products)
}

// get all products for a producer
const getProducerProducts = async (req, res) => {
    // get producer id
    const {id} = req.params

    // //////// Commented Out for testing purposes!!!
    // if (!mongoose.Types.ObjectId.isValid(id)) {
    //     return res.status(404).json({error: 'invalid id'})
    // }

    const products = await Product.find({producerID: id}).sort({createdAt: -1})
    if (!products) {
        return res.status(404).json({error: 'no products listed for producer'})
    }

    res.status(200).json(products)
}

// get a single product
const getProduct = async (req, res) => {
    // get product id
    const {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'not a valid id'})
    }

    const product = await Product.findById(id)
    if (!product) {
        return res.status(404).json({error: 'no such product'})
    }
    res.status(200).json(product)
}

// add a new product
const addProduct = async (req, res) => {
    const {producerID, name, type, amount, unit, minPurchase} = req.body

    let emptyFields = []

    if (!producerID) {
        emptyFields.push('producerID')
    }
    if (!name) {
        emptyFields.push('name')
    }
    if (!type) {
        emptyFields.push('type')
    }
    if (!amount) {
        emptyFields.push('amount')
    }
    if (!unit) {
        emptyFields.push('unit')
    }
    if (!minPurchase) {
        emptyFields.push('minPurchase')
    }

    try {
        const product = await Product.create({producerID, name, type, amount, unit, minPurchase})
        res.status(200).json(product)
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
}

// delete single product
const deleteProduct = async (req, res) => {
    const {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'not a valid id'})
    }

    const product = await Product.findByIdAndDelete(id)

    if(!product) {
        return res.status(404).json({msg: 'no such product'})
    }

    res.status(200).json(product)
}

// update product
const updateProduct = async (req, res) => {
    const {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({msg: 'id is not valid'})
    }

    const product = await Product.findByIdAndUpdate(id, {
        ...req.body
    })

    if (!product) {
        return res.status(404).json({msg: 'no such product'})
    }

    res.status(200).json(product)
}

module.exports = {
    getProducts,
    getProducerProducts,
    getProduct,
    addProduct,
    deleteProduct,
    updateProduct
}