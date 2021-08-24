import Vue from 'vue'
import upperFirst from 'lodash/upperFirst'
import camelCase from 'lodash/camelCase'

const requireComponent = require.context('@/components', true, /\.vue$/)

requireComponent.keys().forEach(fileName => {
  const componentConfig = requireComponent(fileName)
  console.log('fileName', fileName)
  const componentName = upperFirst(camelCase(fileName.replace(/^\.\//, '').replace(/\.\w+$/, '')))
  console.log('camelCase', camelCase(fileName.replace(/^\.\//, '').replace(/\.\w+$/, '')))
  console.log('upperFirst', upperFirst(camelCase(fileName.replace(/^\.\//, '').replace(/\.\w+$/, ''))))
  Vue.component(componentName, componentConfig.default || componentConfig)
})