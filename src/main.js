// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import axios from 'axios'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/css/common.css' // css

// import router from './router'
// import VueRouter from 'vue-router'
import router from './router'

// import store from './vuex/store'
import Vuex from 'vuex'
import store from './vuex/store'
import 'font-awesome/css/font-awesome.min.css'
import '../static/css/animate.css'
Vue.config.productionTip = false
Vue.config.axios = axios
Vue.use(Element)
// Vue.use(VueRouter)
Vue.use(Vuex)
/* eslint-disable no-new */

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
