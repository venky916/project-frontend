<template>
  <div v-if="user">
    <Header :username="user.username" />
    <div class="container">
      <div class="flex-container">
        <Sidebar :is_admin="user.is_admin" />
        <!-- Drag and drop area for user image -->
        <div class="upload-area" @dragover.prevent @dragenter.prevent @dragleave.prevent @drop.prevent="handleFileUpload"
          v-show="editing">
          <!-- Default background image for the drop area -->
          <div class="default-background" v-show="!selectfilePreview && !user.user_image"></div>
          <img v-if="selectfilePreview || user.user_image" :src="selectfilePreview || user.user_image" alt="Preview"
            class="dragged-image" />
          <p v-if="!selectedFileName && !selectfilePreview && !user.user_image">Drag & Drop Image Here</p>
        </div>
        <div class="user-profile-container">
          <img v-if="editing && editedUser.user_image" :src="editedUser.user_image" alt="User Image" class="user-image" />
          <img v-else-if="user.user_image" :src="user.user_image" alt="User Image" class="user-image" />
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
                <option value="M">Male</option>
                <option value="F">Female</option>
                <option value="O">Others</option>
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
const Api = 'https://backend-app-ygah.onrender.com/api/'
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
        user_image: ''
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
        .get(`${Api}user/`, {
          headers: { Authorization: `Token ${token}` },
        })
        .then(response => {
          this.user = response.data;
          this.editedUser = { ...this.user }; // Initialize editedUser with the current user data
          console.log(this.user, this.editedUser)
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
      const formData = new FormData();
      if (this.selectfile) {
        formData.append('image', this.selectfile);
      }

      // Append other form fields only if they are not null
      if (this.editedUser.username !== null) {
        formData.append('username', this.editedUser.username);
      }

      if (this.editedUser.email !== null) {
        formData.append('email', this.editedUser.email);
      }

      if (this.editedUser.first_name !== null) {
        formData.append('first_name', this.editedUser.first_name);
      }

      if (this.editedUser.last_name !== null) {
        formData.append('last_name', this.editedUser.last_name);
      }

      if (this.editedUser.gender !== null) {
        formData.append('gender', this.editedUser.gender);
      }

      if (this.editedUser.date_of_birth !== null) {
        formData.append('date_of_birth', this.editedUser.date_of_birth);
      }

      axios
        .patch(`${Api}user/${this.user.id}/`, formData, {
          headers: {
            Authorization: `Token ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        })
        .then(response => {
          console.log('User profile updated successfully', response.data);
          this.editing = false;
          this.fetchUserData(); // Make sure to refresh user data after update
        })
        .catch(error => {
          console.error('Failed to update user profile', error);
        });
    },
    handleFileUpload(event) {
      event.preventDefault();
      this.selectfile = event.dataTransfer.files[0];
      this.selectedFileName = this.selectfile.name;

      const reader = new FileReader();
      reader.onload = (e) => {
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

.upload-area {
  border: 2px dashed #ccc;
  padding: 20px;
  text-align: center;
  margin-top: 20px;
}

.default-background {
  background-image: url('/public/images/user-backround.jpg');
  background-size: cover;
  background-position: center center;
  height: 100px;
}

.dragged-image {
  width: 100%;
}

.user-image {
  width: 100px;
  height: 100px;
}

/* Additional styles for the dropdown and date input */
select,
input[placeholder="YYYY-MM-DD"] {
  width: 100%;
  padding: 8px;
  margin-top: 5px;
}</style>
