import VueCharts from 'vue-chartjs'
// import { Bar, Line } from 'vue-chartjs'

export default {
	extends: VueCharts.Bar,

	props: ['data', 'options'],

	mounted () {
		// Overwriting base render method with actual data.
		this.renderChart(this.data, this.options)
	}
}
