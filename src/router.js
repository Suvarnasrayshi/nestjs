import { createRouter, createWebHistory } from "vue-router";
import Registration from './components/registration.vue'
import Login from './components/login.vue'
import forgetPassword from './components/forgetPassword.vue'

const routes = [
  {
    name: 'Registration',
    path: '/',
    component: Registration
  },
  {
    name: 'Login',
    path: '/login',
    component: Login
  },
   {
    name: 'forgetPassword',
    path: '/forgetPassword',
    component: forgetPassword
  },
  {
    name: 'task',
    path: '/task',
    component: () => import('./components/task.vue') 
  },
  // {
  //   name: 'pageNotFound',
  //   path: '/:pathMatch(.*)*',
  //   component: pageNotFound
  // },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
})
export default router;