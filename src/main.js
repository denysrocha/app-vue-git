// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueResource from 'vue-resource'
import BootStrap from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'font-awesome/scss/font-awesome.scss'
import vmodal from 'vue-js-modal'
import VueTabs from 'vue-nav-tabs'
import 'vue-nav-tabs/themes/vue-tabs.css'
import VueTables from 'vue-tables-2'
import i18n from './lang/lang'
import FlagIcon from 'vue-flag-icon'

Vue.use(VueResource)
Vue.use(BootStrap)
Vue.use(vmodal, { dialog: true })
Vue.use(VueTabs)
Vue.use(VueTables.ClientTable)
Vue.use(FlagIcon)

global.router = router

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
	el: '#app',
	router,
	i18n,
	components: { App },
	template: '<App/>'
})
