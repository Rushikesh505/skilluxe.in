// Login logic
document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
  
    // Retrieve input values
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
  
    // Retrieve stored credentials from localStorage
    const storedUsername = localStorage.getItem('username');
    const storedPassword = localStorage.getItem('password');
  
    // Authenticate user
    if (username === storedUsername && password === storedPassword) {
      alert('Login successful!');
      window.location.href = 'skillmatch.html'; // Redirect to the dashboard or homepage
    } else {
      document.getElementById('error').style.display = 'block';
    }
  });
  