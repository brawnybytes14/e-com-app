window.onload = async () => {
  const salesTrendsData = await fetchSalesTrends();
  const customerDemographicsData = await fetchCustomerDemographics();
  const products = await fetchProducts();

  renderSalesTrendsChart(salesTrendsData);
  renderCustomerDemographicsChart(customerDemographicsData);
  renderProducts(products);
}

function renderProducts(products) {
  try {
    let tbody =
        `
          <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Category</th>
                <th>Stock</th>
              <th>Price</th>
          </tr>
        `;

    for (let i = 0; i < products.length; i++) {
      let obj = products[i];
      tbody +=
          `
            <tr>
                <td>${obj.id}</td>
                <td>${obj.name}</td>
                <td>${obj.category}</td>
                 <td>${obj.stock}</td>
                <td>${obj.price}</td>
            </tr>
        `;
    }
    const table = document.getElementById("products-table");
    table.innerHTML = tbody;
  } catch (e) {
    console.error(e);
    alert("Caught Exception: " + e.description);
  }
}

async function fetchSalesTrends() {
  const response = await fetch('/products/sales/trends?period=daily');
  return await response.json();
}

async function fetchCustomerDemographics() {
  const response = await fetch('/products/customers/demographics');
  return await response.json();
}

async function fetchProducts() {
  const response = await fetch('/products');
  return await response.json();
}

function renderSalesTrendsChart(data) {
  const ctx = document.getElementById('salesTrendsChart').getContext('2d');
  new Chart(ctx, {
    type: 'line',
    data: {
      labels: Object.keys(data),
      datasets: [{
        label: 'Sales Trends',
        data: Object.values(data),
        borderColor: '#47b01a',
        backgroundColor: '#47b01a',
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        x: {beginAtZero: true},
        y: {beginAtZero: true}
      }
    }
  });
}

function renderCustomerDemographicsChart(data) {
  const ctx = document.getElementById('customerDemographicsChart').getContext('2d');
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: Object.keys(data.ageGroups),
      datasets: [{
        label: 'Customer Age Groups',
        data: Object.values(data.ageGroups),
        backgroundColor: '#d47c59',
        borderColor: '#d47c59',
        borderWidth: 1
      }]
    },
    width: 100,
    options: {
      scales: {
        x: {beginAtZero: true},
        y: {beginAtZero: true}
      }
    }
  });
}
