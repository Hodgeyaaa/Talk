import Vue from 'vue'
import App from './App'
import store from './store'
import {myRequest} from './utils/request_api.js';

Vue.prototype.$myRequest = myRequest;
Vue.prototype.$store = store;
Vue.config.productionTip = false
Vue.prototype.$bus = new Vue()
// Vue.filter('formatDate', (date) => {
// 	return date.getDay()
// })

App.mpType = 'app'

const app = new Vue({
    ...App,
	// store,
})
app.$mount()
