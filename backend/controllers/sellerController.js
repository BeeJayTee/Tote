const Seller = require("../models/sellerModel");
const Market = require("../models/marketModel");
const jwt = require("jsonwebtoken");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "14d" });
};

// login user
const loginSeller = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await Seller.login(email, password);

    // identify type of user (buyer or seller)
    const userType = process.env.SELLER_ID;

    // create a token
    const token = createToken(user._id);

    res.status(200).json({ email, token, userType });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// signup user
const signupSeller = async (req, res) => {
  const { email, password, retypePassword, organization, marketID } = req.body;
  try {
    const market = await Market.findOne({ marketID: marketID });

    const seller = await Seller.signup(
      email,
      password,
      retypePassword,
      organization,
      market.marketID,
      market.marketName
    );

    // identify type of user (buyer or seller)
    const userType = process.env.SELLER_ID;

    // create a token
    const token = createToken(seller._id);

    res.status(200).json({ email, token, userType });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// get seller markets
const getSellerMarkets = async (req, res) => {
  const id = req.user._id;
  const seller = await Seller.findById(id);
  const markets = seller.markets;
  if (markets.length > 0) {
    return res.status(200).json({ markets });
  }
  res.status(404).json({ msg: "Could not find markets for this user" });
};

// add user market
const addSellerMarket = async (req, res) => {
  const { marketID } = req.body;
  const userID = req.user._id;
  const market = await Market.findOne({ marketID: marketID });
  if (!market) {
    return res.status(404).json({ error: "market not found" });
  }

  const seller = await Seller.findById(userID);
  const markets = seller.markets;
  const marketExists = markets.find((market) => {
    return market.id === marketID;
  });
  if (marketExists) {
    return res.status(409).json({ error: "market already exists" });
  } else {
    markets.push({ id: market.marketID, name: market.marketName });
    seller.save();
  }

  res
    .status(200)
    .json({ id: market.marketID, name: market.marketName, _id: market._id });
};

module.exports = {
  signupSeller,
  loginSeller,
  getSellerMarkets,
  addSellerMarket,
};
