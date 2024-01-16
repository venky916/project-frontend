<template>
  <div v-if="user && allApps">
    <Header :username="user.username" />
    <div class="flex-container">
      <Sidebar :is_admin="user.is_admin" />
      <div>
        <h2>User Tasks</h2>
        <p>Tasks Completed: {{ getCompletedTasksCount() }}</p>
        <div v-for="app in allApps" :key="app.id">
          <input
            type="checkbox"
            :checked="isAppDownloaded(app.id)"
            disabled
          />
          <label>{{ app.app_name }} - Points: {{ app.points }}</label>
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

export default {
  components: {
    Header,
    Sidebar,
  },
  data() {
    return {
      user: null,
      allApps: null,
      downloadedApps: [], // IDs of downloaded apps
    };
  },
  mounted() {
    const token = localStorage.getItem('token');

    // Fetch user details
    axios
      .get(`http://127.0.0.1:8000/api/user/`, {
        headers: { Authorization: `Token ${token}` },
      })
      .then(response => {
        this.user = response.data;
      })
      .catch(error => {
        console.error('Failed to fetch user details', error);
      });

    // Fetch all apps
    axios
      .get(`http://127.0.0.1:8000/api/app/`, {
        headers: { Authorization: `Token ${token}` },
      })
      .then(response => {
        this.allApps = response.data;
      })
      .catch(error => {
        console.error('Failed to fetch all apps', error);
      });

    // Fetch user's downloaded apps
    axios
      .get(`http://127.0.0.1:8000/api/user/apps/`, {
        headers: { Authorization: `Token ${token}` },
      })
      .then(response => {
        this.downloadedApps = response.data.map(app => app.id);
      })
      .catch(error => {
        console.error('Failed to fetch user apps', error);
      });
  },
  methods: {
    isAppDownloaded(appId) {
      return this.downloadedApps.includes(appId);
    },
    getCompletedTasksCount() {
      return this.downloadedApps.length;
    },
  },
};
</script>

<style scoped>
/* Add your component styles here */
</style>
