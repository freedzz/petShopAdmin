import Vue from 'vue'
import Axios from 'axios'

import App from './App'
import router from './router'
import store from './store'

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

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
