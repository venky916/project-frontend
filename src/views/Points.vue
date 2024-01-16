<template>
  <div v-if="user">
    <Header :username="user.username" />
    <div class="flex-container">
      <Sidebar :is_admin="user.is_admin" />
      <div>
        <h2>User Task Details</h2>
        <p>Points Earned: {{ user.points_earned }}</p>
        <h2>Downloaded Apps</h2>
        <div v-if="userapps && userapps.length > 0">
          <ul>
            <li v-for="app in userapps" :key="app.id">
              <strong>{{ app.AppName }}</strong> - Points: {{ app.Points }}
            </li>
          </ul>
        </div>
        <div v-else>
          <p>No downloaded apps yet.</p>
        </div>
      </div>
    </div>
  </div>
  <div v-else>
    Loading... <!-- Add a loading indicator or message as needed -->
  </div>
</template>

<script>
import Header from '@/components/Header.vue';
import Sidebar from '@/components/Sidebar.vue';
import axios from 'axios';
const Api='https://backend-app-ygah.onrender.com/api/'
export default {
  components: {
    Header,
    Sidebar,
  },
  data() {
    return {
      user: null,
      userapps: null,
    };
  },
  mounted() {
    const token = localStorage.getItem('token');
    axios
      .get(`${Api}user/points`, {
        headers: { Authorization: `Token ${token}` },
      })
      .then(response => {
        this.user = response.data
        console.log(this.user);
      })
      .catch(error => {
        console.error('Failed to fetch user details', error);
      });

    axios
      .get(`${Api}user/apps/`, {
        headers: { Authorization: `Token ${token}` },
      })
      .then(response => {
        this.userapps = response.data;
        console.log(this.userapps)
      })
      .catch(error => {
        console.error('Failed to fetch user apps', error);
      });
  },
};
</script>

<style scoped>
/* Add your component styles here */
</style>
