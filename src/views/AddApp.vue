<template>
  <div v-if="username" class="flex-container">
    <Sidebar :is_admin="is_admin" />
    <div>
      <Header :username="username" />
      <h2>App Information Form</h2>
      <form @submit.prevent="submitForm">
        <div class="upload-area" @dragover.prevent @dragenter.prevent @dragleave.prevent @drop.prevent="handleFileUpload">
          <!-- Default background image for the drop area -->
          <div class="default-background">
            <p v-if="!selectedFileName">Drag & Drop App Icon Here</p>
            <img v-else :src="previewImage" alt="App Icon Preview" class="app-icon-preview" />
          </div>
        </div>
        <div>
          <label for="appName">App Name:</label>
          <input v-model="appName" type="text" id="appName" required />
        </div>
        <div>
          <label for="appPoints">App Points:</label>
          <input v-model="appPoints" type="number" id="appPoints" required />
        </div>
        <div>
          <label for="appCategory">App Category:</label>
          <select v-model="appCategory" id="appCategory" required>
            <option value="1">Education App</option>
            <option value="2">Music & Audio App</option>
            <option value="3">Business App</option>
            <option value="4">Tools App</option>
            <option value="5">Entertainment App</option>
            <option value="6">Lifestyle App</option>
            <option value="7">Books & References App</option>
            <option value="8">Food & Drinks App</option>
            <option value="9">Shopping App</option>
            <option value="10">Productivity App</option>
          </select>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  </div>
  <div v-else>loading...</div>
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
      username: '',
      is_admin: '',
      appName: '',
      appPoints: 0,
      appCategory: '',
      selectfile: null,
      selectedFileName: '',
      previewImage: '',
    };
  },
  created() {
    this.fetchUserDetails();
  },
  methods: {
    fetchUserDetails() {
      const token = localStorage.getItem('token');
      axios.get(`${Api}user/`, { headers: { Authorization: `Token ${token}` } })
        .then(response => {
          this.username = response.data.username;
          this.is_admin = response.data.is_admin;
        })
        .catch(error => {
          console.error('Failed to fetch user details', error);
        });
    },
    handleFileUpload(event) {
      this.selectfile = event.dataTransfer.files[0];
      this.selectedFileName = this.selectfile.name;
      this.previewImage = URL.createObjectURL(this.selectfile);
      event.target.style.backgroundImage = 'none';
    },
    submitForm() {
      const token = localStorage.getItem('token');
      const formData = new FormData();
      formData.append('image', this.selectfile);
      formData.append('app_name', this.appName);
      formData.append('points', this.appPoints);
      formData.append('app_category', this.appCategory);

      axios({
        method: 'post',
        url: `${Api}app/`,
        data: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Token ${token}`,
        },
      })
        .then(response => {
          console.log('Success:', response.data);
          // Handle success as needed
        })
        .catch(error => {
          console.error('Error:', error);
          // Handle error as needed
        });
    },
  },
};
</script>

<style scoped>
.app-icon-preview {
  max-width: 200px;
  max-height: 200px;
  border-radius: 50%; /* Border radius to make it circular */
}

.upload-area {
  border: 2px dashed aqua;
  padding: 20px;
  text-align: center;
  /* position: relative; */
}

.default-background {
  background-image: url('/public/images/drag-drop.png'); /* Provide the correct path to your default image */
  background-size: 100% 100%;
  background-size: cover;
  background-position: center center;
  height: 100px;
  border-radius: 50%; /* Border radius to make it circular */
}

/* Additional styles for other form elements... */
</style>
