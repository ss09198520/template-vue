import App from './App.vue'
// import App from './import.js'
import Vue from 'vue'
import store from '@/store'
import vuetify from '@/plugins/vuetify'
import router from '@/router'
import VueMask from 'v-mask'
import base from './css/base.css';


// Material icon imports use css loader
// import 'material-design-icons-iconfont/dist/material-design-icons.css'

// As a plugin
Vue.use(VueMask);

// Components
import './components'
import './permission' // permission control
Vue.config.productionTip = false


new Vue({
  router,
  store,
  vuetify,
  base,
  render: h => h(App)
}).$mount('#app')