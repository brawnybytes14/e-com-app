const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  id: {
    type: String,
    require: true
  },
  name: {
    type: String,
    require: true
  },
  category: {
    type: String,
    require: true
  },
  price: {
    type: Number,
    require: true
  },
  stock: {
    type: Number,
    require: true
  },
})

module.exports = mongoose.model("Product", productSchema);