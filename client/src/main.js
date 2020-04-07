// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import '@mdi/font/css/materialdesignicons.css'
import Vue from 'vue'
import App from './App'
import router from './router'
//  import Vuetify from 'vuetify'
//  import 'vuetify/dist/vuetify.min.css'
import vuetify from '@/plugins/vuetify' // path to vuetify export
import { sync } from 'vuex-router-sync'
import store from '@/store/store'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import 'typeface-roboto/index.css'

Vue.config.productionTip = false
//  Vue.use(Vuetify)

sync(store, router)

/* eslint-disable no-new */
new Vue({
  vuetify,
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
}).$mount('#app')