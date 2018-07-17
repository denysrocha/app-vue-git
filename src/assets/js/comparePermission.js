
// Script to compare if the user has permissions to see this component
export function comparePermission (permissionUser, permissionComponent) {
	var permission = false
	for (var i = 0; i < permissionUser.length; i++) {
		for (var j = 0; j < permissionComponent.length; j++) {
			if (permissionUser[i] === permissionComponent[j]) {
				permission = true
				return permission
			}
		}
	}
}
