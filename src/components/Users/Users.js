import 'setimmediate'
import CSVParse from 'csv-parse'
// import {plataformUrl, getHeader} from '../../assets/js/config'
import {request} from '../../assets/js/requests'
import i18n from '../../lang/lang'

// ********** this compoment contains the real call to methods, but don't work, for only demonstration

export default {
	data: function () {
		return {
			// get data for post
			roles: [],
			affiliates: [],
			list: [],
			children: {
				id: null
			},

			// data for post
			user: {
				profile: {
					first_name: '',
					last_name: '',
					gender: '',
					email: '',
					username: '',
					password: '123',
					profile_picture: '',
					background_picture: ''
				},
				affiliates: [],
				children_ids: []
			},
			generateUsernameAutomatically: true,

			affiliate: {
				affiliate_id: null,
				affiliate_name: '',
				role_id: ''
			},

			children_list: [],
			selected_children_list: [],

			// data for add in affiliate instance and affiliates array
			affiliate_item: null,
			role_id: '',

			// data for table
			users: [],
			profiles: [],

			// data for put
			selected_user: {
				affiliates: [],
				children_ids: []
			},
			selected_profile: {
				first_name: '',
				last_name: '',
				gender: '',
				email: '',
				password: '123',
				profile_picture: '',
				background_picture: ''
			},

			plataformUrl: '', // plataformUrl,
			search: '',
			error: '',
			active: true,
			errorObject: null,
			batchMessages: {
				success: [],
				failure: []
			},

			csv: null,

			columns: ['id', 'first_name', 'last_name', 'gender', 'email', 'edit', 'delete'],
			data: [
				{
					id: 1,
					first_name: 'John',
					last_name: 'Doe',
					gender: 'Male',
					email: 'johndoe@gmail.com'
				},
				{
					id: 2,
					first_name: 'Mary',
					last_name: 'Cloe',
					gender: 'Female',
					email: 'marycloe@gmail.com'
				},
				{
					id: 3,
					first_name: 'Joseph',
					last_name: 'Meclin',
					gender: 'Male',
					email: 'josephmeclin@hotmail.com'
				}
			],

			students: [],

			previewList: {},
			batchData: {
				user_profiles: [],
				role: '',
				affiliate_id: '' // affiliateRole.affiliate_id
			}
		}
	},
	computed: {
		options: function () {
			return {
				sortIcon: { base: 'fa', up: 'fa-chevron-up', down: 'fa-chevron-down', is: 'fa-sort' },
				headings: {
					id: 'Id',
					first_name: this.getKey('attribute.fname'),
					last_name: this.getKey('attribute.lname'),
					gender: this.getKey('attribute.gender'),
					email: this.getKey('attribute.email'),
					edit: this.getKey('button.edit'),
					delete: this.getKey('button.delete')
				},
				sortable: ['id', 'first_name', 'last_name', 'gender', 'email'],
				filterable: ['id', 'first_name', 'last_name', 'gender', 'email'],
				filterByColumn: true
			}
		}
	},
	methods: {

		getKey: function (key) {
			return i18n.t(key)
		},

		addNewAffiliate: function () {
			if (this.role_id == '') {
				this.affiliateModal('selectRole')
				return
			}

			this.user.affiliates.push({
				affiliate_id: '', // affiliateRole.affiliate_id,
				affiliate_name: '', // affiliateRole.affiliate_name,
				role_id: this.role_id
			})

			if (this.role_id == 'PARENT') {
				this.user.children_ids.push(this.children.id)
			}

			this.listAffiliateRole(/* affiliateRole.affiliate_name, this.role_id, this.children.name */)

			this.role_id = ''
			this.children = {
				id: null
			}
		},

		listAffiliateRole: function (affiliate, role, children) {
			this.list.push({
				affiliate: affiliate,
				role: role
			})
			this.selected_user.affiliates.push({
				affiliate_id: '', // affiliateRole.affiliate_id,
				affiliate_name: '', // affiliateRole.affiliate_name,
				role_id: role
			})
		},

		updateAffiliates: function () {
			if (this.role_id == '') {
				this.showModal('selectRole')
				return
			}

			this.listAffiliateRole(/* affiliateRole.affiliate_name, this.role_id, this.children.name */)

			this.role_id = ''
			this.children = {
				id: null
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
				vm.profile_picture = e.target.result
			}
			reader.readAsDataURL(file)
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
				vm.background_picture = e.target.result
			}
			reader.readAsDataURL(file)
		},

		getManageableRoles: function () {
			request((result) => {
				this.roles = result
			}, 'getAll', /* plataformUrl, */ 'manageable-roles')
		},

		getUsers: function () {
			request((result) => {
				this.users = result
				this.getProfiles()
			}, 'getAll', /* plataformUrl, */ 'users')
		},

		getStudents: function () {
			request((result) => {
				this.students = []
				var students = result
				for (var i = 0; i < students.length; i++) {
					for (var j = 0; j < students[i].affiliates.length; j++) {
						// if (students[i].affiliates[j].role_id == 'STUDENT' && students[i].affiliates[j].affiliate_id == affiliateRole.affiliate_id) {
						// 	this.students.push(students[i])
						// }
					}
				}
			}, 'getAll', /* plataformUrl, */ 'users', 'role=STUDENT')
		},

		getUser: function (id) {
			request((result) => {
				this.selected_user = result
				this.getChildren()
			}, 'getOne', /* plataformUrl, */ 'users', null, null, id)
		},

		getChildren: function () {
			if (this.selected_user.children_ids == null || this.selected_user.children_ids.length == 0) {
				this.children_list = []
				return
			}
			var ids = ''
			for (var i = 0; i < this.selected_user.children_ids.length; i++) {
				ids += '&ids=' + this.selected_user.children_ids[i]
			}
			request((result) => {
				this.selected_children_list = result
			}, 'getAll', /* plataformUrl, */ 'users', ids)
		},

		getProfiles: function () {
			var userIds = ''
			for (var i = 0; i < this.users.length; i++) {
				userIds += '&userIds=' + this.users[i].id
			}
			request((result) => {
				this.data = result
			}, 'getAll', /* plataformUrl, */ 'profiles', userIds)
		},

		getProfile: function (id) {
			request((result) => {
				this.selected_profile = result
			}, 'getAll', /* plataformUrl, */ 'user/' + id + '/profile')
		},

		getAffiliates: function () {
			request((result) => {
				this.affiliates = result
			}, 'getAll', /* plataformUrl, */ 'affiliates')
		},

		isParent: function () {
			if (this.user.affiliates != undefined) {
				for (var i = 0; i < this.user.affiliates.length; i++) {
					var aff = this.user.affiliates[i]
					if (aff.role_id == 'PARENT') {
						return true
					}
				}
			}
			return false
		},

		isParentEdit: function () {
			if (this.selected_user.affiliates != undefined) {
				for (var i = 0; i < this.selected_user.affiliates.length; i++) {
					var aff = this.selected_user.affiliates[i]
					if (aff.role_id == 'PARENT') {
						return true
					}
				}
			}
			return false
		},

		addChild: function () {
			this.children_list.push(this.children)
			this.children = {}
		},

		addChildEdit: function () {
			this.selected_children_list.push(this.children)
			this.children = {}
		},

		postUser: function (ev) {
			ev.preventDefault()

			if (this.user.profile.first_name == '' ||
				this.user.profile.last_name == '' ||
				this.user.profile.gender == '' ||
				this.user.profile.email == '' ||
				this.user.affiliates == [] ||
				(!this.generateUsernameAutomatically &&
					(this.user.profile.username == '' || this.user.profile.username == undefined))) {
				this.showModal('alert')
				return
			}

			for (var i = 0; i < this.user.affiliates.length; i++) {
				delete this.user.affiliates[i].affiliate_name
			}

			this.user.children_ids = []
			for (var i = 0; i < this.children_list.length; i++) {
				var child = this.children_list[i]
				this.user.children_ids.push(child.id)
			}

			if (this.generateUsernameAutomatically) {
				delete this.user.profile.username
			}

			request((result) => {
				this.user = {
					profile: {
						first_name: '',
						last_name: '',
						gender: '',
						email: '',
						password: '123',
						profile_picture: '',
						background_picture: ''
					},
					affiliates: []
				}
				this.list = []
				this.getUsers()
			}, 'post', /* plataformUrl, */ 'users', null, this.user)
		},

		save: function () {
			this.putProfile().then(function () {
				return this.putUser()
			}).then(function () {
				this.hideModal('edit')
				return this.getUsers()
			})
		},

		putUser: function () {
			var userToPut = Object.assign({}, this.selected_user)
			for (var i = 0; i < userToPut.affiliates.length; i++) {
				delete userToPut.affiliates[i].affiliate_name
			}

			userToPut.children_ids = []
			for (var i = 0; i < this.selected_children_list.length; i++) {
				userToPut.children_ids.push(this.selected_children_list[i].id)
			}
			request((result) => {
			}, 'put', /* plataformUrl, */ 'users', null, userToPut, this.selected_user.id)
		},

		putProfile: function () {
			return this.$http.put(/* plataformUrl + */ 'profiles/' + this.selected_profile.id + '?affiliateId=' + /* affiliateRole.affiliate_id + */ '&roleId=' /* + affiliateRole.role_id */, this.selected_profile, {headers: /* getHeader() */ ''}, {emulateJSON: true})
		},

		deleteUser: function (userId) {
			request((result) => {
				this.hideModal('delete')
				this.getUsers()
			}, 'delete', /* plataformUrl, */ 'users', null, null, userId)
		},

		csvFromInput: function () {
			var inputFile = document.getElementById('inputFile')
			var reader = new FileReader()

			var self = this // eslint-disable-line

			reader.onload = function (event) {
				self.csvToJSON(this.result)
			}

			reader.readAsText(inputFile.files[0])
		},

		csvToJSON: function (csv) {
			this.clearAllBatchSuccessMessages()
			this.clearAllBatchFailureMessages()

			CSVParse(csv, {columns: true}, (error, output) => {
				if (error != null) {
					this.batchMessages.failure.push('Invalid CSV')
					return
				}
				this.batchData.user_profiles = output
			})
		},

		validationBatchData: function () {
			if (this.batchData.role === '' || this.batchData.user_profiles.length === 0) {
				this.showModal('alert')
				return false
			} else {
				return true
			}
		},

		postAddUserList: function () {
			if (!this.validationBatchData()) {
				return
			}
			JSON.stringify(this.batchData)
			this.batchMessages.success = []
			this.batchMessages.failure = []

			request((result) => {
				this.getUsers()
				this.batchData = {
					user_profiles: [],
					role: '',
					affiliate_id: '' /* affiliateRole.affiliate_id */
				}
				document.getElementById('inputFile').value = ''
				var body = result
				if (body.success != undefined) {
					for (var i = 0; i < body.success.length; i++) {
						var profile = body.success[i]
						this.batchMessages.success.push(profile.first_name + ' ' + profile.last_name + ' registered successfully.')
					}
				}
				if (body.failure != undefined) {
					for (var i = 0; i < body.failure.length; i++) {
						var entry = body.failure[i]
						var profile = entry.profile
						var detail = entry.detail
						this.batchMessages.failure.push('The user ' + profile.first_name + ' ' + profile.last_name + ' was not registered. <br>' + detail)
					}
				}
			}, 'post', /* plataformUrl, */ 'users-list', null, this.batchData)
		},

		deleteBatchSuccessMessage: function (index) {
			this.batchMessages.success.splice(index, 1)
		},

		deleteBatchFailureMessage: function (index) {
			this.batchMessages.failure.splice(index, 1)
		},

		clearAllBatchSuccessMessages: function () {
			this.batchMessages.success = []
		},

		clearAllBatchFailureMessages: function () {
			this.batchMessages.failure = []
		},

		successModal (component) {
			this.$modal.show(component)
			setTimeout(() => {
				this.hideModal(component)
			}, 3000)
		},

		affiliateModal (component) {
			this.$modal.show(component)
		},

		showModal (component, userId) {
			this.$modal.show(component)
			if (userId != null) {
				this.selected_user = userId
				this.getUser(userId)
				this.getProfile(userId)
			}
		},

		hideModal (component) {
			this.$modal.hide(component)
		},

		errorModal () {
			this.$modal.show('server_error_message')
			setTimeout(() => {
				this.hideModal('server_error_message')
			}, 3000)
		},

		getMessageFromError (error) {
			if (error.status == 400 && error.body.message != 'Unable to process JSON') {
				return error.body.message
			} else {
				return 'An error occurred, please try again later.'
			}
		}
	},

	// function will execute at pageload
	mounted: function () {
		// this.getUsers()
		// this.getAffiliates()
		// this.getManageableRoles()
		// this.getStudents()
	}
}
