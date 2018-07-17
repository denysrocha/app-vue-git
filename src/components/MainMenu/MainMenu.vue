<template>
	<div>
		<ul id="menu">
				<li v-on:click="backToHome(), closeMenuMobile()">
					<router-link to="/home/dashboard">
						{{$t('menu.home')}}
					</router-link>
				</li>
				<li v-for="m in menu" v-bind:class="{ disabled: !m.active }">
					<a href="#" v-on:click="activeMenu(m)" v-if="m.active" v-bind:class="{ enabled: flag }"><i class="fa fa-angle-double-left" aria-hidden="true" v-if="flag"></i> {{$t(m.item)}}</a>
					<hr v-if="flag">
					<transition-group name="main-menu" tag="ul" id="sub-menu">
						<li v-for="s in m.subitems" v-if="s.active" v-bind:key="$tc(s.name)" v-on:click="closeMenuMobile()">
							<router-link v-bind:to="s.path">
								<i class="fa" v-bind:class="s.icon"></i>{{$tc(s.name,2)}}
							</router-link>
						</li>
					</transition-group>
				</li>

				<li v-for="s in simpleMenu">
					<router-link v-bind:to="s.path">
						<i class="fa" v-bind:class="s.icon"></i>{{$tc(s.name,2)}}
					</router-link>
				</li>
			</ul>
		</div>
</template>

<!-- scripts -->
<script src="./MainMenu.js"></script>

<style scoped>

.main-menu-enter-active, .main-menu-leave-active {
	transition: all 0.5s cubic-bezier(0.22, 0.61, 0.36, 1);
}
.main-menu-enter, .main-menu-leave {
	transform: translateX(-10px);
	opacity: 0;
}

.disabled{
	display: none;
}

.enabled{
	color: rgba(42, 121, 136, 1.0);
}

.fa{
	margin-right: 5px;
}


.icon{
	margin-right: 10px;
}

#menu::-webkit-scrollbar-track {
	background-color: transparent;
}
#menu::-webkit-scrollbar {
	width: 3px;
	background: transparent;
}
#menu::-webkit-scrollbar-thumb {
	background: #dad7d7;
}

#menu{
	background-color: #ffffff;
	border: 1px solid rgb(233, 238, 242);
	margin-top: 17px;
	padding: 20px;
	max-height: 400px;
	overflow-y: auto;
	text-align: left;
}

	a{
		color: rgba(0, 0, 0, 0.5);
	}

	ul#menu li{
		margin-bottom: 10px;
		list-style-type: none;
	}


	ul#menu li a:hover{
		text-decoration: none;
		color: rgba(42, 121, 136, 1.0);
	}

	ul#menu li a:focus{
		text-decoration: none;
		color: rgba(42, 121, 136, 1.0);
	}

	.router-link-exact-active{
		color: rgba(42, 121, 136, 1.0);
	}

	ul#menu hr{
	/* width: 90%;
	margin-left: -5px; */
	margin: 7px 0 7px 0;
}

.fa{
	margin-right: 15px;
}


/*others screens - vertical*/
@media only screen and (min-width: 1025px) and (max-width: 1080px){
	#menu{
		margin-top: 10px;
		width: 96%;
		margin: 2% 2% 0 2%;
	}
}



/*tablet - vertical*/
@media only screen and (min-width: 320px) and (max-width: 812px){
	#menu{
		margin-top: 10px;
		width: 96%;
		margin: 2% 2% 0 -20px;
		background: transparent;
		border: none;
		max-height: 100vh;
	}
	#sub-menu{
		margin-left: -35px;
		font-size: 11pt;
	}
}

/*tablet - horizontal*/
@media only screen and (min-width: 813px) and (max-width: 1024px){
	#menu{
		margin-top: 10px;
		width: 96%;
		margin: 2% 2% 0 2%;
	}
}

	</style>
