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

// Check if the user exists
$sql = "SELECT * FROM users WHERE username='$username'";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $user = $result->fetch_assoc();

    // Verify the password
    if (password_verify($password, $user['password'])) {
         header("Location: guide.html");
        exit();
    } else {
        echo "Invalid password. Please try again.";
    }
} else {
    echo "No account found with that username. Please <a href='register.html'>register</a>.";
}

$conn->close();
?>
