<template>
    <nav class="navbar">
      <div class="brand">
      <img src="/images/title-logo.jpeg" alt="Logo" class="logo-image" />
      <span class="logo-text">Welcome to Next-Apps</span>
      </div>
      <div class="nav-links">
        <router-link to="/register" class="nav-link">Register</router-link>
        <router-link to="/login" class="nav-link">Login</router-link>
      </div>
    </nav>
  </template>
  
  <script>
  export default {
    name: 'Navbar',
  };
  </script>
  
  <style>
  .navbar {
    background-color: #3498db;
    padding: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .brand {
    display: flex;
    align-items: center;
  }
  
  .logo-image {
  width: 40px; /* Set the desired width for your logo image */
  height: auto; /* Maintain aspect ratio */
  margin-right: 10px; /* Adjust the spacing between the image and text */
}

.logo-text {
  color: #fff;
  font-size: 18px;
}
  
  .nav-links {
    display: flex;
  }
  
  .nav-link {
    margin-left: 15px;
    color: #fff;
    text-decoration: none;
    font-weight: bold;
  }
  </style>
  