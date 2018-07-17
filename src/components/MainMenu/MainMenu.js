import {comparePermission} from '../../assets/js/comparePermission'
import { ROLES } from '../../assets/js/validation'

var authUser = JSON.parse(sessionStorage.getItem('authUser'))

export default {
	data () {
		return {
			userData: {},
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

			simpleMenu: []
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

		closeMenuMobile: function () {
			this.$emit('closeMenu')
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

		renderMenuLi: function (componentRoles) {
			if (comparePermission(this.userRoles, componentRoles)) {
				return true
			}
		}
	},
	// function will execute at pageload
	mounted: function () {
		this.mountMenu()
	}
}
