const Market = require('../models/marketModel')

// get all markets
const getMarkets = async (req, res) => {
    const markets = await Market.find({}).sort({createdAt: -1})

    res.status(200).json(markets)
}

// create market
const addMarket = async (req, res) => {
    const {adminName, adminEmail, marketName, marketAddress, mailingAddress, phone} = req.body

    try {
        const market = await Market.add(adminName, adminEmail, marketName, marketAddress, mailingAddress, phone)
        res.status(200).json(market)
    } catch (error){
        res.status(400).json({error: error.message})
    }
}

module.exports = {getMarkets, addMarket}