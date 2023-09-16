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

// 添加全局前置守卫
router.beforeEach((to, from, next) => {
  // 滚动到页面顶部
  window.scrollTo(0, 0);
  next();
});

export default router
