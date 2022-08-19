const express = require('express')

const { getProducts, getProducerProducts, getProduct, addProduct, deleteProduct, updateProduct } = require('../controllers/productController')

const router = express.Router()

// get all products in database (not used very often)
// just for dev purposes probably
router.get('/', getProducts)

// get all products for a specific producer
router.get('/producer/:id', getProducerProducts)

// get single product
router.get('/:id', getProduct)

// post a new product
router.post('/', addProduct)

// delete a product
router.delete('/:id', deleteProduct)

// update a product
router.patch('/:id', updateProduct)

module.exports = router