const express = require('express')

const requireAuth = require('../middleware/requireAuth')

const { addMarket, getMarkets } = require('../controllers/marketController')

const router = express.Router()

// get all markets
router.get('/', requireAuth, getMarkets)

// create market
router.post('/add', addMarket)

module.exports = router