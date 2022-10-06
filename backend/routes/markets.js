const express = require("express");

const requireAdminAuth = require("../middleware/requireAdminAuth");

const requireSellerAuth = require("../middleware/requireSellerAuth");

const { addMarket, getMarkets } = require("../controllers/marketController");

const router = express.Router();

// get all markets
router.get("/", requireSellerAuth, getMarkets);

// create market
router.post("/add", requireAdminAuth, addMarket);

module.exports = router;
