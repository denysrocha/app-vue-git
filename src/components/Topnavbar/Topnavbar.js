import Notifications from '../Notifications/Notifications.vue'
import MenuMobile from '../MenuMobile/MenuMobile.vue'

export default {
	data () {
		return {
			links: [
				{title: 'Google Search', url: 'http://www.google.com', target: '_black'},
				{title: 'Yahoo Search', url: 'http://www.yahoo.com', target: '_black'},
				{title: 'Facebook', url: 'http://www.facebook.com', target: '_black'},
				{title: 'Flickr', url: 'http://www.flickr.com', target: '_black'}
			]
		}
	},
	components: {
		Notifications,
		MenuMobile
	}
}
