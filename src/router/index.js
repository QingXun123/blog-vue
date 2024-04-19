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
  },
  {
    path: '/search/:subject',
    name: 'search',
    component: () => import('../views/EssaySearchView.vue')
  },
  {
    path: '/disclaimer',
    name: 'disclaimer',
    component: () => import('../views/DisclaimerView.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/LoginView.vue')
  },
  {
    path: '/chat',
    name: 'chat',
    component: () => import('../views/ChatView.vue')
  },
  {
    path: '/video/:videoId',
    name: 'videoInfo',
    component: () => import('../views/VideoInfoView.vue')
  },
  {
    path: '/video/play/:videoEpisodeId',
    name: 'video',
    component: () => import('../views/VideoView.vue')
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
