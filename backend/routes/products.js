const express = require('express')

const { getProducts, getProducerProducts, getProduct, addProduct, deleteProduct, updateProduct } = require('../controllers/productController')
const requireAuth = require('../middleware/requireAuth')



const router = express.Router()

// require auth for all product routes
router.use(requireAuth)

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
router.delete('/:productID', deleteProduct)

// update a product
router.put('/', updateProduct)

module.exports = router