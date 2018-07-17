<template>
  <div>
    <a href="#" @click.prevent="toogleMenu" class="slide-menu-open">
        <i v-if="material" class="material-icons">{{ material }}</i>
        <i :class="icon" id="menu-icon" v-else></i>
        {{ label }}
    </a>
    <div class="side-menu-overlay" style="width: 0px; opacity: 0;" @click.prevent="toogleMenu"></div>
    <div class="side-menu-wrapper">
        <a href="#" class="menu-close" @click.prevent="toogleMenu"><i :class="icon" id="menu-icon"></i></a>
        <div id="logo">
          <img src="../../assets/img/logo.png" alt="" height="100px;">
          <label>Vue Application Default</label>
        </div>
        <main-menu id="main-menu" v-on:closeMenu="closeMenu"></main-menu>
    </div>
  </div>
</template>

<script>
import MainMenu from '../MainMenu/MainMenu.vue'
export default {
  name: 'vue-menu-overlay',
  props: {
      menus: { type: Array },
      label: { default: ''},
      icon: { default: String },
      material: { default: String }
  },
  data () {
    return {
        open: false
    }
  },
  methods: {
      toogleMenu(){
    	this.open = !this.open
        const slide_bar = document.querySelector('.side-menu-wrapper'),
      	overlay = document.querySelector('.side-menu-overlay')
        if(this.open){
            slide_bar.style.left = '0px'
        	overlay.style.opacity = 1
            overlay.style.width = '100%'
        } else {
            slide_bar.style.left = `-290px`
            overlay.style.opacity = 0
            overlay.style.width = 0
        }
    },
    closeMenu(){
      this.toogleMenu()
    }
  },
  components: {
    MainMenu
  }
}
</script>

<style scoped>
#logo{
	color: #ffffff;
	font-size: 12pt;
	text-shadow: 1px 1px 5px rgba(0, 0, 0, 0.2);
}

#logo img{
  margin: 30px;
}

#menu-icon{
  color: #ecf0f1;
}
.side-menu-wrapper {
    overflow: auto;
    background: #80c4d1;
    padding: 40px 0 0 40px;
    position: fixed;
    top: 0;
    left: -290px;
    height: 100%;
    z-index: 2;
    transition: 0.5s;
    width: 250px;
    font: 20px;
}
.side-menu-wrapper > ul{
    list-style:none;
    padding:0;
    margin:0;
    overflow-y: auto;
    width:500px;
    height:95%;
}
.side-menu-wrapper > ul > li > a {
    display: block;
    padding: 6px 4px 6px 4px;
    color: white;
    transition: 0.3s;
    text-decoration: none;
}
.side-menu-wrapper > a.menu-close {
    padding: 8px 0 4px 23px;
    color: #ecf0f1;
    display: block;
    margin: -20px 0 10px -20px;
    font-size: 17px;
    text-decoration: none;
}

.side-menu-overlay {
    height: 100%;
    width: 0;
    position: fixed;
    z-index: 1;
    top: 0;
    left: 0;
    background-color: rgba(0,0,0,.7);
    overflow-y: auto;
    overflow-x: hidden;
    text-align: center;
    opacity: 0;
    transition: opacity 1s;
}
</style>
