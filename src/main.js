import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import BlogMenu from './components/common/BlogMenu.vue'
import BlogNavigation from './components/common/BlogNavigation.vue'

Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.component("BlogMenu", BlogMenu);
Vue.component("BlogNavigation", BlogNavigation);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
