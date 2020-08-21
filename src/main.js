import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

// 添加事件总线对象
Vue.prototype.$bus = new Vue()

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')

// console.log('aaa')

// setTimeout(() => {
//   console.log('bbb')
// })

// console.log('ccc')

// 同步优先，异步靠边，回调垫底
// aaa -> ccc -> bbb