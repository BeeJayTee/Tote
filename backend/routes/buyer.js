const express = require("express");
const requireBuyerAuth = require("../middleware/requireBuyerAuth");

// controller functions
const { signupBuyer, loginBuyer } = require("../controllers/buyerController");

const router = express.Router();

// check auth
router.get("/", requireBuyerAuth);

// login route
router.post("/login", loginBuyer);

// signup route
router.post("/signup", signupBuyer);

module.exports = router;
