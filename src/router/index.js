// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/Home.vue';
import Login from '@/views/Login.vue';
import Register from '@/views/Register.vue';
import Profile from '@/views/Profile.vue';
import Points from '@/views/Points.vue';
import Tasks from '@/views/Tasks.vue';
import AppDetail from '@/views/AppDetail.vue';
import AddApp from '@/views/AddApp.vue';

const routes = [
  { path: '/', redirect: '/register' },
  { path: '/home', component: Home },
  { path: '/login', component: Login },
  { path: '/register', component: Register },
  { path: '/profile', component: Profile },
  { path: '/points', component: Points },
  { path: '/tasks', component: Tasks },
  {
    path:'/app/:id',
    name: 'app-details',
    component:AppDetail
  },
  {
    path:'/add-app',
    name: 'add-app',
    component:AddApp
  },
  {
    path: "/:catchAll(.*)",
    name: "page-not-found",
    component: () => import("../views/NotFound.vue"),
  },

];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
