import TopNavBar from '../Topnavbar/Topnavbar.vue'
import SideNavBar from '../Sidenavbar/Sidenavbar.vue'
var affiliateRole = JSON.parse(sessionStorage.getItem('affiliateRole'))

export default {
	data () {
		return {
			role: affiliateRole.role_id
		}
	},
	components: {
		TopNavBar,
		SideNavBar
	}
}
