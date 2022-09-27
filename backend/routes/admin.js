const express = require('express')
const router = express.Router()
const requireAdminAuth = require('../middleware/requireAdminAuth')

const { loginAdmin, signupAdmin } = require('../controllers/adminController')

// require auth for all product routes
// //////// This needs to be implmeneted throughout the admin front end before
// router.use(requireAdminAuth)

// login admin
router.post('/login', loginAdmin)

// signup admin
router.post('/signup', signupAdmin)

module.exports = router