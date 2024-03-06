 const mongoose = require("mongoose");

const shoppingListsSchema = mongoose.Schema({
  name: String,
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: "products" }],
});

const userSchema = mongoose.Schema({
  email: String,
  password: String,
  token: String,
  address: String,
  shoppingLists:  [shoppingListsSchema],
  favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: "products" }],
});

const User = mongoose.model("users", userSchema);

module.exports = User;
