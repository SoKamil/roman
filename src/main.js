import Vue from 'vue'
import App from './App.vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
Vue.use(Vuetify)

import 'roboto-fontface/css/roboto/roboto-fontface.css'

import 'animate.css/animate.css'
Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')

Vue.config.devtools = true

