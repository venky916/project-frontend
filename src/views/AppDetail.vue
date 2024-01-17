<template>
  <div class="main-container">
    <Header :username="username" />
    <div class="flex-container">
      <Sidebar :is_admin="is_admin" />
      <div class="app-details-container">
        <h2>App Details</h2>
        <div v-if="app">
          <div class="app-list-container">
            <img class="image" v-if="app.app_image" :src="app.app_image" alt="App Image" />
            <p>{{ app.app_name }}</p>
            <p>Points: {{ app.points }}</p>
          </div>
          <h3>Upload Screenshot</h3>
          <!-- Simple drag and drop UI -->
          <div
            class="upload-area"
            @dragover.prevent
            @dragenter.prevent
            @dragleave.prevent
            @drop.prevent="handleFileUpload"
          >
            <div class="default-background">
              <p v-if="!selectedFileName" style="color: aqua;">Drag & Drop Image Here</p>
              <img
                v-else
                :src="selectfilePreview"
                alt="Preview"
                style="max-width: 200px; max-height: 200px;"
              />
            </div>
            <button class="btn btn-secondary my-3" @click="posting">Submit</button>
            <div>
              <!-- Use the modal component -->
              <message-modal
                :show-modal="isModalVisible"
                :message="modalMessage"
                :close-modal="closeModal"
              />
            </div>
          </div>
        </div>
        <div v-else>
          <div v-if="status===404"><h1 id="notfound">404-App Not Found</h1></div>
          <div v-else>
            Loading... <!-- Add a loading indicator or message as needed -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from '@/components/Header.vue';
import Sidebar from '@/components/Sidebar.vue';
import MessageModal from '@/components/MessageModal.vue';
import axios from 'axios';
const Api = 'https://backend-app-ygah.onrender.com/api/';
export default {
  components: {
    Header,
    Sidebar,
    MessageModal,
  },
  data() {
    return {
      app: null,
      status:null,
      selectfile: null,
      user: '',
      username: '',
      is_admin: '',
      selectedFileName: '',
      selectfilePreview: '',
      isModalVisible: false,
      modalMessage: '',
    };
  },
  created() {
    document.title = "App-Detail"
    const appId = this.$route.params.id;
    const token = localStorage.getItem('token');
    axios
      .get(`${Api}app/${appId}`, { headers: { Authorization: `Token ${token}` } })
      .then(response => {
        this.app = response.data;
        this.status=response.status
      })
      .catch(error => {
        this.status=error.response.status
        console.error('Failed to fetch app details', error);
      });
    axios
      .get(`${Api}user/`, { headers: { Authorization: `Token ${token}` } })
      .then(response => {
        this.user = response.data.id;
        this.username = response.data.username;
        this.is_admin = response.data.is_admin;
      })
      .catch(error => {
        console.error('Failed to fetch user details', error);
      });
  },
  methods: {
    handleFileUpload(event) {
      this.selectfile = event.dataTransfer.files[0];
      this.selectedFileName = this.selectfile.name;
      this.selectfilePreview = URL.createObjectURL(this.selectfile);
      event.target.style.backgroundImage = 'none';
    },
    posting() {
      const token = localStorage.getItem('token');
      const fd = new FormData();
      fd.append('image', this.selectfile);
      fd.append('app', this.app.id);
      fd.append('user', this.user);
      axios
        .post(`${Api}task/`, fd, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Token ${token}`,
          },
        })
        .then(res => {
          console.log(res);
          this.showModal('Task Finished!');
        })
        .catch(err => {
          console.log(err.response.data);
          this.showModal('Error submitting task.');
        });
    },
    showModal(message) {
      this.isModalVisible = true;
      this.modalMessage = message;
    },
    closeModal() {
      this.isModalVisible = false;
      if (this.modalMessage==='Task Finished!'){
        this.$router.push({ path: '/home' });
      }
    }
  }
};
</script>

<style scoped>
.main-container {
  display: flex;
  flex-direction: column;
}

.flex-container {
  display: flex;
}

.image {
  height: 100px; /* Adjust the height as needed */
  width: 100px;
}

.app-details-container {
  flex: 1;
  padding: 15px;
}

.upload-area {
  border: 2px dashed #ccc;
  padding: 20px;
  text-align: center;
}

.default-background {
  background-image: url('/public/images/drag-drop.png'); /* Add your default image URL */
  background-size: cover;
  background-position: center center;
  height: 150px; /* Adjust the height as needed */
  width: 200px;
  justify-content: center;
}

</style>
