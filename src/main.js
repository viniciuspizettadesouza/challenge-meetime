import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'
import Vuelidate from 'vuelidate'

Vue.config.productionTip = false

new Vue({
  router,
  vuetify,
  Vuelidate,
  render: h => h(App)
}).$mount('#app')
