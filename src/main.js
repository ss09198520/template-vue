import App from './App.vue'
// import App from './import.js'
import Vue from 'vue'
import store from '@/store'
import vuetify from '@/plugins/vuetify'
import router from '@/router'

// Material icon imports
// import 'material-design-icons-iconfont/dist/material-design-icons.css'

// Components
import './components'
import './permission' // permission control
Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')