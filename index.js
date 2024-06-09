const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const app = express();

// connect mongodb
const url = "mongodb://localhost:27017/ecommerce";
mongoose.connect(url)
  .then(res => console.log("db connected..."))
  .catch(err => console.log(err))

// allow json from post
app.use(express.json());

const productsRouter = require('./routes/products')
app.use("/products", productsRouter);

app.use(express.static(path.join(__dirname, 'public')));

app.listen(3000, () => {
  console.log(`Server running on port http://localhost:${3000}`);
});
