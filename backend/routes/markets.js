const express = require('express')

const { addMarket } = require('../controllers/marketController')

const router = express.Router()

// create market
router.post('/add', addMarket)

module.exports = router