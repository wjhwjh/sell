// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'common/styles/index.styl'

import Axios from 'axios'
Axios.defaults.baseURL = '/api' // 设置基本的访问数据接口
Vue.prototype.$Axios = Axios

Vue.config.productionTip = false

// console.log('---', this.$Axios)

/* eslint-disable */ // 这个注释可以忽略eslint代码检查
new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>'
})