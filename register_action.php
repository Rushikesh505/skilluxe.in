<?php
// Database credentials
$host = '103.21.58.5:3306';
$db = 'skillqit_';
$user = 'rushi';
$pass = 'rushi@#7386';

// Establish connection
$conn = new mysqli($host, $user, $pass, $db);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Get form inputs
$username = $_POST['username'];
$password = $_POST['password'];

// Hash the password for security
$hashed_password = password_hash($password, PASSWORD_DEFAULT);

// Check if the username already exists
$check_user = "SELECT * FROM users WHERE username='$username'";
$result = $conn->query($check_user);

if ($result->num_rows > 0) {
    die("Username already exists. Please choose another.");
}

// Insert new user into database
$sql = "INSERT INTO users (username, password) VALUES ('$username', '$hashed_password')";

if ($conn->query($sql) === TRUE) {
    echo "Registration successful! You can now <a href='signin.html'>sign in</a>.";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
?>
