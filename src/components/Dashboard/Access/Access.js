import LineChart from './../Charts/Line'
import moment from 'moment'
import Datepicker from 'vuejs-datepicker'

export default {
	data () {
		return {
			datacollection: null,
			startTime: null,
			endTime: null,
			generalData: {
				type: null,
				level: null,
				start: null,
				end: null,
				interval: null
			}
		}
	},

	computed: {
		updateReport: function () {
			if (this.generalData.start != null && this.generalData.end != null) {
				this.getReport(moment(this.generalData.start).format('YYYY-MM-DD'), moment(this.generalData.end).format('YYYY-MM-DD'), this.generalData.interval)
			}
		}
	},

	methods: {

		getReport: function (start, end, interval) {
			if (start == undefined || end == undefined || interval == undefined) {
				return
			}

			var url = 'someUrl'
			var queryParams = {
				roleId: 'ADMIN',
				start: start,
				end: end,
				interval: interval
			}

			// this.$http.get(url, {headers: getHeader(), params: queryParams}, {emulateJSON: true}).then((response) => {
			//
			// }).catch(e => {
			// 	this.error = this.$i18n.t('error.permission')
			// })

			// return of request
			var type = 'Access'
			var labelMonths = ['May', 'Jun', 'Jul']
			var values = [91, 104, 108]

			this.fillDataAccesses(type, values, labelMonths)

			this.isLoading = false
		},

		firstLoad: function () {
			var tempDate = moment().subtract(2, 'months').calendar()
			this.generalData.start = moment(tempDate.toString()).format('YYYY-MM-DD')
			this.generalData.end = moment().format('YYYY-MM-DD')
			this.generalData.interval = 'MONTH'
			// this.isLoading = true
		},

		fillDataPerformance (labelCorrects, dataCorrects, labelWrongs, dataWrongs, labelUnanswered, dataUnanswered, labels) {
			this.datacollection = {
				datasets: [
					{
						label: labelCorrects,
						data: dataCorrects,
						backgroundColor: '#1abc9c',
						borderColor: '#1abc9c',
						fill: false // ,
						// tension: 0
					},
					{
						label: labelWrongs,
						data: dataWrongs,
						backgroundColor: '#e74c3c',
						borderColor: '#e74c3c',
						fill: false // ,
						// tension: 0
					},
					{
						label: labelUnanswered,
						data: dataUnanswered,
						backgroundColor: '#bdc3c7',
						borderColor: '#bdc3c7',
						fill: false // ,
						// tension: 0
					}
				],
				labels: labels
			}
		},

		fillDataAccesses (label, data, labels) {
			this.datacollection = {
				datasets: [
					{
						label: label,
						data: data,
						backgroundColor: '#2e6bc1',
						borderColor: '#2e6bc1',
						fill: false // ,
						// tension: 0
					}
				],
				labels: labels
			}
		}
	},

	components: {
		LineChart,
		Datepicker
	},

	mounted: function () {
		this.firstLoad()
		// this.formartDatePicker()
	}
}
