const products = [
  { id: 1, name: "Laptop", category: "Electronics", price: 999.99, stock: 50 },
  { id: 2, name: "Smartphone", category: "Electronics", price: 699.99, stock: 200 },
  { id: 3, name: "Headphones", category: "Accessories", price: 49.99, stock: 300 },
  { id: 4, name: "Desk Chair", category: "Furniture", price: 129.99, stock: 150 },
  { id: 5, name: "Coffee Maker", category: "Appliances", price: 89.99, stock: 100 },
  { id: 6, name: "Bluetooth Speaker", category: "Accessories", price: 59.99, stock: 120 },
  { id: 7, name: "Monitor", category: "Electronics", price: 199.99, stock: 75 },
  { id: 8, name: "Keyboard", category: "Accessories", price: 29.99, stock: 250 },
  { id: 9, name: "Mouse", category: "Accessories", price: 19.99, stock: 400 },
  { id: 10, name: "Desk Lamp", category: "Furniture", price: 39.99, stock: 180 }
];

const sales = [
  { saleId: 1, productId: 1, quantity: 2, saleDate: "2024-01-15" },
  { saleId: 2, productId: 3, quantity: 5, saleDate: "2024-01-16" },
  { saleId: 3, productId: 5, quantity: 1, saleDate: "2024-01-17" },
  { saleId: 4, productId: 2, quantity: 3, saleDate: "2024-01-18" },
  { saleId: 5, productId: 6, quantity: 2, saleDate: "2024-01-19" },
  { saleId: 6, productId: 7, quantity: 1, saleDate: "2024-01-20" },
  { saleId: 7, productId: 8, quantity: 4, saleDate: "2024-01-21" },
  { saleId: 8, productId: 9, quantity: 10, saleDate: "2024-01-22" },
  { saleId: 9, productId: 10, quantity: 2, saleDate: "2024-01-23" },
  { saleId: 10, productId: 4, quantity: 1, saleDate: "2024-01-24" }
];

const customers = [
  {
    customerId: 1,
    name: "John Doe",
    age: 28,
    gender: "Male",
    purchaseHistory: [1, 3, 5]
  },
  {
    customerId: 2,
    name: "Jane Smith",
    age: 34,
    gender: "Female",
    purchaseHistory: [2, 4, 6, 7]
  },
  {
    customerId: 3,
    name: "Alice Johnson",
    age: 22,
    gender: "Female",
    purchaseHistory: [8, 9]
  },
  {
    customerId: 4,
    name: "Bob Brown",
    age: 45,
    gender: "Male",
    purchaseHistory: [10, 1]
  },
  {
    customerId: 5,
    name: "Charlie Black",
    age: 30,
    gender: "Non-binary",
    purchaseHistory: [2, 3, 4, 5, 6]
  }
];

module.exports = { products, customers, sales }