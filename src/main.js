import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/plugins/element.js'
// 初始化css
import './assets/css/reset.css'
// 图标css
import './assets/css/iconfont.css'

Vue.config.productionTip = false
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
