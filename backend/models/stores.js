const mongoose = require("mongoose");

const storeSchema = mongoose.Schema({
  name: String,
  schedule: String,
  address: String,
  logoUrl: String,
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: "products" }],
});

const Store = mongoose.model("stores", storeSchema);

module.exports = Store;
