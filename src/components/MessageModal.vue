<template>
  <div class="message-modal" v-if="showModal">
    <div class="modal-content">
      <span class="close" @click="closeModal">&times;</span>
      <p>{{ message }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    message: String,
    showModal: Boolean,
    closeModal: Function,
  },
};
</script>

<style scoped>
/* Add your modal styles here */
.message-modal {
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
}

.modal-content {
  background-color: #fefefe;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
  max-width: 400px; /* Adjust the max-width as needed */
  text-align: center;
  position: relative; /* Added to make positioning relative to this container */
}

.close {
  color: #aaa;
  font-size: 28px;
  font-weight: bold;
  cursor: pointer;
  position: absolute;
  top: 10px; /* Adjust the top position as needed */
  right: 10px; /* Adjust the right position as needed */
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}
</style>

