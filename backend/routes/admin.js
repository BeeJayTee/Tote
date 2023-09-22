const express = require("express");
const router = express.Router();
const requireAdminAuth = require("../middleware/requireAdminAuth");

const {
  loginAdmin,
  signupAdmin,
  getMarkets,
} = require("../controllers/adminController");

// require auth for all product routes
// //////// This needs to be implmeneted throughout the admin front end before
// router.use(requireAdminAuth)

// login admin
router.post("/login", loginAdmin);

// signup admin
router.post("/signup", signupAdmin);

// get all markets for admin workflow
router.get("/markets", requireAdminAuth, getMarkets);

module.exports = router;
