const jwt = require('jsonwebtoken')
const User = require('../models/userModel')

const requireAdminAuth = async (req, res, next) => {

    // verify that user is authenticated
    const { authorization } = req.headers

    if (!authorization) {
        return res.status(401).json({error: 'Auhtorization token required'})
    }

    const token = authorization.split(' ')[1]

    try {
        const {_id} = jwt.verify(token, process.env.ADMIN_SECRET)
        req.user = await User.findOne({ _id })
        next()
    } catch (error) {
        console.log(error)
        res.status(401).json({error: 'request is not authorized'})
    }
}

module.exports = requireAdminAuth