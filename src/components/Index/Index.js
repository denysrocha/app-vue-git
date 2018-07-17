export default {
	data () {
		return {
			authUser: JSON.parse(sessionStorage.getItem('authUser'))
		}
	},
	methods: {
		redirect: function () {
			if (this.authUser == null) {
				router.push({ path: '/login' }) // eslint-disable-line
			} else {
				router.go(1) // eslint-disable-line
			}
		}
	},

	mounted: function () {
		this.redirect()
	}
}
