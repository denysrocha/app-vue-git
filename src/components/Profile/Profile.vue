<template> 
	<transition name="slide-fade" mode="out-in">
		<!-- Page Content -->
		<div id="page-content-layout">
			<div class="container-fluid container-content">
				<div class="row">
					<div class="col-md-12">
						<h3>{{$t('title.profile')}}</h3>
						<hr>
					</div>
				</div>
                <div class="row">
                	<div class="col-md-2">
                		<img v-bind:src="profile.profile_picture" id="profile_picture">
                	</div>
                	<div class="col-md-8" id="box-information">
                        <div class="row">
                            <div class="col-m-12">
                                <div class="btn-group pull-right" role="group">
                                    <button class="btn btn-default btn-sm btn-edit" v-on:click="editInput()" v-bind:class="{ btnActive: btnEdit }"><i class="fa fa-pencil" aria-hidden="true"></i></button>
                                    <button class="btn btn-default btn-sm btn-cancel btn-danger" v-on:click="cancel(), showModal('attention')" v-bind:class="{ btnActive: btnCancel }"><i class="fa fa-ban" aria-hidden="true"></i></button>
                                    <button class="btn btn-default btn-sm btn-save btn-success" v-on:click="save(), showModal('success')" v-bind:class="{ btnActive: btnSave }"><i class="fa fa-save" aria-hidden="true"></i></button>
                                </div>

                            </div>
                        </div>
                        <div class="row">
                           <div class="col-md-6">
                            <label>{{$t('attribute.fname')}}:</label>
                            <div class="text-edit" v-bind:class="{ active: textActive }">{{ profile.first_name }}</div>
                            <input type="text" class="form-control input-edit" v-bind:class="{ active: inputActive }" v-model="profile.first_name">
                        </div>
                        <div class="col-md-6">
                            <label>{{$t('attribute.lname')}}:</label>
                            <div class="text-edit" v-bind:class="{ active: textActive }">{{ profile.last_name }}</div>
                            <input type="text" class="form-control input-edit" v-bind:class="{ active: inputActive }" v-model="profile.last_name">
                        </div>
                    </div>
                    <div class="row">
                       <div class="col-md-6">
                        <label>{{$t('attribute.email')}}:</label>
                        <div class="text-edit" v-bind:class="{ active: textActive }">{{ profile.email }}</div>
                        <input type="text" class="form-control input-edit" v-bind:class="{ active: inputActive }" v-model="profile.email">
                    </div>
                    <div class="col-md-6">
                        <label>{{$t('attribute.birth')}}:</label>
                        <div class="text-edit" v-bind:class="{ active: textActive }">{{ profile.birth_date }}</div>
                        <input type="date" class="form-control input-edit" v-bind:class="{ active: inputActive }" v-model="profile.birth_date">
                    </div>
                </div>
                <div class="row">
                   <div class="col-md-6" id="gender">
                    <label>{{$t('attribute.gender')}}:</label>
                    <div class="text-edit" v-bind:class="{ active: textActive }">{{ profile.gender }}</div>

                    <div class="form-group">
                        <label class="input-edit"  v-bind:class="{ active: inputActive }"><input type="radio" value="MALE" v-model="profile.gender" required>{{$tc('enum.gender',1)}}</label>
                        <label class="input-edit"  v-bind:class="{ active: inputActive }"><input type="radio" value="FEMALE" v-model="profile.gender" required>{{$tc('enum.gender',0)}}</label>
                        <label class="input-edit"  v-bind:class="{ active: inputActive }"><input type="radio" value="UNINFORMED" v-model="profile.gender" required>{{$tc('enum.gender',2)}}</label>
                    </div>
                </div>
                <div class="col-md-6">
                    <label>{{$t('attribute.theme')}}:</label>
                    <div class="text-edit" v-bind:style="{ background: profile.theme }" id="theme-label" v-bind:class="{ active: textActive }"></div>

                    <input class="input-edit" type="color" id="theme" v-bind:value="profile.theme" v-on:change="changeColor()" v-bind:class="{ active: inputActive }">
                </div>
            </div>
            <div class="row">
               <div class="col-md-6">
                <label>{{$t('attribute.phone')}}:</label>
                <div class="text-edit" v-bind:class="{ active: textActive }">{{ profile.phone }}</div>
                <the-mask :mask="['(##) # ####-####', '(##) ####-####']" class="form-control input-edit" v-bind:class="{ active: inputActive }" v-model="profile.phone"/>
            </div>
            <div class="col-md-6">
                <label>{{$t('attribute.zipcode')}}:</label>
                <div class="text-edit" v-bind:class="{ active: textActive }">{{ profile.zipcode }}</div>
                <input type="text" class="form-control input-edit" v-bind:class="{ active: inputActive }" v-on:change="getZipCode(profile.zipcode)" v-model="profile.zipcode">
            </div>
        </div>
        <div class="row">
            <div class="col-md-4">
                <label>{{$t('attribute.country')}}:</label>
                <div class="text-edit" v-bind:class="{ active: textActive }" v-model="profile.country">{{ profile.country }}</div>
                <div class="form-group input-edit" v-bind:class="{ active: inputActive }">
                    <select class="form-control" v-model="profileCountryName" v-on:change="getStates">
                        <input type="text" class="form-control" v-model="search">
                        <option value="" disabled>{{$tc('prompt.select',0)}}:</option>
                        <option v-for="country in countries">{{ country.name }}</option>
                    </select>
                </div>
            </div>
            <div class="col-md-4">
                <label>{{$t('attribute.state')}}:</label>
                <div class="text-edit" v-bind:class="{ active: textActive }">{{ profile.state }}</div>
                <!-- <input type="text" class="form-control input-edit" v-bind:class="{ active: inputActive }" v-model="profile.state"> -->
                <div class="form-group input-edit" v-bind:class="{ active: inputActive }">
                    <select class="form-control" v-model="profileStateName" v-on:change="getCities">
                        <!-- <input type="text" class="form-control" v-model="search"> -->
                        <option value="" disabled>{{$tc('prompt.select',0)}}:</option>
                        <option v-for="state in states">{{ state.name }}</option>
                    </select>
                </div>
            </div>
            <div class="col-md-4">
                <label>{{$t('attribute.city')}}:</label>
                <div class="text-edit" v-bind:class="{ active: textActive }">{{ profile.city }}</div>
                <!-- <input type="text" class="form-control input-edit" v-bind:class="{ active: inputActive }" v-model="profile.city"> -->
                <div class="form-group input-edit" v-bind:class="{ active: inputActive }">
                    <select class="form-control" v-model="profileCityName">
                        <input type="text" class="form-control" v-model="search">
                        <option value="" disabled>{{$tc('prompt.select',0)}}:</option>
                        <option v-for="city in cities">{{ city.name }}</option>
                    </select>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-md-6">
                <label>{{$t('attribute.address1')}}:</label>
                <div class="text-edit" v-bind:class="{ active: textActive }">{{ profile.address_line_1 }}</div>
                <input type="text" class="form-control input-edit" v-bind:class="{ active: inputActive }" v-model="profile.address_line_1">
            </div>
            <div class="col-md-6">
                <label>{{$t('attribute.address2')}}</label>
                <div class="text-edit" v-bind:class="{ active: textActive }">{{ profile.address_line_2 }}</div>
                <input type="text" class="form-control input-edit" v-bind:class="{ active: inputActive }" v-model="profile.address_line_2">
            </div>
        </div>

        <div v-if="notifications">
            <hr>
            <div class="row">
                <div class="col-md-12">
                    <h4>{{$tc('attribute.notification',2)}}</h4>
                </div>
            </div>
                            <!-- <div class="row">
                                <div class="col-md-12">
                                    <div class="form-group">
                                        <label>Affiliate:</label>
                                        <select class="form-control" v-model="affiliateToGetNotification" v-on:change="getNotificationConfiguration(affiliateToGetNotification)" required>
                                            <option disabled value="" selected>{{$tc('prompt.select',0)}}:</option>
                                            <option v-for="affiliate in affiliates" v-bind:value="affiliate.id">{{ affiliate.name }}</option>
                                        </select>
                                    </div>
                                </div>
                            </div> -->
                            <div class="row">
                                <div class="col-md-12 table-responsive" style="max-height: 400px;">
                                    <table class="table table-striped table-hover">
                                        <thead>
                                            <tr>
                                                <th>{{$tc('attribute.notification',1)}}</th>
                                                <th>{{$t('attribute.permission')}}</th>
                                                <th>{{$t('button.save')}}</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="conf in notification_configuration">
                                                <td>{{ conf.name }}</td>
                                                <td><label><input type="checkbox" v-model="conf.allowed"> {{ conf.allowed }}</label></td>
                                                <td><button class="btn btn-sm" v-on:click="putNotificationConfiguration"><i class="fa fa-floppy-o fa-lg" aria-hidden="true"></i></button></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <modal name="attention" :adaptive="true" :width="400" :height="100">
                <div class="modal-example">
                    <center><h4>{{$t('info.save')}} &nbsp;&nbsp;<i class="fa fa-exclamation-triangle" aria-hidden="true" style="color: #e67e22;"></i></h4></center>
                </div>
            </modal>

            <modal name="success" :adaptive="true" :width="400" :height="100">
                <div class="modal-example">
                    <center><h4>{{$t('info.success')}} &nbsp;&nbsp;<i class="fa fa-smile-o" aria-hidden="true" style="color: #27ae60;"></i></h4></center>
                </div>
            </modal>

        </div>
    </transition>
</template>

<script src="./Profile.js"></script>


<style scoped>

.modal-example{
    padding: 20px;
}

#theme-label{
    width: 100%;
    height: 100%;
    padding: 10px;
    max-width: 150px;
    max-height: 20px;
    border-radius: 2px;
}

.input-edit, .text-edit{
    display: none;
    margin-bottom: 0;
}

.btn-edit, .btn-save, .btn-cancel{
    display: none;
}

.active, .btnActive{
    display: block;
}

#box-information{
    border: 1px solid #eee;
    padding: 20px;
    border-radius: 5px;
    margin-left: 20px;
}

.col-md-6, .col-md-4{
    margin-bottom: 20px;
    border-right: 1px solid rgba(0,0,0,0.2);
}

#gender{
    margin-bottom: 0;
}

#profile_picture{
    /* height: 100%;
    width: 100%; */
    max-height: 200px;
    max-width: 200px;
    border-radius: 10px;
}

.modal-example{
  padding: 20px;
}


.fade-enter-active, .fade-leave-active {
  transition: opacity 1s
}
.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
  opacity: 0
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