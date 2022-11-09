/**
 * 公共引入,勿随意修改,修改时需经过确认
 */
// 加载组件
import Vue from 'vue'
// 自动注册组件
import './components'
// 加载element-ui
import './element'
// 封装错误提示
import '@/utils/errorLog'
// 加载svg图标
import './svg'
// 加载样式
import '@/assets/style/element-variables.scss'
import '@/assets/style/index.css'
import '@/assets/style/main.scss'
import '@/assets/style/transition.scss'
import '@/assets/style/reset.css'
// 扩展插件
import extend from '@/utils/extend'

Vue.use(extend)
