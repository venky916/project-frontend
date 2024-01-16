<template>
  <Navbar />
  <div>
    <h2>Login</h2>
    <form @submit.prevent="login">
      <label>Username:</label>
      <input v-model="username" type="text" required />
      <br />
      <label>Password:</label>
      <input v-model="password" type="password" required />
      <br />
      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue';
import axios from 'axios';

export default {
  name:"login",
  components:{
    Navbar
  },
  data() {
    return {
      username: '',
      password: '',
    };
  },
  methods: {
    login() {
      // Use Axios to perform login request with Knox token authentication
      // Upon successful login, store the token in localStorage and redirect to home page
      // (Note: You should replace the API_URL with your actual API endpoint)
      axios.post('http://127.0.0.1:8000/api/login/', { username: this.username, password: this.password })
        .then(response => {
          localStorage.setItem('token', response.data.token);
          console.log(response.data.token)
          this.$router.push('/home');
        })
        .catch(error => {
          console.error('Login failed:', error);
        });
    },
  },
};
</script>
