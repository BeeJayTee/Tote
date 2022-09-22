const User = require('../models/userModel')
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

module.exports = {
    signupUser,
    loginUser
}