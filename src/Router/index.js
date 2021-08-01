import Vue from 'vue'
import Router from 'vue-router'
import Admin from '../components/Admin';
import Dashboard from '../components/DashBoard';
 import login from '../components/login';

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
        path: '/dashboard',
        name: 'Dashboard',
        component: Dashboard
      },
    {
        path: '/admin',
        name: 'admin',
        component: Admin
      }
  ]

  
})