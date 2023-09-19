const express = require("express");
const requireBuyerAuth = require("../middleware/requireBuyerAuth");

// controller functions
const {
  signupBuyer,
  loginBuyer,
  getCartItems,
  addCartItem,
} = require("../controllers/buyerController");

const router = express.Router();

// check auth
router.get("/", requireBuyerAuth);

// login route
router.post("/login", loginBuyer);

// signup route
router.post("/signup", signupBuyer);

// get shopping cart items
router.get("/cart", requireBuyerAuth, getCartItems);

// add item to shopping cart
router.post("/cart", requireBuyerAuth, addCartItem);

module.exports = router;
