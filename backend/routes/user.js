const express = require('express')
const requireAuth = require('../middleware/requireAuth')

// controller functions
const { signupUser, loginUser, getUserMarkets, addUserMarket } = require('../controllers/userController')

const router = express.Router()

// login route
router.post('/login', loginUser)

// signup route
router.post('/signup', signupUser)

// get user markets
router.get('/markets', requireAuth, getUserMarkets)

// add new market to user
router.patch('/markets', requireAuth, addUserMarket)

module.exports = router