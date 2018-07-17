
export const ROLES = [
	{
		path: '/',
		roles: ['INITIAL', 'ADMIN']
	},
	{
		path: '/login',
		roles: ['INITIAL', 'ADMIN']
	},
	{
		path: '/home',
		roles: ['ADMIN']
	},
	{
		name: 'menu.dashboard',
		path: '/home/dashboard',
		roles: ['ADMIN'],
		icon: 'fa-dashboard'
	},
	{
		name: 'entity.user',
		path: '/home/users',
		roles: ['ADMIN'],
		icon: 'fa-user',
		father: 'menu.management'
	},
	{
		path: '/home/profile',
		roles: ['ADMIN']
	}

]

var getRolesByRoute = function (path) {
	for (var i = 0; i < ROLES.length; i++) {
		if (ROLES[i].path === path) {
			return ROLES[i].roles
		}
	}
}

// Script to compare if the user has permissions to see this component
export function checkPermission (path) {
	var authUser = JSON.parse(sessionStorage.getItem('authUser'))
	var permissionUser = []

	if (authUser == null) {
		permissionUser = ['INITIAL']
	} else {
		permissionUser = []
		var arr = JSON.parse(sessionStorage.getItem('authUser')).roles
		for (var i = 0; i < arr.length; i++) {
			permissionUser.push(arr[i].role_id)
		}
	}

	var permissionComponent = getRolesByRoute(path)
	// console.log(permissionComponent.length)

	for (var i = 0; i < permissionUser.length; i++) {
		for (var j = 0; j < permissionComponent.length; j++) {
			if (permissionUser[i] === permissionComponent[j]) {
				return true
			}
		}
	}
	return false
}
