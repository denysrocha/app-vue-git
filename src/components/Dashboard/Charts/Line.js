import VueCharts from 'vue-chartjs'
// import { Line } from 'vue-chartjs'

export default {
	extends: VueCharts.Line,
	mixins: [VueCharts.mixins.reactiveProp],
	props: ['chartData', 'options'],

	mounted () {
		// Overwriting base render method with actual data.
		this.renderChart(this.chartData, this.options)
	}
}
