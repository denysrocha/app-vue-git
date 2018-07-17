import {getHeader} from '../../assets/js/config'
import {profilePicture, backgroundPicture} from '../../assets/js/imgDefault'
import MainMenu from '../MainMenu/MainMenu.vue'
// Script to compare if the user has permissions to see this component
import {comparePermission} from '../../assets/js/comparePermission'
import { ROLES } from '../../assets/js/validation'

import myUpload from 'vue-image-crop-upload'

var authUser = JSON.parse(sessionStorage.getItem('authUser'))

export default {
	data () {
		return {
			userData: {
				profile_picture: '',
				background_picture: '',
				first_name: 'Admin'
			},
			userId: authUser.id,
			userRoles: authUser.roles,
			newProfilePicture: '',
			newProfileBackground: '',
			ComponentsRoles: ROLES,

			flag: false,

			menu: [
				{
					item: 'menu.pedagogical',
					subitems: [],
					active: true
				},
				{
					item: 'menu.management',
					subitems: [],
					active: true
				},
				{
					item: 'menu.monitoring',
					subitems: [],
					active: true
				}
			],

			simpleMenu: [],

			show: false,
			params: {
				token: '123456798',
				name: 'avatar'
			},
			headers: {
				smail: '*_~'
			},
			en: {
				hint: 'Click or drag the file here to upload',
				loading: 'Uploading…',
				noSupported: 'Browser is not supported, please use IE10+ or other browsers',
				success: 'Upload success',
				fail: 'Upload failed',
				preview: 'Preview',
				btn: {
					off: 'Cancel',
					close: 'Close',
					back: 'Back',
					save: 'Save'
				},
				error: {
					onlyImg: 'Image only',
					outOfSize: 'Image exceeds size limit: ',
					lowestPx: 'Image\'s size is too low. Expected at least: '
				}
			},
			imgDataUrl: '' // the datebase64 url of created image
		}
	},

	methods: {

		mountMenu: function () {
			// mounting the main menu with subitems
			for (var i = 0; i < this.ComponentsRoles.length; i++) {
				for (var j = 0; j < this.menu.length; j++) {
					if (this.ComponentsRoles[i].father == this.menu[j].item && this.renderMenuLi(this.ComponentsRoles[i].roles)) {
						this.ComponentsRoles[i].active = false
						this.menu[j].subitems.push(this.ComponentsRoles[i])
					}
				}
			}

			// removing the items without submenus
			for (var i = 0; i < this.menu.length; i++) {
				if (this.menu[i].subitems.length == 0) {
					this.menu.splice(i, 1)
				}
			}

			for (var i = 0; i < this.menu.length; i++) {
				if (this.menu[i].subitems.length == 0) {
					this.menu.splice(i, 1)
				}
			}

			// if we have only one menu item, show its subitems
			var count = 0
			this.menu.forEach(function (entry) {
				if (entry.active) {
					count++
				}
			})

			if (count == 1) {
				for (var i = 0; i < this.menu[0].subitems.length; i++) {
					var item = this.menu[0].subitems[i]
					item.active = true
					this.simpleMenu.push(item)
				}
				this.menu.forEach(function (entry) {
					entry.active = false
				})
			}
		},

		activeMenu: function (item) {
			this.flag = !this.flag

			if (this.flag) {
				this.menu.forEach(function (entry) {
					if (entry == item) {
						entry.subitems.forEach(function (entry2) {
							entry2.active = true
						})
					} else {
						entry.active = false
					}
				})
			} else {
				this.backMenu()
			}
		},

		backMenu: function () {
			if (this.menu.length > 1) {
				this.menu.forEach(function (entry) {
					entry.active = true
					entry.subitems.forEach(function (entry2) {
						entry2.active = false
					})
				})
			}
		},

		backToHome: function () {
			this.backMenu()
			this.flag = false
		},

		renderMenuLi: function (componentRules) {
			if (comparePermission(this.userRoles, componentRules)) {
				return true
			}
		},

		getUserData: function () {
			// this.$http.get('url', {headers: getHeader()}, {emulateJSON: true}).then((response) => {
			// 	this.userData = response.data
			// 	if (this.userData.profile_picture == '' || this.userData.profile_picture == null) {
			// 		this.userData.profile_picture = profilePicture
			// 	}
			// 	if (this.userData.background_picture == '' || this.userData.background_picture == null) {
			// 		this.userData.background_picture = backgroundPicture
			// 	}
			// }).catch(e => {
			// 	this.error = this.$i18n.t('error.permission')
			// })

			if (this.userData.profile_picture == '' || this.userData.profile_picture == null) {
				this.userData.profile_picture = profilePicture
			}
			if (this.userData.background_picture == '' || this.userData.background_picture == null) {
				this.userData.background_picture = backgroundPicture
			}
		},

		onFileChangeProfile (e) {
			var files = e.target.files || e.dataTransfer.files
			if (!files.length) { return }
			this.createImageProfile(files[0])
		},
		createImageProfile (file) {
			var image = new Image() // eslint-disable-line
			var reader = new FileReader()
			var vm = this

			reader.onload = (e) => {
				vm.newProfilePicture = e.target.result
				this.newProfilePicture = vm.newProfilePicture
				this.putProfilePicture()
			}
			reader.readAsDataURL(file)
		},

		putProfilePicture: function () {
			var putData = {
				'id': this.userData.id,
				'email': this.userData.email,
				'password': this.userData.password,
				'username': this.userData.username,
				'phone': this.userData.phone,
				'theme': this.userData.theme,
				'city': this.userData.city,
				'state': this.userData.state,
				'country': this.userData.country,
				'zipcode': this.userData.zipcode,
				'rg': this.userData.rg,
				'cpf': this.userData.cpf,
				'gender': this.userData.gender,
				'user_id': this.userData.user_id,
				'first_name': this.userData.first_name,
				'last_name': this.userData.last_name,
				'profile_picture': this.imgDataUrl, // change here
				'background_picture': this.userData.background_picture,
				'address_line_1': this.userData.address_line_1,
				'address_line_2': this.userData.address_line_2,
				'birth_date': this.userData.birth_date
			}

			this.$http.put('url', putData, {headers: getHeader()}, {emulateJSON: true}).then((response) => {
				this.getUserData()
			}).catch(e => {
				this.error = this.$i18n.t('error.permission')
			})
		},

		onFileChangeBackground (e) {
			var files = e.target.files || e.dataTransfer.files
			if (!files.length) { return }
			this.createImageBackground(files[0])
		},
		createImageBackground (file) {
			var image = new Image() // eslint-disable-line
			var reader = new FileReader()
			var vm = this

			reader.onload = (e) => {
				vm.newProfileBackground = e.target.result
				this.newProfileBackground = vm.newProfileBackground
				this.putProfileBackground()
			}
			reader.readAsDataURL(file)
		},

		putProfileBackground: function () {
			var putData = {
				'id': this.userData.id,
				'email': this.userData.email,
				'password': this.userData.password,
				'username': this.userData.username,
				'phone': this.userData.phone,
				'theme': this.userData.theme,
				'city': this.userData.city,
				'state': this.userData.state,
				'country': this.userData.country,
				'zipcode': this.userData.zipcode,
				'rg': this.userData.rg,
				'cpf': this.userData.cpf,
				'gender': this.userData.gender,
				'user_id': this.userData.user_id,
				'first_name': this.userData.first_name,
				'last_name': this.userData.last_name,
				'profile_picture': this.userData.profile_picture,
				'background_picture': this.newProfileBackground, // change here
				'address_line_1': this.userData.address_line_1,
				'address_line_2': this.userData.address_line_2,
				'birth_date': this.userData.birth_date
			}
			console.log(putData)
			this.$http.put('url', putData, {headers: getHeader()}, {emulateJSON: true}).then((response) => {
				this.getUserData()
			}).catch(e => {
				this.error = this.$i18n.t('error.permission')
			})
		},

		toggleShow () {
			this.show = !this.show
		},

		cropSuccess (imgDataUrl, field) {
			console.log('-------- crop success --------')
			this.imgDataUrl = imgDataUrl
			this.putProfilePicture()
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

	components: {
		MainMenu,
		'my-upload': myUpload
	},

	// function will execute at pageload
	mounted: function () {
		this.getUserData()
		// this.consoleMenu()
		this.mountMenu()
	}
}
