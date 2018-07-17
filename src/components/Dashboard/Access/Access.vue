<template>
	<transition name="slide-fade" mode="out-in">
		<!-- Page Content -->
		<div id="page-content-layout">

			{{ updateReport }}

			<hr>
			<div class="row">
				<div class="col">
					<div class="form-group">
						<label>Select start time</label>
						<datepicker :inline="false" v-model="generalData.start"></datepicker>

					</div>
				</div>
				<div class="col">
					<div class="form-group">
						<label>Select end time</label>
						<datepicker :inline="false" v-model="generalData.end"></datepicker>

					</div>
				</div>
				<div class="col">
					<div class="form-group">
						<label>Select report interval</label>
						<select class="form-control" v-model="generalData.interval">
							<option>WEEK</option>
							<option>MONTH</option>
							<option>QUARTER</option>
							<option>SEMESTER</option>
							<option>YEAR</option>
						</select>
					</div>
				</div>
			</div>
      <line-chart :width="400" :height="200" :chartData="datacollection" :options="{responsive: true, maintainAspectRatio: true}"></line-chart>
		</div>
	</transition>
</template>

<script src="./Access.js"></script>


<style scoped>

.vdp-datepicker{
  display: block;
  width: 100%;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  line-height: 1.5;
  color: #495057;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}

.data{
	width: 25%;
	float: left;
	padding: 0 10px 20px 10px;
	/*border-bottom: 1px solid #ecf0f1;*/
}

.label{
	background: linear-gradient(to right, rgb(138, 184, 34) , rgb(115, 151, 29));
	width: 100%;
	max-height: 50px;
	padding: 10px;
	border-radius: 5px;
	color: white;
	float: left;
	margin-bottom: 10px;
}

.label label{
	float: right;
}

/* Enter and leave animations can use different */
/* durations and timing functions.              */
.slide-fade-enter-active {
	transition: all .3s ease;
}
.slide-fade-leave-active {
	transition: all .3s ease;
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for <2.1.8 */ {
	/* transform: translateX(10px); */
	opacity: 0;
}
</style>
