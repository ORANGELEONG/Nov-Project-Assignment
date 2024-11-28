// Array to store items
let items = [];

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