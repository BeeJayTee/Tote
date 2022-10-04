const Buyer = require("../models/buyerModel");
const jwt = require("jsonwebtoken");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "14d" });
};

// login buyer
const loginBuyer = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await Buyer.login(email, password);

    // identify type of user (buyer or seller)
    const userType = process.env.BUYER_ID;

    // create a token
    const token = createToken(user._id);

    res.status(200).json({ email, token, userType });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// signup user
const signupBuyer = async (req, res) => {
  const { email, password, retypePassword } = req.body;
  try {
    const seller = await Buyer.signup(email, password, retypePassword);

    // identify type of user (buyer or seller)
    const userType = process.env.BUYER_ID;

    // create a token
    const token = createToken(seller._id);

    res.status(200).json({ email, token, userType });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  signupBuyer,
  loginBuyer,
};
