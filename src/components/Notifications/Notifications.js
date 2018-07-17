import {profilePicture} from '../../assets/js/imgDefault'
import moment from 'moment'
var authUser = JSON.parse(sessionStorage.getItem('authUser'))
var affiliateRole = JSON.parse(sessionStorage.getItem('affiliateRole'))

export default {
	data () {
		return {
			show: false,
			userId: authUser.id,
			userRoles: authUser.roles,
			firstName: 'Admin',
			lastName: '',
			userImg: profilePicture,

			messages: [],
			alert: false,
			count: 0,
			visible: false,
			openNotification: false,
			openProfileArea: false,
			ws: null,

			affiliateRole: null,
			isActive: 'en'
		}
	},

	created: function () {
		// When the websocket connection start
		// this.connect()
	},

	methods: {
		hideNotification: function () {
			var self = this
			document.body.addEventListener('click', function () {
				if (self.visible && self.openNotification) {
					self.visible = false
				} else {
					self.openNotification = true
				}
			})
		},
		hideProfileArea: function () {
			var self = this
			document.body.addEventListener('click', function () {
				if (self.show && self.openProfileArea) {
					self.show = false
				} else {
					self.openProfileArea = true
				}
			})
		},
		showProfileArea: function () {
			this.show = !this.show
			this.openProfileArea = false
		},
		setAffiliateRole: function () {
			if (affiliateRole == null) {
				sessionStorage.setItem('affiliateRole', JSON.stringify(this.userRoles[0]))
				this.affiliateRole = this.userRoles[0]
			} else {
				if (this.affiliateRole == null) {
					this.affiliateRole = JSON.parse(sessionStorage.getItem('affiliateRole'))
				} else {
					sessionStorage.setItem('affiliateRole', JSON.stringify(this.affiliateRole))
					location.reload()
				}
			}
		},

		readNotification: function () {
			this.visible = !this.visible
			this.openNotification = false
			this.count = 0
			if (this.isEmpty(this.messages)) {
				this.alert = !this.alert
			} else {
				for (var i = 0; i < this.messages.length; i++) {
					if (this.messages[i].seen == false) {
						this.messages[i].seen = true
						this.seeNotification(this.messages[i].id)
					}
				}
			}
		},

		getNotifications: function () {
			this.$http.get('url', {headers: getHeader()}, {emulateJSON: true}).then((response) => {
				this.messages = response.data
			
				for (var i = 0; i < this.messages.length; i++) {
					if (this.messages[i].seen == false) {
						this.count++
					}
				}
			}).catch(e => {
				this.error = this.$i18n.t('error.permission')
			})
		},

		deleteNotification: function (id) {
			this.$http.delete('url', {headers: getHeader()}, {emulateJSON: true}).then((response) => {
				console.log(response.status)
			
				for (var i = 0; i < this.messages.length; i++) {
					if (this.messages[i].id == id) {
						this.messages.splice(i, 1)
					}
				}
				if (this.isEmpty(this.messages)) {
					this.alert = !this.alert
				}
			}).catch(e => {
				this.error = this.$i18n.t('error.permission')
			})
		},

		deleteAllNotifications: function () {
			for (var i = 0; i < this.messages.length; i++) {
				this.deleteNotification(this.messages[i].id)
			}
		},

		seeNotification: function (id) {
			this.$http.put('url', {}, {headers: getHeader()}, {emulateJSON: true}).then((response) => {
				// console.log(response.status)
			}).catch(e => {
				this.error = this.$i18n.t('error.permission')
			})
		},

		accessNotification: function (id) {
			this.$http.put('url', {}, {headers: getHeader()}, {emulateJSON: true}).then((response) => {
				console.log(response.status)
				for (var i = 0; i < this.messages.length; i++) {
					if (this.messages[i].id == id) {
						this.messages[i].accessed = true
						this.redirectRouter(this.messages[i].type)
					}
				}
			}).catch(e => {
				this.error = this.$i18n.t('error.permission')
			})
		},

		redirectRouter: function (typeOfNotification) {
			if (typeOfNotification == 'MESSAGE_RECEIVED') {
				this.$router.push('home/messages')
			}
			// implement others here ............
		},

		isEmpty: function (obj) {
			for (var prop in obj) {
				if (obj.hasOwnProperty(prop)) { return false }
			}

			return true
		},

		destroySession: function () {
			router.push({ path: '/login' })  // eslint-disable-line

			sessionStorage.authUser = null
			sessionStorage.idEvaluation = null
			sessionStorage.idRecording = null
			sessionStorage.refresh = null
			sessionStorage.affiliateRole = null

			/* var postData = {
				client_id: clientId,
				client_secret: clientSecret,
				accessToken: authUser.access_token
			}

			console.log(JSON.stringify(postData))

			this.$http.post(authenticationUrl+'revokeToken', postData, {emulateJSON: true}).then((response) => {
				router.push({ path: '/login' })
				console.log(response.status)

				sessionStorage.authUser = null
				sessionStorage.idEvaluation = null
				sessionStorage.idRecording = null

			}).catch(e => {
				this.error = "Credentials are required to access this resource!"
			}) */
		},
		getUserData: function () {
			this.$http.get('url', {headers: getHeader()}, {emulateJSON: true}).then((response) => {
				this.firstName = response.data.first_name
				this.lastName = response.data.last_name
				if (response.data.profile_picture == '' || response.data.profile_picture == null) {
					this.userImg = profilePicture
				} else {
					this.userImg = response.data.profile_picture
				}
			}).catch(e => {
				this.error = this.$i18n.t('error.permission')
			})
		},

		// Método responsável por iniciar conexão com o websocket
		connect: function (onOpen) {
			var self = this

			self.ws = new WebSocket('url' + authUser.access_token)

			self.ws.onopen = function () {
				self.addSuccessNotification('Connected')
				if (onOpen) {
					onOpen()
				}
			}

			self.ws.onerror = function () {
				self.addErrorNotification('Could not connect to server')
			}

			// Evento que será chamado quando recebido dados do servidor
			self.ws.onmessage = function (e) {
				self.addMessage(JSON.parse(e.data))
			}
		},

		// Método responsável por adicionar uma mensagem de usuário
		addMessage: function (data) {
			if (data.type != 'CONNECTED_SUCCESSFULLY') {
				this.count = 0
				this.messages.push(data)

				for (var i = 0; i < this.messages.length; i++) {
					if (this.messages[i].seen == false) {
						this.count++
					}
				}
				console.log(JSON.stringify(this.messages))
			}
		},

		// Método responsável por adicionar uma notificação de sucesso
		addSuccessNotification: function (text) {
			// this.addMessage({color: 'green', text: text});
			console.log(text)
		},

		// Método responsável por adicionar uma notificação de erro
		addErrorNotification: function (text) {
			this.addMessage({color: 'red', text: text})
		},

		switchLocale (loc) {
			console.log(loc)
			this.$i18n.locale = loc
			this.isActive = loc
		}
	},

	// function will execute at pageload
	mounted: function () {
		// ***************** Uninitialized methods because there is no service, but they work
		/*this.getUserData()
		this.getNotifications()
		this.setAffiliateRole()
		this.hideNotification()
		this.hideProfileArea()*/
	},

	filters: {
		moment: function (date) {
			return moment(date).format('MMMM Do YYYY, h:mm:ss a')
		}
	}
}
