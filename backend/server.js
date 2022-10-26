const express = require("express");
require("dotenv").config({ path: "./config/.env" });
const app = express();
const connectDB = require("./config/database");
const productRoutes = require("./routes/products");
const sellerRoutes = require("./routes/seller");
const buyerRoutes = require("./routes/buyer");
const adminRoutes = require("./routes/admin");
const marketRoutes = require("./routes/markets");
const cors = require("cors");

// middleware
app.use(express.json());
app.use(cors({ origin: process.env.REMOTE_CLIENT_APP, credentials: true }));

// quick custom log middleware
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// middleware routes
app.use("/products", productRoutes);
app.use("/seller", sellerRoutes);
app.use("/buyer", buyerRoutes);
app.use("/admin", adminRoutes);
app.use("/markets", marketRoutes);

connectDB();
app.listen(process.env.PORT || 4141, () => [
  console.log(`listening on port: ${process.env.PORT || 4141}`),
]);
