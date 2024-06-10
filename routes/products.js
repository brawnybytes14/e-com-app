const express = require('express');
const router = express.Router();

// model imports
const Product = require('../model/product')
const Sale = require('../model/sale')
const Customer = require('../model/customer')

const data = require('../data')
const utils = require('../utils')

router.get('/', async (req, res) => {
  const category = req.query.category;
  const sortType = req.query.sortType;
  const products = await Product.find();
  const _products = utils.getProductsByCategory(products, category);
  const sortedProducts = utils.sortProductsByPrice(_products, sortType)
  res.json(sortedProducts);
})

router.get('/sales/total', async (req, res) => {
  const products = await Product.find();
  const sales = await Sale.find();

  const totalSales = utils.calculateTotalSales(products, sales);
  res.json(totalSales);
})

router.get('/sales/trends', async (req, res) => {
  try {
    const period = req.query.period || 'daily';

    const products = await Product.find();
    const sales = await Sale.find();

    const salesTrends = utils.getSalesTrends(sales, products, period);
    res.status(200).json(salesTrends);
  } catch (error) {
    console.error(error);
    res.status(500).json({error: 'Something went wrong'});
  }
});

router.post('/', async (req, res) => {
  console.log("add product")
  const product = new Product({
    name: req.body.name
  })
  const dbProduct = await product.save();
  res.json(dbProduct);
})

router.get('/customers/demographics', async (req, res) => {
  try {
    const customers = await Customer.find();
    const demographics = utils.analyzeCustomerDemographics(customers);
    res.json(demographics);
  } catch (error) {
    console.error(error);
    res.status(500).json({error: 'Internal Server Error'});
  }
});

router.post('/buy', async (req, res) => {
  const {productId, quantity, name, age, gender, customerId} = req.body;

  console.log(req.body);
  try {
    const product = await Product.findOne({id: productId});

    if (!product) {
      console.log(product)
      return res.status(400).json({message: 'Product not found'});
    }

    if (product.stock < quantity) {
      return res.status(400).json({message: 'Insufficient stock'});
    }

    product.stock -= quantity;
    await product.save();

    const sales = await Sale.find();
    
    const saleId = sales.length + 1;

    const sale = new Sale({
      saleId,
      productId,
      quantity,
      saleDate: new Date(),
    });

    await sale.save();

    let customerInDb = await Customer.findOne({customerId: customerId});
    console.log("customer in db", customerInDb)
    if (!customerInDb) {
      const customer = new Customer({
        customerId,
        name,
        age,
        gender,
        purchaseHistory: [productId]
      });
      await customer.save();
    } else {
      customerInDb.purchaseHistory = [...customerInDb.purchaseHistory, productId];
      await customerInDb.save();
    }

    res.status(200).json({message: 'Purchase successful'});
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({message: 'An error occurred'});
  }
});

router.get('/customers/segment', async (req, res) => {
  try {
    const {ageGroup, gender} = req.query;
    let customers = await Customer.find();

    if (ageGroup) {
      customers = utils.segmentCustomers(customers, utils.ageGroupCriteria(ageGroup));
    }
    if (gender) {
      customers = utils.segmentCustomers(customers, utils.genderCriteria(gender));
    }

    res.json(customers);
  } catch (error) {
    console.error(error);
    res.status(500).json({error: 'Internal Server Error'});
  }
});

router.get('/insert-data', async (req, res) => {
  console.log("inserting data")
  await Product.insertMany(data.products)
  await Sale.insertMany(data.sales)
  await Customer.insertMany(data.customers)
  res.send("inserted data successfully");
})

router.get('/delete-data', async (req, res) => {
  console.log("delete data")
  await Product.deleteMany({})
  await Sale.deleteMany({})
  await Customer.deleteMany({})
  res.send("deleted data successfully");
})

module.exports = router;