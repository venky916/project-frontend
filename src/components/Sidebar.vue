<!-- src/components/Sidebar.vue -->
<template>
  <div class="sidebar">
    <router-link to="/home" class="route" :class="{ selected: currentRoute === '/home' }">Home</router-link>
    <div v-if="!is_admin">
    <router-link to="/profile" class="route" :class="{ selected: currentRoute === '/profile' }">Profile</router-link>
    <router-link to="/points" class="route" :class="{ selected: currentRoute === '/points' }">Points</router-link>
    <router-link to="/tasks" class="route" :class="{ selected: currentRoute === '/tasks' }">Tasks</router-link>
    </div>
    <div v-else>
      <router-link to="/add-app" class="route" :class="{ selected: currentRoute === '/add-app' }">AddApp</router-link>
    </div>
    <button @click="logout" class="logout" :class="{ selected: isLogoutSelected }">Logout</button>
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
  },
  // watch: {
  //   '$route.path': 'updateCurrentRoute',
  // },
  methods: {
    updateCurrentRoute(newRoute) {
      this.currentRoute = newRoute;
    },
  },
  methods: {
    logout() {
      // Toggle the selected class when the button is clicked
      this.isLogoutSelected = !this.isLogoutSelected;
      // Clear the token and navigate to the login page
      localStorage.removeItem('token');
      this.$router.push('/login');
    },
    created(){
      console.log('sidebar',this.is_admin)
    }
  },
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
