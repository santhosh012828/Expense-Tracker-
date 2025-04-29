document.addEventListener("DOMContentLoaded", () => {
    let user = sessionStorage.getItem("loggedInUser");  // Fix: Use sessionStorage
    if (!user) {
        alert("Please login first!");
        window.location.href = "login.html";
        return;
    }
    document.getElementById("username").innerText = user;
    loadExpenses();
});

// Add Expense Function
function addExpense() {
    let name = document.getElementById("name").value.trim();
    let amount = parseFloat(document.getElementById("amount").value);
    let type = document.getElementById("type").value;

    if (!name || isNaN(amount) || amount <= 0 || type === "") {
        alert("Please enter valid details!");
        return;
    }

    let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
    expenses.push({ name, amount, type });
    localStorage.setItem("expenses", JSON.stringify(expenses));

    updateTable(expenses);  // ✅ Now updates balance too
}


// Load Expenses Function
function loadExpenses() {
    let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
    updateTable(expenses);  // Fix: Pass expenses to updateTable()
}

// Update Table Function
// Update Table Function
function updateTable(expenses) {
    let table = document.getElementById("expense-table");
    table.innerHTML = "";  // Clear table before updating

    let totalIncome = 0;
    let totalExpenses = 0;

    expenses.forEach((item, index) => {
        // Calculate income & expenses separately
        if (item.type === "income") {
            totalIncome += item.amount;
        } else {
            totalExpenses += item.amount;
        }

        let row = document.createElement("tr");
        row.innerHTML = `
            <td>${item.name}</td>
            <td>₹${item.amount}</td>
            <td class="${item.type === 'income' ? 'text-success' : 'text-danger'}">${item.type}</td>
            <td><button class="btn btn-danger btn-sm" onclick="deleteExpense(${index})">Delete</button></td>
        `;
        table.appendChild(row);
    });

    // Calculate Balance
    let balance = totalIncome - totalExpenses;

    // Update HTML elements
    document.getElementById("balance").innerText = `₹${balance}`;
    document.getElementById("income").innerText = `₹${totalIncome}`;
    document.getElementById("expenses").innerText = `₹${totalExpenses}`;
}


// Delete Expense Function
function deleteExpense(index) {
    let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
    expenses.splice(index, 1);
    localStorage.setItem("expenses", JSON.stringify(expenses));
    updateTable(expenses);  // ✅ Now updates balance too
}

