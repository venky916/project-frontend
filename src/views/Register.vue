<template>
  <Navbar />
  <div>
    <h2>Register</h2>
    <form @submit.prevent="register">
      <label>Username:</label>
      <input v-model="username" type="text" required />
      <br />
      <label>Email:</label>
      <input v-model="email" type="email" required />
      <br />
      <label>Password:</label>
      <input v-model="password" type="password" required />
      <br />
      <label for="isAdmin">Admin:</label>
      <input v-model="is_admin" type="checkbox" id="isAdmin" />
      <br />
      <button type="submit">Register</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';
import Navbar from '@/components/Navbar.vue';
const Api='https://backend-app-ygah.onrender.com/api/'
export default {
  name: 'register',
  components: {
    Navbar,
  },
  data() {
    return {
      username: '',
      email: '',
      password: '',
      is_admin: false, // Initialize with a default value
    };
  },
  created(){
    document.title="Register"
  },
  methods: {
    register() {
      // Use Axios to perform registration request with Knox token authentication
      // Upon successful registration, store the token in localStorage and redirect to home page
      // (Note: You should replace the API_URL with your actual API endpoint)
      axios
        .post(`${Api}register/`, {
          username: this.username,
          email: this.email,
          password: this.password,
          is_admin: this.is_admin, // Include the is_admin value in the request body
        })
        .then((response) => {
          // localStorage.setItem('token', response.data.token);
          this.$router.push('/login');
        })
        .catch((error) => {
          console.error('Registration failed:', error);
        });
    },
  },
};
</script>
