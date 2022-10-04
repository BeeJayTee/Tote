const jwt = require("jsonwebtoken");
const Seller = require("../models/sellerModel");

const requireSellerAuth = async (req, res, next) => {
  // verify that user is authenticated
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: "Auhtorization token required" });
  }

  const token = authorization.split(" ")[1];

  try {
    const { _id } = jwt.verify(token, process.env.SECRET);
    req.user = await Seller.findOne({ _id });
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: "request is not authorized" });
  }
};

module.exports = requireSellerAuth;
