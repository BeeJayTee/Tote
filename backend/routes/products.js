const express = require('express')

const { getProducts, getProducerProducts, getProducers, getProduct, updateProductCount, addProduct, deleteProduct, updateProduct } = require('../controllers/productController')
const requireAuth = require('../middleware/requireAuth')



const router = express.Router()

// require auth for all product routes
router.use(requireAuth)

// get all products in database (not used very often)
// just for dev purposes probably
router.get('/', getProducts)

// get all products for a specific producer
router.get('/producer/:id', getProducerProducts)

// get all producer names for filter dropdown
router.get('/producers', getProducers)

// get single product
router.get('/:id', getProduct)

// update a product count
router.patch('/:id', updateProductCount)

// post a new product
router.post('/', addProduct)

// delete a product
router.delete('/:productID', deleteProduct)

// update a product
router.put('/', updateProduct)

module.exports = router