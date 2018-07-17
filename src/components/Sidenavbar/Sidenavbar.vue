<template>
	<div id="side-nav-bar">

		<div id="user" v-bind:style="{ 'background-image': 'url(' + userData.background_picture + ')'}">
			<div id="user-bg">
				<div id="change-background-picture"><label><input type="file" v-on:change="onFileChangeBackground">{{$t('prompt.change')}}</label></div>
			</div>
			<div id="user-box">
				<img v-bind:src="userData.profile_picture" alt="" id="user-img">
				<!-- <img :src="imgDataUrl" id="user-img"> -->
				<label id="change-profile-picture">
					<!-- <input type="file" v-on:change="onFileChangeProfile">Change my photo -->
					<a @click="toggleShow" @change="putProfilePicture">{{$t('prompt.photo')}}</a>
					<my-upload field="img"
					@crop-success="cropSuccess"
					@crop-upload-success="cropUploadSuccess"
					@crop-upload-fail="cropUploadFail"
					v-model="show"
					:width="300"
					:height="300"
					:params="params"
					:headers="headers"
					lang-type="en"
					img-format="png">
				</my-upload>
			</label>
		</div>
		<div id="user-name">
			<label>{{ userData.first_name }}</label>
			<hr>
			<router-link to="/home/profile" id="profile">{{$t('title.profile')}}</router-link>
		</div>
	</div>
	<main-menu id="main-menu"></main-menu>
	</div>
</template>

<!-- scripts -->
<script src="./Sidenavbar.js"></script>

<style scoped>

	#profile{
		text-decoration: none;
		font-size: 11pt;
	}

	#side-nav-bar{
		position: fixed;
		width: 17%;
		min-width: 345px;
		height: 100%;
		margin: 5% 0 1% 5%;
		float: left;
		z-index: -2;

		/* background-color: rgb(245, 248, 249); */
	}


	#change-profile-picture {
		position: absolute;
		margin-top: 120px;
		margin-left: -73px;
		font-size: 9pt;
		color: transparent;
		background-color: transparent;
		padding: 12px 25px 25px 25px;
		cursor: pointer;
		transition: 0.5s;
	}

	#change-profile-picture:hover{
		color: rgba(0,0,0,0.7);
		margin-top: 104px;
		background-color: rgba(255,255,255,0.2);
		transition: 0.5s;
	}


	#change-background-picture {
		position: absolute;
		color: transparent;
		margin-top: -32px;
		font-size: 10pt;
		cursor: pointer;
		padding: 10px 13px 0 189px;
		transition: 0.5s;
	}

	#change-background-picture:hover{
		color: rgba(0,0,0,0.7);
		background-color: rgba(255,255,255,0.2);
		margin-top: -35px;
		transition: 0.5s;
	}

	#change-background-picture label {
		cursor: pointer;
	}

	input{
		width: 0.1px;
		height: 0.1px;
		opacity: 0;
		overflow: hidden;
		position: absolute;
		z-index: -1;
	}


	#user{
		border: 1px solid rgb(233, 238, 242);
		/* border-left: 1px solid rgb(233, 238, 242);
		border-right: 1px solid rgb(233, 238, 242); */
		background-size: 100%;
		background-repeat: no-repeat;
		bottom: 0;
		left: 0;
		overflow: auto;
		padding: 150px 0 27px 0px;
		min-height: 300px;
		position: relative;
	}

	#user-box{
		margin-left: 20px;
		overflow: hidden;
		width: 150px;
		height: 150px;
		clear: both;
		border-radius: 100%;
		position: absolute;
		margin-top: -160px;
	}

	#user-img{
		position: relative;
		max-height: 152px;
		top: 50%;
		left: 50%;
		margin-top: -78px;
		margin-left: -148px;
	}

	#user-name{
		position: relative;
		margin-left: 185px;
		margin-top: -85px;
		font-family: 'Roboto', sans-serif;
		font-size: 14pt;
		line-height: 0%;
		color: rgba(0,0,0,0.7);
		font-weight: lighter;
		text-align: left;
	}



	#user-name p{
		font-size: 12pt;
		cursor: pointer;
	}

	#user-name hr {
		width: 80%;
		margin: 10px 0 15px -1px;
	}

	#user-bg{
		background-color: #ffffff;
		/*border: 1px solid rgb(233, 238, 242);*/
		min-height: 116px;
		bottom: 0;
		margin-top: 30px;

	}

		a{
			color: rgba(0, 0, 0, 0.5);
		}


	/*responsitivy*/


	@media only screen and (min-width: 1081px) and (max-width: 1919px){
		#side-nav-bar{
			margin: 6% 0 1% 1%;
		}
	}

	/*others screens - vertical*/
	@media only screen and (min-width: 1025px) and (max-width: 1080px){
		#side-nav-bar{
			position: relative;
			width: 100%;
			margin: 5% 0 0 0;
		}
	}



	/*tablet - vertical*/
	@media only screen and (max-width: 812px){
		#side-nav-bar{
			position: relative;
			width: 100%;
			margin: 5% 0 0 0;
		}
		#user{
			padding: 200px 0 51px 0px;
		}
		#main-menu{
			display: none;
		}
	}

	/*tablet - horizontal*/
	@media only screen and (min-width: 813px) and (max-width: 1024px){
		#side-nav-bar{
			position: relative;
			width: 100%;
			margin: 5% 0 0 0;
		}
		#user{
			padding: 200px 0 27px 0px;
		}
	}

	/*mobile - vertical*/
	@media only screen and (max-width: 320px){
		#user{
			padding-top: 160px;
		}
		#user-box{
			margin-left: 30px;
			width: 135px;
			height: 135px;
		}
		#user-name{
			margin-left: 175px;
		}
		#user-icon{
			display: none;
		}
		#side-nav-bar{
			margin-left: -7%;
		}
		#user-img{
			margin-top: -72px;
			margin-left: -134px;
			max-height: 138px;
		}
		#main-menu{
			display: none;
		}
	}

	@media only screen and (min-width: 321px) and (max-width: 360px){
		#user-icon{
			display: none;
		}
		#user{
			padding: 170px 0 27px 0px;
		}
		#main-menu{
			display: none;
		}
	}

	@media only screen and (min-width: 361px) and (max-width: 425px){
		#user-bg{
			min-height: 100px;
		}
		#main-menu{
			display: none;
		}
	}

	</style>
