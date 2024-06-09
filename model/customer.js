const mongoose = require('mongoose');

const custSchema = new mongoose.Schema({
  customerId: {
    type: String,
    require: true
  },
  name: {
    type: String,
    require: true
  },
  age: {
    type: Number,
    require: true
  },
  gender: {
    type: String,
    require: true
  },
  purchaseHistory: {
    type: [Number],
    require: true
  }
})

module.exports = mongoose.model("Customer", custSchema);