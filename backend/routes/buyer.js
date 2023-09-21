const express = require("express");
const requireBuyerAuth = require("../middleware/requireBuyerAuth");

// controller functions
const {
  signupBuyer,
  loginBuyer,
  getCartItems,
  addCartItem,
  editCartItem,
  deleteCartItem,
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

// delete item from shopping cart
router.delete("/cart", requireBuyerAuth, deleteCartItem);

// edit a current cart item from the shopping cart
router.patch("/cart/edit", requireBuyerAuth, editCartItem);

module.exports = router;
