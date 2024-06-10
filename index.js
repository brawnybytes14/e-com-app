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

const utils = require('./utils');
const simulate = require('./simulate');

let clients = [];
app.get('/events', (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.flushHeaders();

  console.log("client connected")
  clients.push(res);

  req.on('close', () => {
    console.log("client disconnected")
    clients = clients.filter(client => client !== res);
  });
});

setInterval(() => {
  simulate.simulatePurchase(clients)
}, 2000);

setInterval(() => {
  utils.restockProducts(clients);
}, 3000);

utils.resetData();

const productsRouter = require('./routes/products')
app.use("/products", productsRouter);

app.use(express.static(path.join(__dirname, 'public')));

app.listen(3000, () => {
  console.log(`Server running on http://localhost:${3000}`);
});
