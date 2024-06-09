const data = require('./data');
function getProductsByCategory(products, category) {
  if (!category) {
    return products;
  }
  return products.filter(p => p.category === category)
}

function calculateTotalSales(products, sales) {
  return sales.reduce((total, sale) => {
    const product = products.find(product => product.id === sale.productId);
    return total + (product.price * sale.quantity);
  }, 0).toFixed(2);
}

function sortProductsByPrice(products, sortType) {
  if (sortType === 'asc') {
    return products.sort((a, b) => a.price - b.price);
  } else if (sortType === 'desc') {
    return products.sort((a, b) => b.price - a.price);
  } else {
    return products;
  }
}

const analyzeCustomerDemographics = (customers) => {
  const demographics = {
    totalCustomers: customers.length,
    ageGroups: {
      '18-25': 0,
      '26-35': 0,
      '36-45': 0,
      '46-60': 0,
      '60+': 0
    },
    gender: {
      male: 0,
      female: 0,
      other: 0
    }
  };

  customers.forEach(customer => {
    // Age groups
    if (customer.age >= 18 && customer.age <= 25) demographics.ageGroups['18-25']++;
    else if (customer.age >= 26 && customer.age <= 35) demographics.ageGroups['26-35']++;
    else if (customer.age >= 36 && customer.age <= 45) demographics.ageGroups['36-45']++;
    else if (customer.age >= 46 && customer.age <= 60) demographics.ageGroups['46-60']++;
    else if (customer.age > 60) demographics.ageGroups['60+']++;

    // Gender
    if (customer.gender === 'Male') demographics.gender.male++;
    else if (customer.gender === 'Female') demographics.gender.female++;
    else demographics.gender.other++;
  });

  return demographics;
};

const getSalesTrends = (sales, products, period) => {
  const trends = {};

  sales.forEach(sale => {
    const saleDate = new Date(sale.saleDate);
    let periodKey;

    if (period === 'daily') {
      periodKey = saleDate.toISOString().split('T')[0]; // YYYY-MM-DD
    } else if (period === 'monthly') {
      periodKey = saleDate.toISOString().slice(0, 7); // YYYY-MM
    } else if (period === 'yearly') {
      periodKey = saleDate.getFullYear().toString(); // YYYY
    }

    if (!trends[periodKey]) {
      trends[periodKey] = 0;
    }

    const product = products.find(p => p.id === sale.productId);
    trends[periodKey] += product.price * sale.quantity;
  });

  return trends;
};

const segmentCustomers = (customers, criteria) => {
  return customers.filter(criteria);
};

const ageGroupCriteria = (ageGroup) => (customer) => {
  if (ageGroup === '18-25') return customer.age >= 18 && customer.age <= 25;
  if (ageGroup === '26-35') return customer.age >= 26 && customer.age <= 35;
  if (ageGroup === '36-45') return customer.age >= 36 && customer.age <= 45;
  if (ageGroup === '46-60') return customer.age >= 46 && customer.age <= 60;
  if (ageGroup === '60+') return customer.age > 60;
};

const genderCriteria = (gender) => (customer) => customer.gender === gender;


module.exports = {
  getProductsByCategory,
  calculateTotalSales,
  getSalesTrends,
  sortProductsByPrice,
  segmentCustomers,
  ageGroupCriteria,
  genderCriteria,
  analyzeCustomerDemographics
}