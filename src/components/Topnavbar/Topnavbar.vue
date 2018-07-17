
<template>
	<div id="top-nav-bar">

		<menu-mobile :menus="links" icon="fa fa-bars fa-lg" id="menu-mobile"></menu-mobile>

		<div id="logo">
			<img src="../../assets/img/logo.png" height="40" v-on:click="$router.push('/home/dashboard')">
			<label>Vue Application Default</label>
		</div>

		<!-- call profile area component -->
		<notifications></notifications>

	</div>
</template>

<!-- scripts -->
<script src="./Topnavbar.js"></script>

<style scoped>

#menu-mobile{
    margin-left:  30px;
    margin-top: 36px;
    position: absolute;
    z-index:  9999;
		display: none;
}

.btn{
	cursor: pointer;
}

#logo{
	color: #ffffff;
	margin-top: 20px;
	margin-bottom: -57px;
	margin-left: 20px;
	font-size: 12pt;
	text-shadow: 1px 1px 5px rgba(0, 0, 0, 0.2);
}

#logo label{
	margin-left: 10px;
	margin-top: 5px;
}

#logo img{
	cursor: pointer;
}

#top-nav-bar-elements{
	color: #ffffff;
	padding-bottom: 0px;
		/*padding-top: 20px;
		padding-bottom: 6px;*/
	}

	#top-nav-bar {
		position: fixed;
		z-index: 1000;
		width: 100%;
		padding: 0px;
		margin-top: -10px;
		background-color: #0182a7;
		font-size: 12pt;
		text-align: left;
		box-shadow: 0px 1px 1px rgba(0,0,0,0.2);
		height: 77px;
	}

	/*responsitivy*/

	/*mobile - vertical*/

	@media only screen and (min-width: 320px) and (max-width: 812px){
		#logo{
			display: none;
		}
		#menu-mobile{
			display: block;
		}
	}
	</style>
