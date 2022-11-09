/**
 * @description 公共布局及样式自动引入
 */
import Vue from 'vue'

// 获取到components文件夹下的所有文件
const requireComponents = require.context('../components', true, /\.vue$/)
// 编辑文件获取每个组件的名字和config
requireComponents.keys().forEach((fileName) => {
  const componentConfig = requireComponents(fileName)
  const componentName = componentConfig.default.name
  // 注册每个组件
  Vue.component(componentName, componentConfig.default || componentConfig)
})
