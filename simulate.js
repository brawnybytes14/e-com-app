const { products, customers, sales } = require('./data');
const Product = require('./model/product')
const Sale = require('./model/sale')
const Customer = require('./model/customer')

function getRandomDate(start, end) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

async function simulatePurchase(clients) {
  const randomProduct = products[Math.floor(Math.random() * products.length)];
  const randomCustomer = customers[Math.floor(Math.random() * customers.length)];
  const quantity = Math.floor(Math.random() * 10) + 1;

  const saleDate = getRandomDate(new Date(new Date().setDate(new Date().getDate() - 30)), new Date());
  
  const productId = randomProduct.id;
  const customerId = randomCustomer.customerId;

  const { name, age, gender } = randomCustomer;

  try {
    const product = await Product.findOne({ id: productId });

    if (!product) {
      console.log('Product not found');
      return;
    }

    if (product.stock < quantity) {
      console.log('Insufficient stock');
      return;
    }

    product.stock -= quantity;
    await product.save();

    const allSales = await Sale.find();
    const saleId = allSales.length + 1;

    const sale = new Sale({
      saleId,
      productId,
      quantity,
      saleDate: saleDate,
    });

    await sale.save();

    let customerInDb = await Customer.findOne({ customerId: customerId });
    if (!customerInDb) {
      const customer = new Customer({
        customerId,
        name,
        age,
        gender,
        purchaseHistory: [productId],
      });
      await customer.save();
    } else {
      customerInDb.purchaseHistory = [...customerInDb.purchaseHistory, productId];
      await customerInDb.save();
    }

    clients.forEach(client => client.write(`data: Sold: ${quantity} ${product.name}, Current Stock: ${product.stock}\n\n`));
  } catch (error) {
    console.error('Error during purchase', error.message);
  }
}

module.exports = {
  simulatePurchase
}