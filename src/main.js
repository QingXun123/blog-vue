import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import BlogMenu from './components/pc/common/BlogMenu.vue'
import BlogNavigation from './components/pc/common/BlogNavigation.vue'
import BlogDate from './components/pc/common/BlogDate.vue'
import BlogIntroduction from './components/pc/common/BlogIntroduction.vue';
import BlogHandpick from './components/pc/common/BlogHandpick.vue'

import MobileMenu from './components/mobile/common/MobileMenu.vue'

Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.component("BlogMenu", BlogMenu);
Vue.component("BlogNavigation", BlogNavigation);
Vue.component("BlogDate", BlogDate);
Vue.component("BlogIntroduction", BlogIntroduction);
Vue.component("BlogHandpick", BlogHandpick);
Vue.component("MobileMenu", MobileMenu);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
