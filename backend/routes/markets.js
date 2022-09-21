const express = require('express')

const { createMarket } = require('../controllers/marketController')

const router = express.Router()

// create market
router.post('/create', createMarket)

module.exports = router