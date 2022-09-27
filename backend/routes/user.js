const express = require('express')
const requireAuth = require('../middleware/requireAuth')

// controller functions
const { signupUser, loginUser, getUserMarkets } = require('../controllers/userController')

const router = express.Router()

// login route
router.post('/login', loginUser)

// signup route
router.post('/signup', signupUser)

// get user markets
router.get('/markets', requireAuth, getUserMarkets)

module.exports = router