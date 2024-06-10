let salesChart;
let demoChart;
const eventSource = new EventSource('http://localhost:3000/events');
const buyForm = document.getElementById("buy-form")

window.onload = async () => {
  await refreshDashboard()
}

async function refreshDashboard() {
  const salesTrendsData = await fetchSalesTrends();
  const customerDemographicsData = await fetchCustomerDemographics();
  const products = await fetchProducts();
  const totalSales = await fetchTotalSales();

  renderSalesTrendsChart(salesTrendsData);
  renderCustomerDemographicsChart(customerDemographicsData);
  renderProducts(products);
  renderTotalSales(totalSales);
}

function showStatusMessage(message) {
  const statusDiv = document.getElementById('status');
  const messageSpan = document.getElementById('alert-msg');

  messageSpan.innerText = message;
  statusDiv.style.display = 'block';

  const closeButton = statusDiv.querySelector('.close-btn');
  closeButton.onclick = () => {
    statusDiv.style.display = 'none';
  }
}

// SSE code
eventSource.onmessage = async function (event) {
  showStatusMessage(event.data)
  await refreshDashboard()
};

eventSource.onerror = function () {
  showStatusMessage("error occurred")
  eventSource.close();
};
// End SSE code

buyForm.onsubmit = async (event) => {
  console.log("buying a product")
  event.preventDefault();

  const productId = document.getElementById('input-prod-id').value;
  const quantity = parseInt(document.getElementById('input-qty').value);
  const name = document.getElementById('input-name').value;
  const age = document.getElementById('input-age').value;
  const gender = document.getElementById('select-gender').value;
  const customerId = document.getElementById('input-cust-id').value;

  try {
    const response = await fetch('/products/buy', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ productId, quantity, name, age, gender, customerId }),
    });

    const data = await response.json();
    document.getElementById('response-message').innerText = data.message;
    showStatusMessage(data.message)
    await refreshDashboard();
  } catch (error) {
    console.error('Error:', error);
    document.getElementById('response-message').innerText = 'An error occurred. Please try again.';
  }
}

async function fetchTotalSales() {
  const response = await fetch('/products/sales/total');
  return await response.json();
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

function renderTotalSales(totalSales) {
  document.getElementById("total-sales").innerText = "Total Sales: " + totalSales;
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

function renderSalesTrendsChart(data) {
  if (salesChart) {
    salesChart.destroy();
  }

  const ctx = document.getElementById('salesTrendsChart').getContext('2d');
  salesChart = new Chart(ctx, {
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
        x: { beginAtZero: true },
        y: { beginAtZero: true }
      }
    }
  });
}

function renderCustomerDemographicsChart(data) {
  if (demoChart) {
    demoChart.destroy();
  }

  const ctx = document.getElementById('customerDemographicsChart').getContext('2d');
  demoChart = new Chart(ctx, {
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
    options: {
      scales: {
        x: { beginAtZero: true },
        y: { beginAtZero: true }
      }
    }
  });
}