import {loginUrl} from '../../assets/js/config'
import {clientId, clientSecret} from '../../assets/js/env'

export default{
	data () {
		return {
			login: {
				username: '',
				password: '',
				authUser: JSON.parse(sessionStorage.getItem('authUser'))
			}
		}
	},

	methods: {
		LoginFormSubmit: function () {
			const postData = {
				'username': this.login.username,
				'password': this.login.password,
				'grant_type': 'password',
				'client_id': clientId,
				'client_secret': clientSecret
			}

			const authUser = {}
			authUser.id = null
			authUser.access_token = ''
			authUser.roles = []

			// this.$http.post(loginUrl, postData, {emulateJSON: true}).then(response => {
			// 	console.log(response.status)
			// 	if (response.status === 200) {
			//   ********** other verifications
			// 		router.push({ path: '/home/dashboard' }) // eslint-disable-line
			// 	}
			// }).catch(e => {
			// 	alert('User or password incorrect!')
			// })

			// alternative redirect
			if (this.login.username == 'admin' && this.login.password == 'admin') {
				authUser.id = 1
				authUser.roles.push('ADMIN')
				sessionStorage.setItem('authUser', JSON.stringify(authUser))
				router.push({ path: '/home/dashboard' }) // eslint-disable-line
			}
		}
	}
}
