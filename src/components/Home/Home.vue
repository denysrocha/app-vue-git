<!-- use props to share data bettween components -->
<template>
	<div id="home">
		<div id="loading-bg"></div>
		<top-nav-bar></top-nav-bar>

		<side-nav-bar></side-nav-bar>

		<div id="content" v-bind:class="{ player: role == 'PLAYER' }">
			<router-view></router-view>
		</div>

		<modal name="success" :adaptive="true" :height="'auto'" :pivotY="0.4">
			<div class="modal-example">
				<center><h4>{{$t('info.success')}}</h4></center><br>
			</div>
		</modal>

		<v-dialog/>

	</div>
</template>

<script src="./Home.js"></script>

<style scoped>

@import url('../../assets/css/font-awesome/css/font-awesome.css');
@import url('https://fonts.googleapis.com/css?family=Roboto');

#loading-bg{
	width: 100%;
	min-height: 100vh;
	position: fixed;
	z-index: 1030;
  background-color: rgba(255,255,255,0.4);
  display: none;
}

.modal-example{
	padding: 20px;
}

*{
	margin: 0;
	padding: 0;
}

.btn{
	cursor: pointer;
}

body{
	background-color: rgb(245, 248, 250);
	background-repeat: no-repeat;
	background-size:100%;
	bottom: 0;
	left: 0;
	overflow: auto;
	position: absolute;
	right: 0;
	text-align: center;
	top: 0;
	background-size: cover;
	font-family: 'Roboto', sans-serif;
}

h3{
	color: rgba(42, 121, 136, 1.0);
	font-size: xx-large;
}

#content{
	position: absolute;
	background-color: #ffffff;
	border: 1px solid rgb(233, 238, 242);
	margin: 5% 1% 0 24%;
	padding: 30px;
	width: 70%;
	float: left;
	min-height: 720px;
	text-align: left;
	z-index: -2;
}

/*responsitivy*/


@media only screen and (min-width: 1081px) and (max-width: 1919px){
	#content{
		margin: 6% 1% 0 30%;
		width: 68%;
	}
}

/*others screens - vertical*/
@media only screen and (min-width: 1025px) and (max-width: 1080px){
	#content{
		position: relative;
		width: 96%;
		margin: 2%;
	}
}



/*tablet - vertical*/
@media only screen and (max-width: 768px){
	#content{
		position: relative;
		width: 96%;
		margin: 2%;
		padding: 20px;
	}
}

/*tablet - horizontal*/
@media only screen and (min-width: 769px) and (max-width: 1024px){
	#content{
		position: relative;
		width: 96%;
		margin: 2%;
	}
}

/*mobile - vertical*/
@media only screen and (max-width: 320px){
	#content{
		width: 100%;
		margin: 10px 0 0 0;
		padding: 20px;
	}
}

</style>
