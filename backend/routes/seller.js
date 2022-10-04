const express = require("express");
const requireSellerAuth = require("../middleware/requireSellerAuth");

// controller functions
const {
  signupSeller,
  loginSeller,
  getSellerMarkets,
  addSellerMarket,
} = require("../controllers/sellerController");

const router = express.Router();

// login route
router.post("/login", loginSeller);

// signup route
router.post("/signup", signupSeller);

// get seller markets
router.get("/markets", requireSellerAuth, getSellerMarkets);

// add new market to user
router.patch("/markets", requireSellerAuth, addSellerMarket);

module.exports = router;
