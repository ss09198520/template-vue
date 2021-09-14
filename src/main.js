import App from './App.vue'
// import App from './import.js'
import Vue from 'vue'
import store from '@/store'
import vuetify from '@/plugins/vuetify'
import router from '@/router'
import VueMask from 'v-mask'
import base from './css/base.css';
import Notifications from 'vue-notification';


// Material icon imports use css loader
// import 'material-design-icons-iconfont/dist/material-design-icons.css'

// As a plugin
Vue.use(VueMask);
Vue.use(Notifications);

// Components
import './components'
import './permission' // permission control
Vue.config.productionTip = false


new Vue({
  router,
  store,
  vuetify,
  base,
  Notifications,
  render: h => h(App)
}).$mount('#app')