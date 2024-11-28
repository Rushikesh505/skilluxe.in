document.getElementById('signupForm').addEventListener('submit', function(e) {
  e.preventDefault();

  // Retrieve input values
  const firstName = document.getElementById('firstName').value.trim();
  const lastName = document.getElementById('lastName').value.trim();
  const email = document.getElementById('email').value.trim();
  const username = document.getElementById('signupUsername').value.trim();
  const password = document.getElementById('signupPassword').value;
  const confirmPassword = document.getElementById('confirmPassword').value;

  // Validation messages
  const errorMessage = document.getElementById('signupError');
  const successMessage = document.getElementById('signupSuccess');

  // Validate input fields
  if (!firstName || !lastName || !email || !username || !password || !confirmPassword) {
    errorMessage.textContent = 'Please fill in all fields.';
    errorMessage.style.display = 'block';
    successMessage.style.display = 'none';
    return;
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    errorMessage.textContent = 'Please enter a valid email address.';
    errorMessage.style.display = 'block';
    successMessage.style.display = 'none';
    return;
  }

  // Validate password length
  if (password.length < 6) {
    errorMessage.textContent = 'Password should be at least 6 characters long.';
    errorMessage.style.display = 'block';
    successMessage.style.display = 'none';
    return;
  }

  // Validate password match
  if (password !== confirmPassword) {
    errorMessage.textContent = 'Passwords do not match.';
    errorMessage.style.display = 'block';
    successMessage.style.display = 'none';
    return;
  }

  // Save credentials in localStorage
  localStorage.setItem('firstName', firstName);
  localStorage.setItem('lastName', lastName);
  localStorage.setItem('email', email);
  localStorage.setItem('username', username);
  localStorage.setItem('password', password);

  // Display success message
  successMessage.textContent = 'Sign-up successful! You can now log in.';
  successMessage.style.display = 'block';
  errorMessage.style.display = 'none';

  // Redirect to login page after a short delay
  setTimeout(() => {
    window.location.href = 'login.html';
  }, 2000);
});
