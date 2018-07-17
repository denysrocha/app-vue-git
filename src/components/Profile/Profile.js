import {getHeader} from '../../assets/js/config'
import moment from 'moment'
var affiliateRole = JSON.parse(sessionStorage.getItem('affiliateRole'))

export default {
	data: function () {
		return {
			success: false,
			profile: {},
			profileCountryName: null,
			profileStateName: null,
			profileCityName: null,
			address: {},
			continents: [],
			continentSelected: null,
			countries: [],
			countrySelected: null,
			states: [],
			stateSelected: null,
			cities: [],
			inputActive: false,
			textActive: true,
			btnEdit: true,
			btnCancel: false,
			btnSave: false,
			search: '',

			notifications: false,
			affiliates: [],
			affiliateToGetNotification: null,
			notification_configuration: []
		}
	},

	methods: {

		getProfile: function () {
			this.$http.get('url', {headers: getHeader()}, {emulateJSON: true}).then((response) => {
				this.profile = response.data
			}).catch(e => {
				this.error = this.$i18n.t('error.permission')
			})
		},

		getZipCode: function (zipcode) {
			this.$http.get('https://viacep.com.br/ws/' + zipcode + '/json/').then((response) => {
				this.address = response.data
				this.profile.zipcode = response.data.cep
				this.profile.city = response.data.localidade
				// this.profile.state = response.data.uf
				this.profile.address_line_1 = response.data.logradouro
				this.profile.address_line_2 = response.data.complemento
				console.log(response.data)
			}).catch(e => {
				this.error = this.$i18n.t('error.permission')
			})
		},

		getContinents: function () {
			this.$http.get('http://www.geonames.org/childrenJSON?geonameId=6295630').then((response) => {
				this.continents = response.data.geonames
				for (var i = 0; i < this.continents.length; i++) {
					this.getCountries(this.continents[i].geonameId)
				}
			}).catch(e => {
				this.error = this.$i18n.t('error.permission')
			})
		},

		getCountries: function (idContinent) {
			this.$http.get('http://www.geonames.org/childrenJSON?geonameId=' + idContinent).then((response) => {
				for (var j = 0; j < response.data.geonames.length; j++) {
					this.countries.push(response.data.geonames[j])
				}
			}).catch(e => {
				this.error = this.$i18n.t('error.permission')
			})
		},

		getStates: function () {
			for (var i = 0; i < this.countries.length; i++) {
				if (this.countries[i].name == this.profileCountryName) {
					this.countrySelected = this.countries[i].geonameId
				}
				// console.log(this.countries[i].name)
			}
			console.log(this.countrySelected)

			this.$http.get('http://www.geonames.org/childrenJSON?geonameId=' + this.countrySelected).then((response) => {
				this.states = response.data.geonames
			}).catch(e => {
				this.error = this.$i18n.t('error.permission')
			})
		},

		getCities: function () {
			for (var i = 0; i < this.states.length; i++) {
				if (this.states[i].name == this.profileStateName) {
					this.stateSelected = this.states[i].geonameId
				}
				// console.log(this.countries[i].name)
			}
			console.log(this.stateSelected)

			this.$http.get('http://www.geonames.org/childrenJSON?geonameId=' + this.stateSelected).then((response) => {
				this.cities = response.data.geonames
			}).catch(e => {
				this.error = this.$i18n.t('error.permission')
			})
		},

		getNotificationConfiguration: function () {
			this.notification_configuration = null
			if (affiliateRole.affiliate_id) {
				this.$http.get('url', {headers: getHeader()}, {emulateJSON: true}).then((response) => {
					this.notification_configuration = response.data
				}).catch(e => {
					this.error = this.$i18n.t('error.permission')
				})
			}
		},

		putNotificationConfiguration: function () {
			console.log(JSON.stringify(this.affiliateToGetNotification))
			console.log(JSON.stringify(this.notification_configuration))
			this.$http.put('url', this.notification_configuration, {headers: getHeader()}, {emulateJSON: true}).then(response => {
				this.affiliateToGetNotification = null
				this.notification_configuration = []
				this.sucessModal('success')
			}).catch(e => {
				this.error = this.$i18n.t('error.permission')
			})
		},

		editInput: function () {
			this.inputActive = true
			this.textActive = false
			this.btnEdit = false
			this.btnCancel = true
			this.btnSave = true
			this.notifications = true
		},

		cancel: function () {
			this.inputActive = false
			this.textActive = true
			this.btnCancel = false
			this.btnSave = false
			this.btnEdit = true
			this.notifications = false
		},

		save: function () {
			this.putProfile()
			this.inputActive = false
			this.textActive = true
			this.btnCancel = false
			this.btnSave = false
			this.btnEdit = true
			this.notifications = false
		},

		putProfile: function () {
			var putData = {
				id: this.profile.id,
				email: this.profile.email,
				password: this.profile.password,
				username: this.profile.username,
				phone: this.profile.phone,
				theme: this.profile.theme,
				city: this.profileCityName,
				state: this.profileStateName,
				country: this.profileCountryName,
				zipcode: this.profile.zipcode,
				rg: this.profile.rg,
				cpf: this.profile.cpf,
				gender: this.profile.gender,
				first_name: this.profile.first_name,
				last_name: this.profile.last_name,
				profile_picture: this.profile.profile_picture,
				background_picture: this.profile.background_picture,
				address_line_1: this.profile.address_line_1,
				address_line_2: this.profile.address_line_2,
				birth_date: this.profile.birth_date,
				user_id: this.profile.user_id
			}

			// console.log(JSON.stringify(putData))

			this.$http.put('url', putData, {headers: getHeader()}, {emulateJSON: true}).then((response) => {
				this.getProfile()
			}).catch(e => {
				this.error = this.$i18n.t('error.permission')
			})
		},

		changeColor: function () {
			this.profile.theme = document.getElementById('theme').value
			document.getElementById('theme-label').value = this.profile.theme
			console.log(this.profile.theme)
		},

		showModal (component) {
			this.$modal.show(component)
		},

		hideModal (component) {
			this.$modal.hide(component)
		},

		toggleShow () {
			this.show = !this.show
		},

		cropSuccess (imgDataUrl, field) {
			console.log('-------- crop success --------')
			this.imgDataUrl = imgDataUrl
		},

		cropUploadSuccess (jsonData, field) {
			console.log('-------- upload success --------')
			console.log(jsonData)
			console.log('field: ' + field)
		},

		cropUploadFail (status, field) {
			console.log('-------- upload fail --------')
			console.log(status)
			console.log('field: ' + field)
		}
	},

	// function will execute at pageload
	mounted: function () {
		// this.getProfile()
		this.getContinents()
		// this.getAffiliates()
	},

	filters: {
		moment: function (date) {
			return moment(date).format('MMMM Do YYYY, h:mm:ss a')
		}
	}
}
