import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import BlogMenu from './components/common/BlogMenu.vue'
import BlogNavigation from './components/common/BlogNavigation.vue'
import BlogDate from './components/common/BlogDate.vue'
import BlogIntroduction from './components/common/BlogIntroduction.vue';
import BlogHandpick from './components/common/BlogHandpick.vue'

Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.component("BlogMenu", BlogMenu);
Vue.component("BlogNavigation", BlogNavigation);
Vue.component("BlogDate", BlogDate);
Vue.component("BlogIntroduction", BlogIntroduction);
Vue.component("BlogHandpick", BlogHandpick);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
