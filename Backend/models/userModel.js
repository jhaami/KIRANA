const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String, // Changed to String to ensure flexibility for country codes
    required: true,
    unique: true,
  },
  password: {
    type: String,
    minLength: 6,
    required: true,
  },
  role: {
    type: String,
    enum: ["Admin", "Seller", "Buyer"], // Restrict role values to these options
    default: "Buyer", // Default role is "Buyer"
  },
  orders: {
    type: Array,
    default: [],
  },
  cart: {
    type: Array,
    default: [],
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  resetPasswordOTP: {
    type: Number,
    default: null,
  },
  resetPasswordExpires: {
    type: Date,
    default: null,
  },
});

// Create a collection in MongoDB with the name "users"
const User = mongoose.model("users", userSchema);
module.exports = User;
