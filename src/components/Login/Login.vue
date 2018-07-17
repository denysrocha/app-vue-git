<template>
  <div>
    <section id="bg">
      <form v-on:submit.prevent="LoginFormSubmit()" id="login">
        <img src="../../assets/img/logo.png">
        <label>Vue Application Default</label>
        <div class="row">
          <div class="col-md-12">
            <input type="text" class="form-control" placeholder="User name" v-model="login.username">
            <input type="password" class="form-control" placeholder="Password" v-model="login.password">
            <button type="submit" class="btn btn-block">{{$t('button.login')}}</button>

          </div class="col-md-12">
        </div>
      </form>
    </section>
  </div>
</template>

<script src="./Login.js"></script>

<style scoped>

.row{
  margin: 0;
  padding: 0;
}

#bg{
  background-image: url("../../assets/img/bg2.png");
  background-repeat: no-repeat;
  background-size: cover;
  background-attachment: fixed;
  overflow: hidden;
  width: 100%;
  height: 100vh;
}


#login{
  width: 300px;
  position: relative;
  padding-top: 12%;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
}

#login img{
  max-height: 150px;
}

#login label{
  color: #fff;
  margin-bottom: 20px;
}

#login input{
  margin-bottom: 10px;
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 0px;
  height: 40px;
}

#login button{
  border-radius: 0px;
  background-color: rgba(128, 196, 209,1.0);
  color: #ffffff;
  font-weight: 600;
  height: 40px;
}

/*responsivity*/

/*tablet - vertical*/
@media only screen and (max-width: 768px){
  .row{
    margin: 0;
  }
  .col-md-4, .col-md-6{
    padding: 0;
  }
  .item{
    margin-top: 0px;
    width: 100%;
    height: 500px;
    padding: 0;

  }
  #bg{
    height: 930px;
  }
  #login{
    margin-top: 20%;
  }
  .about-us-item{
    background-size: 100%;
    background-size: cover;
    margin: auto;
    margin-top: 50px;
    width: 100%;
    height: 400px;
  }
  .about-us-item p{
    position: absolute;
    margin-top: -190px;
    margin-left: 395px;
    width: 350px;
    padding: 0;
    text-align: right;
    color: #ffffff;
  }
  #about-us{
    margin-bottom: 0;
  }

}

@media only screen and (min-width: 981px) and (max-width: 1024px){
  .item{
    width: 100%;
  }
  .about-us-item{
    width: 480px;
  }
  #about-us-item-2 div{
    border-right: 481px solid rgba(128, 196, 209,0.9);
  }
  #about-us-item-1 div{
    border-right: 481px solid rgba(232, 86, 71, 0.9);
  }
  .about-us-item p{
    margin-left: 122px;
  }
}


/*tablet - horizontal*/
@media only screen and (min-width: 769px) and (max-width: 980px){
  .row{
    margin: 0;
  }
  .col-md-4, .col-md-6{
    padding: 0;
  }
  .item{
    margin-top: 0px;
    width: 100%;
    height: 230px;
    padding: 0;

  }
  #bg{
    height: 800px;
  }
  .about-us-item{
    background-size: 100%;
    background-size: cover;
    margin: auto;
    margin-top: 50px;
    width: 100%;
    height: 400px;
    float: left;
  }
  .about-us-item p{
    position: absolute;
    margin-top: -190px;
    margin-left: 24%;
    width: 350px;
    padding: 0;
    text-align: right;
    color: #ffffff;
  }

  #about-us{
    margin-bottom: 0;
  }
  #about-us-item-1 div{
    border-right: 410px solid rgba(232, 86, 71, 0.9);
    border-top: 400px solid transparent;
  }

  #about-us-item-2 div{
    border-right: 410px solid rgba(128, 196, 209,0.9);
    border-top: 400px solid transparent;
  }

}

/*mobile1 - vertical*/
@media only screen and (max-width: 320px){
  .row{
    margin: 0;
  }
  .col-md-4, .col-md-6{
    padding: 0;
  }
  .item{
    margin-top: 0px;
    width: 100%;
    height: 230px;
    padding: 0;

  }
  #bg{
    height: 500px;
  }
  #login{
    margin-top: 20px;
    width: 260px;
  }
  .about-us-item{
    background-size: 100%;
    background-size: cover;
    margin: auto;
    margin-top: 50px;
    width: 100%;
    height: 400px;
    float: left;
  }
  .about-us-item p{
    position: absolute;
    margin-top: -130px;
    margin-left: 10px;
    width: 300px;
    padding: 0;
    text-align: right;
    color: #ffffff;
  }
  .about-us-item p button{
    display: none;
  }
  #about-us{
    margin-bottom: 0;
  }
  #about-us-item-1 div{
    border-right: 400px solid rgba(232, 86, 71, 0.9);
    border-top: 400px solid transparent;
  }

  #about-us-item-2 div{
    border-right: 400px solid rgba(128, 196, 209,0.9);
    border-top: 400px solid transparent;
  }

}


/*mobile1- horizontal*/
@media only screen and (min-width: 321px) and (max-width: 480px){
  .row{
    margin: 0;
  }
  .col-md-4, .col-md-6{
    padding: 0;
  }
  .item{
    margin-top: 0px;
    width: 100%;
    height: 300px;
    padding: 0;

  }
  #bg{
    height: 350px;
  }
  #login{
    margin-top: -30px;
    width: 360px;
  }
  #login img{
    width: 100px;
  }
  .about-us-item{
    background-size: 100%;
    background-size: cover;
    margin: auto;
    margin-top: 50px;
    width: 100%;
    height: 400px;
    float: left;
  }
  .about-us-item p{
    position: absolute;
    margin-top: -190px;
    margin-left: 170px;
    width: 300px;
    padding: 0;
    text-align: right;
    color: #ffffff;
  }
  #about-us{
    margin-bottom: 0;
  }
  #about-us-item-1 div{
    border-right: 500px solid rgba(232, 86, 71, 0.9);
    border-top: 400px solid transparent;
  }

  #about-us-item-2 div{
    border-right: 500px solid rgba(128, 196, 209,0.9);
    border-top: 400px solid transparent;
  }

}


/*mobile2 - vertical*/
@media only screen and (min-width: 321px) and (max-width: 360px){
  .row{
    margin: 0;
  }
  .col-md-4, .col-md-6{
    padding: 0;
  }
  .item{
    margin-top: 0px;
    width: 100%;
    height: 230px;
    padding: 0;

  }
  #bg{
    height: 700px;
  }
  #login{
    margin-top: 60px;
    width: 260px;
  }
  .about-us-item{
    background-size: 100%;
    background-size: cover;
    margin: auto;
    margin-top: 50px;
    width: 100%;
    height: 400px;
    float: left;
  }
  .about-us-item p{
    position: absolute;
    margin-top: -130px;
    margin-left: -20px;
    width: 350px;
    padding: 0;
    text-align: right;
    color: #ffffff;
  }
  .about-us-item p button{
    display: none;
  }
  #about-us{
    margin-bottom: 0;
  }
  #about-us-item-1 div{
    border-right: 350px solid rgba(232, 86, 71, 0.9);
    border-top: 400px solid transparent;
  }

  #about-us-item-2 div{
    border-right: 350px solid rgba(128, 196, 209,0.9);
    border-top: 400px solid transparent;
  }

}


/*mobile2- horizontal*/
@media only screen and (min-width: 481px) and (max-width: 640px){
  .row{
    margin: 0;
  }
  .col-md-4, .col-md-6{
    padding: 0;
  }
  .item{
    margin-top: 0px;
    width: 100%;
    height: 430px;
    padding: 0;

  }
  #bg{
    height: 400px;
  }
  #login{
    margin-top: -50px;
    width: 460px;
  }
  .about-us-item{
    background-size: 100%;
    background-size: cover;
    margin: auto;
    margin-top: 50px;
    width: 100%;
    height: 400px;
    float: left;
  }
  .about-us-item p{
    position: absolute;
    margin-top: -130px;
    margin-left: 270px;
    width: 350px;
    padding: 0;
    text-align: right;
    color: #ffffff;
  }
  .about-us-item p button{
    display: none;
  }
  #about-us{
    margin-bottom: 0;
  }
  #about-us-item-1 div{
    border-right: 500px solid rgba(232, 86, 71, 0.9);
    border-top: 400px solid transparent;
  }

  #about-us-item-2 div{
    border-right: 500px solid rgba(128, 196, 209,0.9);
    border-top: 400px solid transparent;
  }

}



</style>
