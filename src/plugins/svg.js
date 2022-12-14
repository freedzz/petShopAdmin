import Vue from 'vue'
import SvgIcon from '@/components/SvgIcon' // svg组件
// register globally
Vue.component('svg-icon', SvgIcon)
const req = require.context('.././assets/icons/svg', false, /\.svg$/)
const requireAll = (requireContext) => {
  return requireContext.keys().map(requireContext)
}
requireAll(req)
