<template>
  <div align="right" id="top-nav-bar-elements">

    <div class="icons">
     <button class="btn-flag" v-bind:class="{ active: isActive == 'en' }" aria-hidden="true" v-on:click="switchLocale('en')">
       <flag iso="us" class="flag" />
     </button>
     <button class="btn-flag" v-bind:class="{ active: isActive == 'pt' } "aria-hidden="true" v-on:click="switchLocale('pt')">
       <flag iso="br" class="flag" />
     </button>

     <!-- <select class="form-control margin-top" id="affiliate" v-model="affiliateRole" v-on:change="setAffiliateRole">
      <option v-for="role in userRoles" v-bind:value="role">{{ role.affiliate_name }} - {{ role.role_id }}</option>
      </select> -->

    <!--<i class="fa fa-lg fa-calendar-check-o margin-top" aria-hidden="true"></i>
    <i class="fa fa-lg fa-envelope-o margin-top" aria-hidden="true"></i>-->

    <i class="fa fa-lg fa-bell margin-top" aria-hidden="true" id="notification" v-on:click="readNotification()" v-if="visible">
      <div id="counter" v-if="count >= 1">{{ count }}</div>
    </i>

    <i class="fa fa-lg fa-bell-o margin-top" aria-hidden="true" id="notification" v-on:click="readNotification()" v-else>
      <div id="counter" v-if="count >= 1">{{ count }}</div>
    </i>

    <i class="fa fa-lg fa-sign-out margin-top" aria-hidden="true" id="logout" v-on:click="destroySession"></i>

  </div>

  <transition name="fade">
    <div id="notification-box" v-if="visible">

      <center id="alert" v-if="alert">{{$t('info.notification')}}</center>

      <span v-on:click="deleteAllNotifications" v-if="!alert" id="deleteAllNotifications">{{$t('prompt.notification')}}</span>

      <transition-group name="list" tag="div" style="margin-top: 10px;">
        <div class="notification-item" v-for="message in messages" v-bind:key="message.id">
          <span>
            <button type="button" class="close" v-on:click="deleteNotification(message.id)">
              <span aria-hidden="true">&times;</span>
            </button>
            <div v-on:click="accessNotification(message.id)">{{ message.text }}</div>
          </span><br>
          <span class="timestamp">
            {{ message.timestamp | moment }}
            <span class="glyphicon glyphicon-ok pull-right" style="color: #27ae60;" aria-hidden="true" v-if="message.accessed"></span>
            <span class="glyphicon glyphicon-ok pull-right" style="color: #d7dce0;" aria-hidden="true" v-else></span>
          </span>
        </div>
      </transition-group>

    </div>
  </transition>


  <!-- <i class="fa fa-bars margin-top" aria-hidden="true" id="bars-icon" v-on:click="show = !show"></i> -->
  <div v-on:click="showProfileArea()">
    <div id="user-icon">
      <div id="user-icon-box">
        <img v-bind:src="userImg" alt="" id="user-icon-img">
      </div>
      <div id="user-icon-name">
        <label>{{ firstName }} {{ lastName }}</label>
      </div>
    </div>
  </div>
  <transition name="slide-fade">
    <div id="profile-area" v-if="show">
      <div class="side">
        <figure>
          <center>
            <img v-bind:src="userImg">
          </center>
        </figure>
      </div>
      <div class="side">
        <label>{{ firstName }} {{ lastName }}</label>
        <p>{{$t('title.profile')}}</p>
        <hr>
        <button class="btn btn-info btn-sm pull-right" v-on:click="destroySession">{{$t('button.logout')}}<i class="fa fa-sign-out" aria-hidden="true"></i></button>
      </div>
    </div>
  </transition>
</div>
</template>


<!-- scripts -->
<script src="./Notifications.js"></script>
<!-- <link rel="stylesheet" href="../../assets/css/font-awesome/css/font-awesome.css"> -->
<style scoped>

@import url('https://fonts.googleapis.com/css?family=Roboto');

.icons{
  margin-right: 200px;
  margin-top: 20px;

}

#affiliate{
  width: 120px;
  display: initial;
  margin-top: 10px;
  font-size: 10pt;
  height: 30px;
  background-color: rgba(255, 255, 255, 0.2);
  color: white;
  margin-right: 30px;
  border-radius: 0;
}

#affiliate option{
  color: grey;
}

.btn{
  cursor: pointer;
}

#alert{
  margin-top: 10px;
}

#deleteAllNotifications{
  cursor: pointer;
  font-size: 11pt;
}

#deleteAllNotifications:hover{
  color: rgba(128, 196, 209,1.0);
}

.notification-item{
  border: 1px solid rgb(233, 238, 242);
  /* box-shadow: 0px 1px 10px rgba(0,0,0,0.1); */
  text-align: left;
  padding: 10px;
  margin-bottom: 10px;
}

.notification-item:hover{
  cursor: pointer;
  background-color: rgba(233, 238, 242, 0.3);
}

.timestamp{
  position: absolute;
  margin-top: -15px;
  font-size: 10pt;
  color: rgba(149, 165, 166,1.0);
}

.timestamp span{
  position: absolute;
  margin-left: 142%;
}

#counter{
  position: absolute;
  font-family: 'Roboto', sans-serif;
  margin-top: -30px;
  margin-left: 10px;
  border-radius: 100%;
  font-size: 11pt;
  padding: 4px;
  width: 20px;
  height: 20px;
  background-color: rgba(231, 76, 60,1.0);
}

#notification:hover{
  cursor: pointer;
}

#notification-box{
  font-family: 'Roboto', sans-serif;
  position: absolute;
  z-index: 999;
  margin-top: 20px;
  padding: 15px;
  right: 200px;

  width: 330px;
  min-height: 80px;
  max-height: 300px;
  overflow-y: scroll;

  background-color: #ffffff;
  color: rgba(0, 0, 0, 0.5);
  border: 1px solid rgb(233, 238, 242);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

#notification-box::-webkit-scrollbar-track {
  background-color: transparent;
}
#notification-box::-webkit-scrollbar {
  width: 3px;
  background: transparent;
}
#notification-box::-webkit-scrollbar-thumb {
  background: #dad7d7;
}

#notification-box p{
  text-align: justify;
  overflow-x: hidden;
}

#user-icon{
  background-color: rgba(0, 0, 0, 0.1);
  /* background-image: url("src/assets/user-bg.jpg"); */
  /* margin-top: -15px;
  margin-bottom: -23px; */
  padding: 20px 0 47px 0px;
  height: 20px;
  width: 100%;
  min-width: 180px;
  max-width: 180px;
  position: absolute;
  top: 0;
  right: 0;
  margin-top: 10px;
  cursor: pointer;
  word-wrap: break-word;
}

#user-icon-box{
  margin-left: 20px;
  overflow: hidden;
  width: 50px;
  height: 50px;
  clear: both;
  border-radius: 100%;
  position: absolute;
  margin-top: -10px;
}

#user-icon-img{
  position: relative;
  max-height: 52px;
  top: 80%;
  left: 0%;
  margin-top: -60px;
  margin-left: -50px;
}

#user-icon-name{
  position: relative;
  margin-left: 80px;
  font-family: 'Roboto', sans-serif;
  font-size: 11pt;
  color: white;
  font-weight: lighter;
  text-align: left;
}

#profile-area{
  position: fixed;
  margin-top: 22px;
  margin-right: 5px;
  padding: 15px;
  right: 10px;
  width: 330px;
  background-color: #ffffff;
  color: rgba(0, 0, 0, 0.5);
  border: 1px solid rgb(233, 238, 242);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  text-align: left;
  float: left;
}

.side{
  width: 147px;
  float: left;
}

#profile-area img{
  max-height: 120px;
  max-width: 120px;
  border-radius: 5px;
  margin-right: 10px;
}

#profile-area figcaption{
  font-size: 10pt;
  margin-left: -10px;
  cursor: pointer;
}

#profile-area label{
  margin-top: 20px;
  color: rgba(0, 0, 0, 0.7);
}

#profile-area p{
  font-size: 10pt;
  cursor: pointer;
}

.fa{
  margin-left: 15px;
}

/* Enter and leave animations can use different */
/* durations and timing functions.              */
.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for <2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}

.fade-enter-active {
  transition: all .3s ease;
}
.fade-leave-active {
  transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for <2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}

.list-item {
  display: inline-block;
  margin-right: 10px;
}
.list-enter-active, .list-leave-active {
  transition: all 0.3s;
}
.list-enter, .list-leave-to /* .list-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: translateX(10px);
}

.flag{
  margin-right: 5px;
}

#bars-icon{
  display: none;
  cursor: pointer;
}

#logout{
  display: none;
  cursor: pointer;
}

.flag{
  padding: 7px 22px 23px 11px;
  width: 20px;
  height: 20px;
  margin: auto;
}

.btn-flag{
  padding: 0;
  margin-right: 5px;
  background: none;
  border: none;
}

.active{
  border: 1px solid rgba(255,255,255,0.2);
  background: rgba(255,255,255,0.2);
  box-shadow: 0px 1px 10px rgba(255,255,255,0.5);
}

/*mobile - vertical*/
@media only screen and (max-width: 320px){
  #user-icon{
    display: none;
  }
  #top-nav-bar-elements{
    margin-right: 0px;
    margin-top: -9px;
  }
  #bars-icon{
    display: initial;
  }
  .icons{
    margin-right: 10px;
    margin-top: 30px;
  }
  #affiliate{
    margin-right: 0;
  }
  .fa{
    margin-left: 10px;
    margin-right: 15px;
  }
  #logo{
    margin-top: 26px;
    margin-bottom: -64px;
    margin-left: 16px;
    font-size: 14pt;
  }
  #logout{
    display: inline-block;
  }
  #notification-box{
    right: 10px;
    width: 318px;
  }
}

@media only screen and (min-width: 321px) and (max-width: 425px){
  #user-bg{
    min-height: 117px;
    margin-top: -17px;
  }
  #user-icon{
    display: none;
  }
  #bars-icon{
    display: initial;
  }
  .icons{
    margin-right: 10px;
  }
  #affiliate{
    margin-right: 0;
  }
  .fa{
    margin-left: 5px;
    margin-right: 5px;
  }
  #logo{
    margin-top: 26px;
    margin-bottom: -64px;
    margin-left: 16px;
    font-size: 18pt;
  }
  #logout{
    display: inline-block;
  }
  #notification-box{
    right: 10px;
  }
}

@media only screen and (min-width: 426px) and (max-width: 767px){
  #user-icon{
    min-width: 190px;
  }
  #user-icon-box{
    margin-left: 11px;
  }
  #user-icon-name{
    margin-left: 70px;
  }
  #notification-box{
    right: 10px;
  }
}

</style>
