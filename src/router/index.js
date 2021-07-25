import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Queue',
    component: () => import('../views/Queue')
  },
  {
    path: '/admin',
    name: 'Admin Panel',
    component: ()=>import('../views/AdminPanel')
  },
  {
    path: '/queue',
    name: 'Full Queue',
    component: ()=>import('../views/QueueFull')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
