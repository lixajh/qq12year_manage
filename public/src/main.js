import Vue from 'vue'
import App from './App.vue'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import { createRouter } from './router'
import { createStore } from './store'

const router = createRouter()
const store = createStore()

// sync(store, router)
Vue.use(Element)

const app = new Vue({
  store,
  router,
  render: h => h(App)
})

app.$mount('#app')