const express = require('express')
const router = express.Router()

const { loginAdmin, signupAdmin } = require('../controllers/adminController')

// login admin
router.post('/login', loginAdmin)

// signup admin
router.post('/signup', signupAdmin)

module.exports = router