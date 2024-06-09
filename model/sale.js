const mongoose = require('mongoose');

const saleSchema = new mongoose.Schema({
  saleId: {
    type: String,
    require: true
  },
  productId: {
    type: String,
    require: true
  },
  quantity: {
    type: Number,
    require: true
  },
  saleDate: {
    type: Date,
    require: true
  }
})

module.exports = mongoose.model("Sale", saleSchema);