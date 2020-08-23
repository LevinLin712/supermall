import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// index.js中导出的是default obj，所以自处可以自定义名称
import toast from 'components/common/toast/index.js'

Vue.config.productionTip = false

// 添加事件总线对象
Vue.prototype.$bus = new Vue()
// 安装toast插件
// use会默认执行对象toast的install函数
Vue.use(toast)

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