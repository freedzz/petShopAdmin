import Vue from 'vue'
import Axios from 'axios'
// import VueAxios from 'vue-axios'

import App from './App'
import router from './router'
import store from './store'
import api from './config/api'
// 插件和工具引入
import './plugins'
// vue-quill-edit
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

Vue.use(Axios)

// add设置调试模式
Vue.config.devtools = true
// Vue.config.devtools = __ENV__.NODE_ENV !== 'production';

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token') || ''

  // 配置接口信息
  // Axios.defaults.baseURL = 'http://www.地址.com:8360/admin/';
  Axios.defaults.baseURL = api.rootUrl
  Axios.defaults.headers.common['X-Hioshop-Token'] = token

  if (!token && to.name !== 'login') {
    next({
      path: '/login',
      query: { redirect: to.fullPath }
    })
  } else {
    next()
  }
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
