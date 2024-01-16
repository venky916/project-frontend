<!-- src/components/AppList.vue -->
<template>
    <div class="app-list-container">
      <h2>App List</h2>
      <div v-for="app in apps" :key="app.id" class="app-list" @click="showAppDetails(app)">
        <div class="app-item">
          <div class="image-name">
          <img :src="app.app_image" alt="App Image"  />
          <p>{{ app.app_name }}</p>
        </div>
        <div class="points">
          <p>{{ app.points }} Points</p>
        </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: ['apps'],
    data() {
      return {
        app: null,
      };
    },
    methods: {
      showAppDetails(app) {
        // Emit an event to notify the parent (Home) component that an app is selected
        this.app=app
        this.$emit('app', app);
        this.$router.push({ name: 'app-details', params: { id: app.id } });
        console.log(this.app)
      },
    },
  };
  </script>
  
<style scoped>

.app-list-container {
  display: flex;
  flex-direction: column;
  flex: 1
}
.app-list {
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  text-align: justify;
  background-color: white;
}

.app-item {
  display: flex;
  flex: 1;
  flex-direction: row;
  align-items: center;
  text-align: center;
  justify-content: space-between;
  border: 1px solid blue;
  background-color: #f1f1f1;
  padding: 12px;
  margin: 8px 12px;
}
.image-name{
  display: flex;
  flex-direction: row;
}
.image-name  p{
  padding: 20px;
}
.app-item img {
  width: 100px;
  height: 100px;
}
.points{
  background-color: #f1f1f1;
  margin: 10px;
  text-align: center;
  line-height: 75px;
  font-size: 20px;
}
.app-details {
  font-size: 14px; /* Adjust font size as needed */
}
</style>