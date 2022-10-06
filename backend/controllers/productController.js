const Product = require("../models/productModel");
const Seller = require("../models/sellerModel");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

// get all products
const getProducts = async (req, res) => {
  const products = await Product.find({}).sort({ createdAt: -1 });

  res.status(200).json(products);
};

// get all products for a producer
const getProducerProducts = async (req, res) => {
  const _id = req.user._id;

  const products = await Product.find({ producerID: _id }).sort({
    createdAt: -1,
  });
  if (!products) {
    return res.status(404).json({ error: "no products listed for producer" });
  }

  res.status(200).json(products);
};

// get all producer names for filter dropdown
const getProducers = async (req, res) => {
  const sellers = await Seller.find({ isSeller: true });

  if (!sellers) {
    return res.status(404).json({ error: "no producers available" });
  }
  const newSellers = sellers.map((seller) => {
    const id = seller._id;
    const sellerObj = {};
    sellerObj[id] = seller.organization;
    sellerObj["_id"] = seller._id;
    return sellerObj;
  });
  res.status(200).json(newSellers);
};

// get a single product
const getProduct = async (req, res) => {
  // get product id
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "not a valid id" });
  }

  const product = await Product.findById(id);
  if (!product) {
    return res.status(404).json({ error: "no such product" });
  }
  res.status(200).json(product);
};

// update product count
const updateProductCount = async (req, res) => {
  const { id } = req.params;
  const { updateNumber } = req.body;
  console.log(id, updateNumber);

  try {
    const product = await Product.findByIdAndUpdate(id, {
      $inc: { amount: -updateNumber },
    });
    res.status(200).json(product);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// add a new product
const addProduct = async (req, res) => {
  const { name, type, amount, unit, pricePerUnit, marketID } = req.body;

  const _id = req.user._id;
  const organization = req.user.organization;

  let emptyFields = [];

  if (!name) {
    emptyFields.push("name");
  }
  if (!type) {
    emptyFields.push("type");
  }
  if (!amount) {
    emptyFields.push("amount");
  }
  if (!unit) {
    emptyFields.push("unit");
  }
  if (!pricePerUnit) {
    emptyFields.push("pricePerUnit");
  }
  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please Fill in all empty fields", emptyFields });
  }

  try {
    const product = await Product.create({
      producerID: _id,
      organization,
      name,
      type,
      amount,
      unit,
      pricePerUnit,
      marketID,
    });
    res.status(200).json(product);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// delete single product
const deleteProduct = async (req, res) => {
  const { productID } = req.params;
  const producerID = req.user._id;

  // check to make sure product id is a legit mongodb id
  if (!mongoose.Types.ObjectId.isValid(productID)) {
    return res.status(404).json({ error: "not a valid id" });
  }

  const product = await Product.findOneAndDelete({
    _id: productID,
    producerID: producerID,
  });

  if (!product) {
    return res.status(404).json({ msg: "no such product" });
  }

  res.status(200).json(product);
};

// update product
const updateProduct = async (req, res) => {
  const { productID } = req.params;
  const { newName, newType, newAmount, newUnit, newPricePerUnit } = req.body;
  let emptyFields = [];

  if (!newName) {
    emptyFields.push("name");
  }
  if (!newType) {
    emptyFields.push("type");
  }
  if (!newAmount) {
    emptyFields.push("amount");
  }
  if (!newUnit) {
    emptyFields.push("unit");
  }
  if (!newPricePerUnit) {
    emptyFields.push("pricePerUnit");
  }
  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please Fill in all empty fields", emptyFields });
  }

  try {
    const product = await Product.findByIdAndUpdate(productID, {
      newName,
      newType,
      newAmount,
      newUnit,
      newPricePerUnit,
    });
    res.status(200).json(product);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = {
  getProducts,
  getProducerProducts,
  getProducers,
  getProduct,
  addProduct,
  deleteProduct,
  updateProduct,
  updateProductCount,
};
