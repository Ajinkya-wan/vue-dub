import Vue from 'vue'
import app from '../src/App'
import vuetify from './plugins/vuetify'
import router from './Router'

Vue.config.productionTip = false

new Vue({
  vuetify,
  router,
  render: h => h(app)
}).$mount('#app')
