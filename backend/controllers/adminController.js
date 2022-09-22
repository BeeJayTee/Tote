const Admin = require('../models/adminModel')

// login admin
const loginAdmin = async (req, res) => {
    const {password} = req.body
    Admin.createpw(password)
}

// signup admin
const signupAdmin = async (req, res) => {
    console.log(req.body)
}

module.exports = { loginAdmin, signupAdmin }