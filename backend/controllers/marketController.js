const Market = require('../models/marketModel')

// create market
const addMarket = async (req, res) => {
    const {adminName, adminEmail, marketName, marketAddress, mailingAddress, phone} = req.body
    Market.create()
}

module.exports = {addMarket}