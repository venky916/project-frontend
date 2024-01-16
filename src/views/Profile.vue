<template>
  <div v-if="user">
    <Header :username="user.username" />
  <div class="container">
    <div class="flex-container">
      <Sidebar :is_admin="user.is_admin" />
      <!-- Drag and drop area for user image -->
      <div class="upload-area" @dragover.prevent @drop="handleFileUpload">
        <!-- Default background image for the drop area -->
        <div class="default-background"></div>
        <p v-if="!selectedFileName">Drag & Drop Image Here</p>
        <img
          v-else
          :src="selectfilePreview"
          alt="Preview"
          class="dragged-image"
        />
      </div>
      <div class="user-profile-container">
        <img
          v-if="editing && editedUser.user_image"
          :src="editedUser.user_image"
          alt="User Image"
        />
        <img
          v-else-if="user.user_image"
          :src="user.user_image"
          alt="User Image"
        />
        <p>
          <span>Email:</span>
          <span v-if="editing">
            <input v-model="editedUser.email" />
          </span>
          <span v-else>{{ user.email }}</span>
        </p>
        <p>
          <span>First Name:</span>
          <span v-if="editing">
            <input v-model="editedUser.first_name" />
          </span>
          <span v-else>{{ user.first_name || 'N/A' }}</span>
        </p>
        <p>
          <span>Last Name:</span>
          <span v-if="editing">
            <input v-model="editedUser.last_name" />
          </span>
          <span v-else>{{ user.last_name || 'N/A' }}</span>
        </p>
        <p>
          <span>Gender:</span>
          <span v-if="editing">
            <select v-model="editedUser.gender">
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </span>
          <span v-else>{{ user.gender || 'N/A' }}</span>
        </p>
        <p>
          <span>Date of Birth:</span>
          <span v-if="editing">
            <input v-model="editedUser.date_of_birth" placeholder="YYYY-MM-DD" />
          </span>
          <span v-else>{{ user.date_of_birth || 'N/A' }}</span>
        </p>

        <div v-if="!editing">
          <button @click="editProfile">Edit Profile</button>
        </div>
        <div v-else>
          <button @click="updateProfile">Save</button>
        </div>
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
      editing: false,
      editedUser: {
        username: '',
        email: '',
        first_name: '',
        last_name: '',
        gender: '',
        date_of_birth: '',
        // Add other fields as needed
      },
      selectfile: '',
      selectfilePreview: '',
      selectedFileName: '',
    };
  },
  mounted() {
    this.fetchUserData();
  },
  methods: {
    fetchUserData() {
      const token = localStorage.getItem('token');
      axios
        .get(`http://127.0.0.1:8000/api/user/`, {
          headers: { Authorization: `Token ${token}` },
        })
        .then(response => {
          this.user = response.data;
          this.editedUser = { ...this.user }; // Initialize editedUser with the current user data
        })
        .catch(error => {
          console.error('Failed to fetch user details', error);
        });
    },
    editProfile() {
      this.editing = true;
    },
    updateProfile() {
      const token = localStorage.getItem('token');
      axios
        .patch(`http://127.0.0.1:8000/api/user/${this.user.id}/`, this.editedUser, {
          headers: { Authorization: `Token ${token}` },
        })
        .then(response => {
          console.log('User profile updated successfully', response.data);
          this.editing = false;
          this.fetchUserData();
        })
        .catch(error => {
          console.error('Failed to update user profile', error);
        });
    },
    handleFileUpload(event) {
      this.selectfile = event.dataTransfer.files[0];
      this.selectedFileName = this.selectfile.name;

      const reader = new FileReader();
      reader.onload = e => {
        this.selectfilePreview = e.target.result;
      };

      reader.readAsDataURL(this.selectfile);
    },
  },
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

img {
  width: 100px;
  height: 100px;
}

.dragged-image {
  width: 100%;
}

.upload-area {
  border: 2px dashed #ccc;
  padding: 20px;
  text-align: center;
  margin-top: 20px;
}

.default-background {
  background-image: url('/public/images/test.jpg'); /* Provide the correct path to your default image */
  background-size: cover;
  height: 100px;
}

/* Additional styles for the dropdown and date input */
select,
input[placeholder="YYYY-MM-DD"] {
  width: 100%;
  padding: 8px;
  margin-top: 5px;
}
</style>
