const Market = require('../models/marketModel')

// create market
const createMarket = async (req, res) => {
    Market.create()
}

module.exports = {createMarket}