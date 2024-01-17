<!-- src/components/Sidebar.vue -->
<template>
  <div class="sidebar">
    <router-link to="/home" class="route" :class="{ selected: isHomeSelected }">
      <i class="fas fa-home"></i> Home</router-link>
    <div v-if="!is_admin">
    <router-link to="/profile" class="route" :class="{ selected: currentRoute === '/profile' }">
      <i class="fas fa-user"></i> Profile</router-link>
    <router-link to="/points" class="route" :class="{ selected: currentRoute === '/points' }">
      <i class="fas fa-star"></i> Points</router-link>
    <router-link to="/tasks" class="route" :class="{ selected: currentRoute === '/tasks' }">
      <i class="fas fa-tasks"></i> Tasks</router-link>
    </div>
    <div v-else>
      <router-link to="/add-app" class="route" :class="{ selected: currentRoute === '/add-app' }">
        <i class="fas fa-plus"></i> AddApp</router-link>
    </div>
    <button @click="logout" class="logout" :class="{ selected: isLogoutSelected }">
      <i class="fas fa-sign-out-alt"></i> Logout</button>
  </div>
</template>

<script>
export default {
  props:["is_admin"],
  data() {
    return {
      // currentRoute: this.$route.path,
      isLogoutSelected: false,
    };
  },
  computed: {
    currentRoute() {
      return this.$route.path;
    },
    isHomeSelected() {
      // Check if the current route is either '/home' or starts with '/app-details'
      return this.$route.path === "/home" || this.$route.path.startsWith("/app");
    },
  },
  // watch: {
  //   '$route.path': 'updateCurrentRoute',
  // },
  methods: {
    updateCurrentRoute(newRoute) {
      this.currentRoute = newRoute;
    },
    logout() {
      // Toggle the selected class when the button is clicked
      this.isLogoutSelected = !this.isLogoutSelected;
      // Clear the token and navigate to the login page
      localStorage.removeItem('token');
      this.$router.push('/login');
    },
  }, 
    created(){
      console.log('sidebar',this.is_admin)
    }
};
</script>

<style>
.sidebar {
  width: 200px;
  background-color: #f1f1f1;
  padding: 15px;
}

.route, .logout {
  display: block;
  padding: 10px;
  background-color: #FFF;
  margin-bottom: 5px;
  text-decoration: none;
  color: #000;
}

.logout {
  border: none;
  width: 100%;
}

.selected {
  background-color: purple;
  color: #FFF;
}

.sidebar a:hover {
  background-color: #ddd;
}
</style>
