const User = require('../models/userModel')
const Market = require('../models/marketModel')
const jwt = require('jsonwebtoken')

const createToken = (_id) => {
    return jwt.sign({_id}, process.env.SECRET, { expiresIn: '14d' })
} 

// login user
const loginUser = async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await User.login(email, password)
        
        // identify type of user (buyer or seller)
        const userType = user.isBuyer ? process.env.BUYER_ID : process.env.SELLER_ID

        // create a token
        const token = createToken(user._id)

        res.status(200).json({email, token, userType})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

// signup user
const signupUser = async (req, res) => {
    const { email, password, retypePassword, organization, address, phone, isBuyer, isSeller, marketID } = req.body
    try {
        const user = await User.signup(email, password, retypePassword, organization, address, phone, isBuyer, isSeller, marketID)

        // identify type of user (buyer or seller)
        const userType = user.isBuyer ? process.env.BUYER_ID : process.env.SELLER_ID

        // create a token
        const token = createToken(user._id)

        res.status(200).json({email, token, userType})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

// get user markets
const getUserMarkets = async (req, res) => {
    const id = req.user._id
    const user = await User.findById(id)
    const userMarkets = user.sellerMarketIDs
    if (userMarkets.length > 0) {
        return res.status(200).json({ markets: userMarkets })
    }
    res.status(404).json({ msg: 'Could not find markets for this user' })
}

// add user market
const addUserMarket = async (req, res) => {
    const { marketID } = req.body
    const userID = req.user._id
    const market = await Market.findOne({ marketID: marketID })
    if (!market) {
        return res.status(404).json({ error: 'market not found' })
    }
    const userCheck = await User.findById(userID)
    if (userCheck.sellerMarketIDs.includes(marketID)) {
        return res.status(409).json({ error: 'market already exists' })
    }
    const user = await User.findByIdAndUpdate(userID, {$push: { sellerMarketIDs: marketID }})
    res.status(200).json(user)
}

module.exports = {
    signupUser,
    loginUser,
    getUserMarkets,
    addUserMarket
}