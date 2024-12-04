// Your existing shopping tracker code

let items = [];

// Load initial data using fetch
async function loadInitialData() {
  try {
    const response = await fetch('data.json');
    if (!response.ok) throw new Error('Failed to fetch data.');
    const data = await response.json();
    items = data;
    updateTable();
  } catch (error) {
    console.error('Error loading data:', error);
  }
}

// Add event listener for form submission
document.getElementById('shopping-form').addEventListener('submit', (e) => {
  e.preventDefault();

  // Get input values
  const name = document.getElementById('itemName').value;
  const price = parseFloat(document.getElementById('itemPrice').value);
  const date = document.getElementById('purchaseDate').value;

  // Validate inputs
  if (!name || price <= 0 || !date) {
    alert('Please enter valid details.');
    return;
  }

  // Add new item to array
  const newItem = { name, price, date };
  items.push(newItem);

  // Update table
  updateTable();

  // Reset form
  document.getElementById('shopping-form').reset();
});

// Function to update table
function updateTable() {
  const tableBody = document.getElementById('item-list');
  tableBody.innerHTML = ''; // Clear table

  items.forEach((item, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${item.name}</td>
      <td>$${item.price.toFixed(2)}</td>
      <td>${item.date}</td>
      <td>
        <button class="btn btn-warning btn-sm" onclick="editItem(${index})">Edit</button>
        <button class="btn btn-danger btn-sm" onclick="deleteItem(${index})">Delete</button>
      </td>
    `;
    tableBody.appendChild(row);
  });
}

function handleSortFilter(key) {
  const priceSortValue = document.getElementById('price-sort').value;
  const dateSortValue = document.getElementById('date-sort').value;

  if (key === 'price') {
    if (priceSortValue === 'high-to-low') {
      items.sort((a, b) => b.price - a.price);
    } else if (priceSortValue === 'low-to-high') {
      items.sort((a, b) => a.price - b.price);
    }
  } else if (key === 'date') {
    if (dateSortValue === 'earliest-to-latest') {
      items.sort((a, b) => new Date(a.date) - new Date(b.date));
    } else if (dateSortValue === 'latest-to-earliest') {
      items.sort((a, b) => new Date(b.date) - new Date(a.date));
    }
  }

  updateTable();
}

// Function to delete an item
function deleteItem(index) {
  items.splice(index, 1);
  updateTable();
}

// Function to edit an item
function editItem(index) {
  const item = items[index];
  document.getElementById('itemName').value = item.name;
  document.getElementById('itemPrice').value = item.price;
  document.getElementById('purchaseDate').value = item.date;

  // Remove the item from the array and update the table
  deleteItem(index);
}

// Load initial data on page load
loadInitialData();

// Random Quote API Integration
const quoteElement = document.getElementById('quote');
const quoteButton = document.getElementById('new-quote');

async function fetchRandomQuote() {
  try {
    const response = await fetch('https://api.api-ninjas.com/v1/quotes');
    if (!response.ok) throw new Error('Failed to fetch quote.');
    const data = await response.json();
    quoteElement.textContent = `"${data.content}" — ${data.author}`;
  } catch (error) {
    console.error('Error fetching quote:', error);
    quoteElement.textContent = 'Unable to load quote at the moment.';
  }
}

// Fetch a random quote when the page loads
fetchRandomQuote();

// Add event listener for button click
quoteButton.addEventListener('click', fetchRandomQuote);