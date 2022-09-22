const Admin = require('../models/adminModel')
const jwt = require('jsonwebtoken')

const createToken = (_id) => {
    return jwt.sign({_id}, process.env.SECRET, { expiresIn: '14d' })
}

// login admin
const loginAdmin = async (req, res) => {
    const {email, password} = req.body
    console.log(email, password)
    try {
        const admin = await Admin.login(email, password)
        const token = createToken(admin._id)
        const userType = process.env.ADMIN_ID

        res.status(200).json({email, token, userType})
    } catch (error){
        console.log(error.message)
        res.status(400).json({error: error.message})
    }
}

// signup admin
const signupAdmin = async (req, res) => {
    console.log(req.body)
}

module.exports = { loginAdmin, signupAdmin }