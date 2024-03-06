const mongoose = require("mongoose");

const infoSchema = mongoose.Schema({
  description: String,
  price: String,
  productImage: String,
  store: { type: mongoose.Schema.Types.ObjectId, ref: "stores" },
});

const productSchema = mongoose.Schema({
  name: String,
  category: String,
  subCategory: String,
  info: infoSchema,
});

const Product = mongoose.model("products", productSchema);

module.exports = Product;


