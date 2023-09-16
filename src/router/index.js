import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/essay/:essayId',
    name: 'essay',
    component: () => import('../views/EssayView.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
