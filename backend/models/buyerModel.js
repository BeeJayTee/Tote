const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");
const Schema = mongoose.Schema;

const buyerSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  buyerCartProducts: [
    {
      type: Object,
      default: null,
    },
  ],
});

// static signup method
buyerSchema.statics.signup = async function (
  email,
  password,
  retypePassword,
  organization,
  address,
  phone,
  isBuyer,
  isSeller,
  marketID
) {
  // validation
  if (!email || !password) {
    throw Error("All fields must be filled");
  }

  if (!validator.isEmail(email)) {
    throw Error("Email is not valid");
  }

  if (password !== retypePassword) {
    throw Error("Passwords do not match");
  }

  if (!validator.isStrongPassword(password)) {
    throw Error("Password not strong enough");
  }

  // check to see if email exists
  const emailExists = await this.findOne({ email });
  if (emailExists) {
    throw Error("Email already in use");
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({
    email,
    password: hash,
  });

  return user;
};

// static login method
buyerSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw Error("All fields must be filled");
  }

  const user = await this.findOne({ email });
  if (!user) {
    throw Error(
      "Email and/or password does not match or the account does not exist"
    );
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw Error(
      "Email and/or password does not match or the account does not exist"
    );
  }

  return user;
};

module.exports = mongoose.model("Buyer", buyerSchema);
