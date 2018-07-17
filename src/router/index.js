import Vue from 'vue'
import Router from 'vue-router'
import NProgress from 'nprogress'
import '../../src/assets/css/nprogress.css'
// import NProgress from 'nprogress'
import Index from '@/components/Index/Index.vue'
import Login from '@/components/Login/Login.vue'

const Dashboard = () => import('@/components/Dashboard/Dashboard.vue')
const Home = () => import('@/components/Home/Home.vue')
const Users = () => import('@/components/Users/Users.vue')
const Profile = () => import('@/components/Profile/Profile.vue')
const ErrorMessage = () => import('@/components/ErrorMessage/ErrorMessage.vue')

Vue.use(Router)
// Vue.use(NProgress)

const routes = [
	{ path: '/',
		component: Index,
		children: [
			{ path: '/login', component: Login },
			{ path: '/home',
				component: Home,
				children: [
					{ name: 'Dashboard', path: '/home/dashboard', component: Dashboard },
					{ name: 'Users', path: '/home/users', component: Users },
					{ name: 'Profile', path: '/home/profile', component: Profile },
					{ name: 'ErrorMessage', path: '/home/error-message', component: ErrorMessage }
				]
			}
		]
	}
]

/* export default new Router({
	mode: 'history',
	routes
}) */

function blurBackground (display) {
	switch (display) {
	case 'block':
		display = 'block'
		break
	case 'none':
		display = 'none'
		break
	default:
		display = 'none'
	}
	if (document.getElementById('loading-bg')) {
		document.getElementById('loading-bg').style.display = display
	}
}

const router = new Router({
	mode: 'history',
	routes
})

router.beforeEach((to, from, next) => {
	NProgress.start()
	NProgress.set(0.1)
	blurBackground('block')
	next()
})

router.afterEach((to, from) => {
	setTimeout(() => NProgress.done(), blurBackground('none'), 500)
})

export default router
