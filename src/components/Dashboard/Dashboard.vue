<template>
	<transition name="slide-fade" mode="out-in">
		<!-- Page Content -->
		<div id="page-content-layout">
			<div class="container-fluid container-content">

				<!-- Default dashboard -->

				<h4>{{$t('title.welcome')}}</h4>
				<p>{{$t('description.dashboard')}}</p>
				<access></access>

			</div>
		</div>
	</transition>
</template>

<script src="./Dashboard.js"></script>


<style scoped>
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
