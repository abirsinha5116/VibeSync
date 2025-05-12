document.addEventListener('DOMContentLoaded', function() {
    // Handle sign up form submission
    const signupForm = document.getElementById('signupForm');
    signupForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const username = signupForm.elements['txt'].value.trim();
      const email = signupForm.elements['email'].value.trim();
      const password = signupForm.elements['pswd'].value;
      
      if (username && email && password) {
        // Save the user credentials in localStorage
        const user = { username, email, password };
        localStorage.setItem('vibesyncUser', JSON.stringify(user));
        // Redirect to index.html on successful sign up
        window.location.href = "/mnt/Personal/College/Major Project/Spotify-Clone-main/templates/index.html";
      } else {
        alert("Please fill in all the fields.");
      }
    });
  
    // Handle login form submission
    const loginForm = document.getElementById('loginForm');
    loginForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const email = loginForm.elements['email'].value.trim();
      const password = loginForm.elements['pswd'].value;
      const storedUser = localStorage.getItem('vibesyncUser');
      
      if (storedUser) {
        const user = JSON.parse(storedUser);
        if (user.email === email && user.password === password) {
          // Credentials match, redirect to index.html
          window.location.href = "/mnt/Personal/College/Major Project/Spotify-Clone-main/templates/index.html";
        } else {
          alert("Invalid credentials. Please try again.");
        }
      } else {
        alert("No user found. Please sign up first.");
      }
    });
  });
  