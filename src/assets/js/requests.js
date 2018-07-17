import Vue from 'vue'
import VueResource from 'vue-resource'
import NProgress from 'nprogress'
import vmodal from 'vue-js-modal'
import { getHeader } from './config'
import i18n from '../../lang/lang'
Vue.use(VueResource)
Vue.use(vmodal, { dialog: true })

// Default request
// var affiliateRole = JSON.parse(sessionStorage.getItem('affiliateRole'))
const http = Vue.http
var mountedUrl

export function request (callback, method, url, component, params, obj, objId) {
	if (objId || objId != null) {
		mountedUrl = url + component + '/'
	} else {
		mountedUrl = url + component
	}
	switch (method) {
	case 'getAll':
		NProgress.start()
		http.get(mountedUrl, { headers: getHeader(), params: params }, { emulateJSON: true }).then((response) => {
			callback(response.data)
		}).catch(e => {
			showModal(i18n.t('title.error'), i18n.t('error.permission'), i18n.t('button.close'))
		}).finally(_ => {
			NProgress.done()
		})
		break
	case 'getOne':
		console.log(mountedUrl)
		NProgress.start()
		http.get(mountedUrl, { headers: getHeader(), params: params }, { emulateJSON: true }).then((response) => {
			callback(response.data)
		}).catch(e => {
			showModal(i18n.t('title.error'), i18n.t('error.permission'), i18n.t('button.close'))
		}).finally(_ => {
			NProgress.done()
		})
		break
	case 'post':
		NProgress.start()
		http.post(mountedUrl, obj, { headers: getHeader(), params: params }, { emulateJSON: true }).then((response) => {
			callback(response.status)
			showModal(i18n.t('title.success'), i18n.t('info.success'), i18n.t('button.close'))
		}).catch(e => {
			showModal(i18n.t('title.error'), i18n.t('error.permission'), i18n.t('button.close'))
		}).finally(_ => {
			NProgress.done()
		})
		break
	case 'put':
		NProgress.start()
		http.put(mountedUrl, obj, { headers: getHeader(), params: params }, { emulateJSON: true }).then((response) => {
			callback(response.status)
			showModal(i18n.t('title.success'), i18n.t('info.success'), i18n.t('button.close'))
		}).catch(e => {
			showModal(i18n.t('title.error'), i18n.t('error.permission'), i18n.t('button.close'))
		}).finally(_ => {
			NProgress.done()
		})
		break
	case 'delete':
		NProgress.start()
		http.delete(mountedUrl, { headers: getHeader(), params: params }, { emulateJSON: true }).then((response) => {
			callback(response.status)
			showModal(i18n.t('title.success'), i18n.t('info.success'), i18n.t('button.close'))
		}).catch(e => {
			showModal(i18n.t('title.error'), i18n.t('error.permission'), i18n.t('button.close'))
		}).finally(_ => {
			NProgress.done()
		})
		break
	}
}

function showModal (title, text, button) {
	Vue.prototype.$modal.show('dialog', {
		title: title,
		text: text,
		buttons: [
			/* {
				title: 'Deal with it',
				handler: () => { alert('Woot!') }
			}, */
			{
				title: button,
				default: true
			}
		]
	})
	setTimeout(() => {
		Vue.prototype.$modal.hide('dialog')
	}, 3000)
}
