<!-- src/components/Header.vue -->
<template>
  <div class="header">
    <h2>Hello {{ username }}</h2>
  </div>
</template>

<script>
export default {
  props: ['username'],
};
</script>

<style>
.header{
  border: 1px solid whitesmoke;
  background-color: #f1f1f1;
  align-items: center;
  text-align: center;
}
</style>
