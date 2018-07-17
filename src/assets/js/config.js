
export const apiDomain = 'apiDomain'
export const loginUrl = apiDomain + 'auth/accessToken'

export const getHeader = function () {
	const tokenData = JSON.parse(sessionStorage.getItem('authUser'))
	const headers = {
		'Accept': 'application/json',
		'Authorization': 'Bearer ' + tokenData.access_token
	}
	return headers
}
