import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import toast from 'components/common/toast'
import FastClick from 'fastclick'
import VueLazyload from 'vue-lazyload'

Vue.config.productionTip = false
// 事件总线
Vue.prototype.$bus = new Vue()

// 安装toast插件
Vue.use(toast)

// 解决移动端300ms延迟
FastClick.attach(document.body)

Vue.use(VueLazyload,{
  loading:require('./assets/img/common/placeholder.png')
})

new Vue({
  router,
  store,
  render: function (h) { return h(App) },
}).$mount('#app')
