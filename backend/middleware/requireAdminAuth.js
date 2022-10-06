const jwt = require("jsonwebtoken");
const Admin = require("../models/adminModel");

const requireAdminAuth = async (req, res, next) => {
  // verify that user is authenticated
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: "Authorization token required" });
  }

  const token = authorization.split(" ")[1];

  try {
    const { _id } = jwt.verify(token, process.env.ADMIN_SECRET);
    req.user = await Admin.findOne({ _id });
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: "request is not authorized" });
  }
};

module.exports = requireAdminAuth;
