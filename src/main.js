import Vue from 'vue'
import App from './App'
import router from './router'
import api from './api/api'
import validate from './common/js/validate'
import store from './store'
import '@/common/stylus/common.styl'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import MintUI from 'mint-ui'
import VueTouch from 'vue-touch'
import 'mint-ui/lib/style.css'
import 'swiper/dist/css/swiper.css'
/* eslint-disable no-unused-vars */

Vue.use(MintUI)
Vue.use(api)
Vue.use(validate)
Vue.use(VueTouch, { name: 'v-touch' })
Vue.use(VueAwesomeSwiper)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>'
})