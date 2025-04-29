// Register Function
function register() {
    let fullName = document.getElementById("full-name").value.trim();
    let email = document.getElementById("email").value.trim();
    let username = document.getElementById("reg-username").value.trim();
    let password = document.getElementById("reg-password").value.trim();
    let confirmPassword = document.getElementById("confirm-password").value.trim();
    let messageBox = document.getElementById("register-message");

    messageBox.innerHTML = ""; // Clear previous messages

    // Basic Validation
    if (!fullName || !email || !username || !password || !confirmPassword) {
        messageBox.innerHTML = "All fields are required!";
        return;
    }
    if (!email.match(/^\S+@\S+\.\S+$/)) {
        messageBox.innerHTML = "Enter a valid email address!";
        return;
    }
    if (password.length < 6) {
        messageBox.innerHTML = "Password must be at least 6 characters!";
        return;
    }
    if (password !== confirmPassword) {
        messageBox.innerHTML = "Passwords do not match!";
        return;
    }

    // Get existing users
    let users = JSON.parse(localStorage.getItem("users")) || [];

    // Check if username already exists
    if (users.some(user => user.username === username)) {
        messageBox.innerHTML = "Username already exists!";
        return;
    }

    // Add new user
    users.push({ fullName, email, username, password });
    localStorage.setItem("users", JSON.stringify(users));

    alert("Registration successful! You can now log in.");
    window.location.href = "login.html";
}

// Login Function
function login() {
    let username = document.getElementById("login-username").value.trim();
    let password = document.getElementById("login-password").value.trim();

    // Get users from local storage
    let users = JSON.parse(localStorage.getItem("users")) || [];

    // Find user
    let user = users.find(user => user.username === username);
    if (!user) {
        alert("User not found! Please register.");
        return;
    }

    // Check password
    if (user.password !== password) {
        alert("Incorrect password! Try again.");
        return;
    }

    // Store logged-in user in session
    sessionStorage.setItem("loggedInUser", username);

    alert("Login successful!");
    
    // Redirect to expense tracker page
    window.location.href = "expense-tracker.html";
}

// Logout Function
function logout() {
    sessionStorage.removeItem("loggedInUser");
    alert("Logged out successfully!");
    window.location.href = "login.html";  // Redirect to login page
}
