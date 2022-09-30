const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let date = new Date(Date.now());
date.setDate(date.getDate() + 8);

const productSchema = new Schema({
  producerID: {
    type: String,
    required: true,
  },
  marketID: {
    type: String,
    required: true,
  },
  organization: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  unit: {
    type: String,
    require: true,
  },
  pricePerUnit: {
    type: Number,
    require: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  expireAt: {
    type: Date,
    // set expiry for 8 days
    expires: 691200,
    default: date,
  },
});

module.exports = mongoose.model("Product", productSchema);
