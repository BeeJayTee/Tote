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

const getCartItems = async (req, res) => {
  try {
    const cartItems = req.user.cartItems;
    res.status(200).json({ cartItems });
  } catch (error) {}
};

const addCartItem = async (req, res) => {
  const _id = req.user._id;
  const item = req.body;
  console.log(item);
  const buyer = await Buyer.findById(_id);
  const buyerCartItems = buyer.cartItems;

  const itemObject = {
    _id: item.product._id,
    productName: item.product.name,
    productQuantity: item.productQuantity,
    pricePerUnit: item.product.pricePerUnit,
    unit: item.product.unit,
    sellerName: item.product.organization,
    description: item.product.description,
    marketID: item.product.marketID,
  };

  // check to see if there is something already in the cart: easy logic execution
  if (buyerCartItems.length === 0) {
    try {
      const updatedItem = await Buyer.findByIdAndUpdate(_id, {
        $push: { cartItems: itemObject },
      });
      res.status(200).json({ updatedItem });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  // if there are items in the cart, check to see if th item exists, if it exists, add to it, if it doesn't then add the item to the cart
  console.log("search and find");
};

module.exports = {
  signupBuyer,
  loginBuyer,
  getCartItems,
  addCartItem,
};
