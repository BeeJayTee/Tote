const Buyer = require("../models/buyerModel");
const Product = require("../models/productModel");
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

  // set up an item object with all of the properties of the request body object item
  // use this as the new item to be added to the db
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

  const buyer = await Buyer.findById(_id);
  const buyerCartItems = buyer.cartItems;
  const product = await Product.findById(itemObject._id);

  if (itemObject.productQuantity > product.amount) {
    return res
      .status(400)
      .json({ error: "not enough of this product in stock" });
  }

  // check to see if cart is empty: easy logic
  if (buyerCartItems.length === 0) {
    console.log("no length to the list");
    try {
      const updatedItem = await Buyer.findByIdAndUpdate(_id, {
        $push: { cartItems: itemObject },
      });
      // if item was successfully updated remove from product total in db
      if (updatedItem) {
        product.amount = product.amount - itemObject.productQuantity;
        product.save();
      }
      return res.status(200).json({ message: "item added to cart" });
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }

  // if there are items in the cart, check to see if th item exists, if it exists, add to it, if it doesn't then add the item to the cart
  const itemExist = buyerCartItems.find((item) => {
    return itemObject._id === item._id.toString();
  });

  // item does not exist in the db, add the new item
  if (!itemExist) {
    console.log("item doesn't exist, adding it to the list");
    try {
      // if item was successfully updated remove from product total in db
      const updatedItem = await Buyer.findByIdAndUpdate(_id, {
        $push: { cartItems: itemObject },
      });

      if (updatedItem) {
        product.amount = product.amount - itemObject.productQuantity;
        product.save();
      }
      return res.status(200).json({ message: "item added to cart" });
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  } else {
    console.log("item exists in the list, editing the quantity");
    // update the local instance of buyerCartItems
    for (let i = 0; i < buyerCartItems.length; i++) {
      if (buyerCartItems[i]._id.toString() === itemObject._id) {
        buyerCartItems[i].productQuantity += itemObject.productQuantity;
        break;
      }
    }

    try {
      const updatedItem = await Buyer.findByIdAndUpdate(_id, {
        $set: { cartItems: buyerCartItems },
      });

      // if item was successfully updated remove from product total in db
      if (updatedItem) {
        product.amount = product.amount - itemObject.productQuantity;
        product.save();
      }

      return res.status(200).json({ message: "cart quantity updated" });
    } catch (error) {}
  }
};

// edit an item amount in the cart
const editCartItem = async (req, res) => {
  const buyer_id = req.user._id;
  const { newAmount, oldAmount, _id } = req.body;

  try {
    const buyer = await Buyer.findById(buyer_id);
    const cartItems = buyer.cartItems;
    const itemToUpdate = cartItems.find((item) => {
      return item._id.toString() === _id.toString();
    });
    itemToUpdate.productQuantity = newAmount;
    buyer.save();

    // add items back into the sellers product total
    const productAmountDifference = newAmount - oldAmount;
    const productToUpdate = await Product.findById(_id);
    const productToUpdateAmount = productToUpdate.amount;
    if (productAmountDifference > productToUpdateAmount) {
      return res.status(400).json({
        error: "not enough in stock",
        maxOrder: productToUpdateAmount,
      });
    } else {
      const updatedProduct = await Product.findByIdAndUpdate(_id, {
        $inc: { amount: productAmountDifference * -1 },
      });
    }

    res.status(200).json({ message: "cart item updated" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const deleteCartItem = async (req, res) => {
  const user_id = req.user._id;
  const { _id } = req.body;

  try {
    const buyer = await Buyer.findById(user_id);
    const cartItems = buyer.cartItems;
    let itemToDelete;

    // create a local image of the shopping cart where the item to delete is filtered out
    const cartItemsAfterDelete = cartItems.filter((item) => {
      // sets itemToDelete variable to give us access to it later
      if (item._id.toString() === _id.toString()) {
        itemToDelete = item;
      }
      return item._id.toString() !== _id.toString();
    });
    buyer.cartItems = cartItemsAfterDelete;
    buyer.save();

    // add quantity back to product stock
    const product = await Product.findById(_id);
    product.amount += itemToDelete.productQuantity;
    product.save();
    res.status(200).json({ message: "item successfully removed from cart" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const submitOrder = async (req, res) => {
  const user_id = req.user;
  try {
    const buyer = await Buyer.findById(user_id);
    buyer.order = [...buyer.cartItems];
    buyer.cartItems = [];
    await buyer.save();

    res.status(200).json({ message: "success" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  signupBuyer,
  loginBuyer,
  getCartItems,
  addCartItem,
  editCartItem,
  deleteCartItem,
  submitOrder,
};
