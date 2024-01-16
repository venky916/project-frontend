<!-- src/views/Home.vue -->
<template>
  <div v-if="username" >
    <Header :username="username" />
    <div class="containers">
    <div class="flex-container">
      <Sidebar :is_admin="is_admin"/>
      <AppList :apps="apps" />
    </div>
    </div>
  </div>
  <div v-else>
    Loading...
  </div>
</template>

<script>
import Header from '@/components/Header.vue';
import Sidebar from '@/components/Sidebar.vue';
import AppList from '@/components/AppList.vue';
import axios from 'axios';
const Api='https://backend-app-ygah.onrender.com/api/'
export default {
  components: {
    Header,
    Sidebar,
    AppList,
  },
  data() {
    return {
      username: '',
      is_admin:'',
      apps: [],
      app: null,
    };
  },
  created() {
    this.fetchUserDetails();
    this.fetchAppList();
  },
  methods: {
    fetchUserDetails() {
      const token = localStorage.getItem('token'); // Retrieve the token from localStorage
      axios.get(`${Api}user/`, { headers: { Authorization: `Token ${token}` } })
        .then(response => {
          console.log(response)
          this.username = response.data.username
          this.is_admin = response.data.is_admin;
          console.log( this.username, this.is_admin)
        })
        .catch(error => {
          console.error('Failed to fetch user details', error);
        });
    },
    fetchAppList() {
      const token = localStorage.getItem('token');
      axios.get(`${Api}app/`, { headers: { Authorization: `Token ${token}` } })
        .then(response => {
          console.log(response)
          this.apps = response.data;
        })
        .catch(error => {
          console.error('Failed to fetch app list', error);
        });
    },
    selectApp(app) {
      // Set the selected app when an app is clicked in AppList
      this.app = app;
  },
  }
};
</script>

<style>
.flex-container {
  display: flex;
  background-color: white;
  height: 100%;
}
.containers {
  width: 100vw;
  height: 100%;
}
</style>
