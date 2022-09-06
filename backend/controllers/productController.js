const Product = require('../models/productModel')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

// get all products
const getProducts = async (req, res) => {
    const products = await Product.find({}).sort({createdAt: -1})

    res.status(200).json(products)
}

// get all products for a producer
const getProducerProducts = async (req, res) => {
    const _id = req.user._id

    const products = await Product.find({producerID: _id}).sort({createdAt: -1})
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
    const {name, type, amount, unit, pricePerUnit, minPurchase} = req.body

    const _id = req.user._id

    let emptyFields = []

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
    if (!pricePerUnit) {
        emptyFields.push('pricePerUnit')
    }
    if (!minPurchase) {
        emptyFields.push('minPurchase')
    }
    if (emptyFields.length > 0) {
        return res.status(400).json({ error: 'Please Fill in all empty fields', emptyFields })
    }

    try {
        const product = await Product.create({producerID: _id, name, type, amount, unit, pricePerUnit, minPurchase})
        res.status(200).json(product)
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
}

// delete single product
const deleteProduct = async (req, res) => {
    const { productID } = req.params
    const producerID = req.user._id

    // check to make sure product id is a legit mongodb id
    if (!mongoose.Types.ObjectId.isValid(productID)) {
        return res.status(404).json({error: 'not a valid id'})
    }

    const product = await Product.findOneAndDelete({_id: productID, producerID: producerID})
    console.log(product)

    if(!product) {
        return res.status(404).json({msg: 'no such product'})
    }

    res.status(200).json(product)
}

// update product
const updateProduct = async (req, res) => {
    const {producerID, productID, name, type, amount, unit, pricePerUnit, minPurchase} = req.body
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
    if (!pricePerUnit) {
        emptyFields.push('pricePerUnit')
    }
    if (!minPurchase) {
        emptyFields.push('minPurchase')
    }
    if (emptyFields.length > 0) {
        return res.status(400).json({ error: 'Please Fill in all empty fields', emptyFields })
    }

    try {
        const product = await Product.findByIdAndUpdate(productID, {producerID, name, type, amount, unit, pricePerUnit, minPurchase})
        res.status(200).json(product)
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
}

module.exports = {
    getProducts,
    getProducerProducts,
    getProduct,
    addProduct,
    deleteProduct,
    updateProduct
}