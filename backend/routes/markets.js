const express = require('express')

const { addMarket, getMarkets } = require('../controllers/marketController')

const router = express.Router()

// get all markets
router.get('/', getMarkets)

// create market
router.post('/add', addMarket)

module.exports = router