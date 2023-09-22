const Admin = require("../models/adminModel");
const Market = require("../models/marketModel");
const jwt = require("jsonwebtoken");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.ADMIN_SECRET, { expiresIn: "14d" });
};

// login admin
const loginAdmin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const admin = await Admin.login(email, password);
    const token = createToken(admin._id);
    const userType = process.env.ADMIN_ID;

    res.status(200).json({ email, token, userType });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ error: error.message });
  }
};

// create admin
const signupAdmin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await Admin.signup(email, password);
    console.log(admin);

    res.status(200).json(admin);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// get all markets
const getMarkets = async (req, res) => {
  console.log("getMarkets");
  try {
    const markets = await Market.find({}).sort({ createdAt: -1 });

    res.status(200).json(markets);
  } catch (err) {
    res.status(400).json({ message: "could not get market list" });
  }
};

module.exports = { loginAdmin, signupAdmin, getMarkets };
