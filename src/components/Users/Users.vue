<template>
	<transition name="slide-fade" mode="out-in">
		<!-- Page Content -->
		<div id="page-content-layout">
			<div class="container-fluid container-content">
				<div class="row">
					<div class="col-md-12">
						<h3>{{$tc('entity.user',2)}}</h3>
						<br>
					</div>
				</div>

				<vue-tabs>
					<v-tab v-bind:title="getKey('tab.registration')" style="margin-top: 40px;">
						<div class="row">
							<div class="col-md-12">
								<h4>{{$t('tab.new')}} {{$tc('entity.user',1)}}</h4>
							</div>
						</div>
						<div class="row">
							<div class="col-md-6">
								<div class="form-group">
									<label>{{$t('attribute.fname')}}:</label>
									<input type="text" class="form-control" v-model="user.profile.first_name" required>
								</div>
							</div>
							<div class="col-md-6">
								<div class="form-group">
									<label>{{$t('attribute.lname')}}:</label>
									<input type="text" class="form-control" v-model="user.profile.last_name" required>
								</div>
							</div>
						</div>
						<div class="row">
							<div class="col-md-6">
								<div class="form-group">
									<label>{{$t('attribute.gender')}}:</label><br>
									<label class="radio-inline"><input type="radio"  value="MALE" v-model="user.profile.gender" required> {{$tc('enum.gender',1)}}</label>
									<label class="radio-inline"><input type="radio" value="FEMALE" v-model="user.profile.gender" required> {{$tc('enum.gender',0)}}</label>
									<label class="radio-inline"><input type="radio" value="UNINFORMED" v-model="user.profile.gender" required> {{$tc('enum.gender',2)}}</label>
								</div>
							</div>
							<div class="col-md-6">
								<div class="form-group">
									<label>{{$t('attribute.email')}}:</label>
									<input type="email" class="form-control" v-model="user.profile.email" required>
								</div>
							</div>
						</div>
						<div class="row">
							<div class="col-md-6">
								<div class="form-group">
									<label>{{$t('attribute.username')}}:</label><br>
									<label class="checkbox-inline"><input type="checkbox" v-model="generateUsernameAutomatically" required> {{$t('prompt.generateAutomatically')}}</label>
									<input type="text" class="form-control" v-model="user.profile.username" :disabled="generateUsernameAutomatically">
								</div>
							</div>
						</div>
						<div class="alert alert-warning" role="alert" v-if="this.errorObject != undefined">
							<center>
								<div class="row">
									<div class="col-md-12">
										{{ this.errorObject.message }}
									</div>
								</div>
								<div class="row">
									<div class="col-md-12" v-if="this.errorObject.details != undefined">
										{{ this.errorObject.details }}
									</div>
								</div>
							</center>
						</div>
						<hr>

						<div class="row">
							<div class="col-md-4">
								<div class="form-group">
									<label>{{$t('attribute.role')}}:</label>
									<select class="form-control" v-model="role_id">
										<option disabled value="" selected>{{$tc('prompt.select',0)}}:</option>
										<option v-for="role in roles" v-bind:value="role.role_id">{{ role.role_id }}</option>
									</select>
								</div>
							</div>
							<div class="col-md-1">
								<button class="btn btn-sm btn-success" style="margin-top: 35px; border-radius: 100%;" v-on:click="addNewAffiliate(affiliate)">+</button>
							</div>

							<modal name="selectAnAffiliate" :adaptive="true" :width="250" :height="'auto'" :pivotY="0.3">
								<div class="modal-example">
									<center><h4>{{$t('info.validation')}}</h4></center><br>
								</div>
							</modal>
							<modal name="selectRole" :adaptive="true" :width="250" :height="'auto'" :pivotY="0.3">
								<div class="modal-example">
									<center><h4>{{$t('info.validation')}}</h4></center><br>
								</div>
							</modal>
						</div>
						<div class="row">
							<div class="col-md-12">
								<ol style="margin-left: 15px;">
									<li v-for="(l, index) in list" style="margin-bottom: 10px;">
										{{ l.affiliate }} - {{ l.role }}
										<button v-on:click="user.affiliates.splice(index, 1), list.splice(index, 1)" style="border: none; background: none; color: #e74c3c; margin-left: 5px;"><i class="fa fa-trash"></i></button>

									</li>
								</ol>
							</div>
						</div>
						<div v-show="isParent()">
							<div class="row">
								<div class="col-md-12">
									<h4>{{$t('attribute.children')}}</h4>
								</div>
							</div>
							<div class="row">
								<div class="col-md-4">
									<div class="form-group">
										<select class="form-control" v-model="children">
											<option disabled value="" selected>{{$tc('prompt.select',0)}}:</option>
											<option v-for="student in students" v-bind:value="student">{{ student.name }}</option>
										</select>
									</div>
								</div>
								<div class="col-md-1">
									<button class="btn btn-sm btn-success" style="margin-top: 35px; border-radius: 100%;" v-on:click="addChild()">+</button>
								</div>
							</div>
							<div class="row">
								<div class="col-md-12">
									<ol style="margin-left: 15px;">
										<li v-for="(child, index) in children_list" style="margin-bottom: 10px;">
											{{ child.name }}
											<button v-on:click="children_list.splice(index, 1)" style="border: none; background: none; color: #e74c3c; margin-left: 5px;"><i class="fa fa-trash"></i></button>
										</li>
									</ol>
								</div>
							</div>
						</div>
						<div class="row">
							<div class="col-md-12">
								<button class="btn btn-default btn-success btn-sm" style="float:right;" v-on:click="postUser">{{$t('button.save')}}</button>
							</div>
						</div>
						<hr>

						<modal name="success" :adaptive="true" :height="'auto'" :pivotY="0.4">
							<div class="modal-example">
								<center><h4>{{$t('info.success')}}</h4></center><br>
							</div>
						</modal>
					</v-tab>

					<v-tab v-bind:title="getKey('tab.import')" style="margin-top: 40px;">
						<div class="row">
							<div class="col-md-12">
								<h4>{{$t('title.import')}}</h4>
							</div>
						</div>
						<div class="row">
							<div class="col-md-6">
								<label>{{$t('description.template')}} <a href="https://www.dropbox.com/s/raeekqce1v6gx0q/users.csv?dl=0" target="_blank" download>{{$t('button.template')}}</a></label>
								<input class="form-control" type="file" id="inputFile" v-on:change="csvFromInput">
							</div>
							<div class="col">
								<label>{{$t('attribute.role')}}:</label>
								<select class="form-control" v-model="batchData.role">
									<option disabled value="" selected>{{$tc('prompt.select',0)}}:</option>
									<option v-for="role in roles" v-bind:value="role.role_id">{{ role.role_id }}</option>
								</select>
							</div>
							<div class="col-md-1">
								<button class="btn btn-info btn-sm pull-right" style="margin-top: 35px;" v-on:click="postAddUserList">{{$t('button.upload')}}</button>
							</div>
						</div>
						<br>
						<div class="row" v-if="batchData.user_profiles.length !== 0">
							<div class="col table-responsive">
								<table class="table table-hover">
									<thead>
										<tr>
											<th>First name</th>
											<th>Last name</th>
											<th>Email</th>
											<th>Password</th>
											<th>Username</th>
											<th>Phone</th>
											<th>Address line 1</th>
											<th>Address line 2</th>
											<th>City</th>
											<th>State</th>
											<th>Country</th>
											<th>Zipcode</th>
											<th style="white-space: nowrap;">Birth date</th>
											<th>RG</th>
											<th>CPF</th>
											<th>Gender</th>
										</tr>
									</thead>
									<tbody>
										<tr v-for="item in batchData.user_profiles">
											<td>{{ item.first_name }}</td>
											<td>{{ item.last_name }}</td>
											<td>{{ item.email }}</td>
											<td>{{ item.password }}</td>
											<td>{{ item.username }}</td>
											<td>{{ item.phone }}</td>
											<td>{{ item.address_line_1 }}</td>
											<td>{{ item.address_line_2 }}</td>
											<td>{{ item.city }}</td>
											<td>{{ item.state }}</td>
											<td>{{ item.country }}</td>
											<td>{{ item.zipcode }}</td>
											<td>{{ item.birth_date }}</td>
											<td>{{ item.rg }}</td>
											<td>{{ item.cpf }}</td>
											<td>{{ item.gender }}</td>
										</tr>
									</tbody>
								</table>
							</div>
						</div>
						<div class="alert alert-success" style="margin-top: 20px;" role="alert" v-if="batchMessages.success.length > 0">
							<center>
								<div class="row">
									<div class="col-md-10"></div>
									<div class="col-md-2">
										Clear all
										<button class="pull-right alert-success" style="background: none; border: none;" v-on:click="clearAllBatchSuccessMessages()">
											<i class="fa fa-times-circle"></i>
										</button>
									</div>
								</div>
								<hr>
								<div class="row" v-for="(message, i) in batchMessages.success">
									<div class="col-md-12">
										<label v-html="message"></label>
										<button class="pull-right alert-success" style="background: none; border: none;" v-on:click="deleteBatchSuccessMessage(i)">
											<i class="fa fa-times-circle"></i>
										</button>
										<hr v-if="i < batchMessages.success.length-1" />
									</div>
								</div>
							</center>
						</div>
						<div class="alert alert-danger" style="margin-top: 20px;" role="alert" v-if="batchMessages.failure.length > 0">
							<center>
								<div class="row">
									<div class="col-md-10"></div>
									<div class="col-md-2">
										Clear all
										<button class="pull-right alert-danger" style="background: none; border: none;" v-on:click="clearAllBatchFailureMessages()">
											<i class="fa fa-times-circle"></i>
										</button>
									</div>
								</div>
								<hr>
								<div class="row" v-for="(message, i) in batchMessages.failure">
									<div class="col-md-12">
										<label v-html="message"></label>
										<button class="pull-right alert-danger" style="background: none; border: none;" v-on:click="deleteBatchFailureMessage(i)">
											<i class="fa fa-times-circle"></i>
										</button>
										<hr v-if="i < batchMessages.failure.length-1" />
									</div>
								</div>
							</center>
						</div>
					</v-tab>

					<v-tab v-bind:title="getKey('tab.saved')" style="margin-top: 10px;">
						<v-client-table :columns="columns" :data="data" :options="options">
							<button slot="edit" slot-scope="props" class="btn btn-info btn-sm" v-on:click="showModal('edit', props.row.id)"><i class="fa fa-pencil" aria-hidden="true"></i></button>
							<button slot="delete" slot-scope="props" class="btn btn-danger btn-sm" v-on:click="showModal('delete', props.row.id)"><i class="fa fa-trash" aria-hidden="true"></i></button>
						</v-client-table>

						<modal name="edit" :adaptive="true" :height="'auto'" :width="800" :pivotY="0.3" scrollable>
							<div class="modal-example">
								<center v-if="selected_user.hasOwnProperty('name')"><h4>{{$t('info.updating')}} {{$tc('entity.user',0)}}</h4></center>
								<hr>
								<div class="row">
									<div class="col-md-6">
										<div class="form-group">
										{{$t('attribute.fname')}}</button>
										<input type="text" class="form-control" required v-model="selected_profile.first_name">
									</div>
								</div>
								<div class="col-md-6">
									<div class="form-group">
										<label>{{$t('attribute.lname')}}:</label>
										<input type="text" class="form-control" required v-model="selected_profile.last_name">
									</div>
								</div>
							</div>
							<div class="row">
								<div class="col-md-6">
									<div class="form-group">
										<label>{{$t('attribute.email')}}:</label>
										<input type="email" class="form-control" required v-model="selected_profile.email" disabled>
									</div>
								</div>
								<div class="col-md-6">
									<div class="form-group">
										<label>{{$t('attribute.gender')}}:</label><br>
										<label class="radio-inline"><input type="radio"  value="MALE" required v-model="selected_profile.gender">{{$tc('enum.gender',1)}}</label>
										<label class="radio-inline"><input type="radio" value="FEMALE" required v-model="selected_profile.gender">{{$tc('enum.gender',0)}}</label>
										<label class="radio-inline"><input type="radio" value="UNINFORMED" required v-model="selected_profile.gender">{{$tc('enum.gender',2)}}</label>
									</div>
								</div>
							</div>

							<div class="row">
								<div class="col-md-4">
									<div class="form-group">
										<label>{{$t('attribute.role')}}:</label>
										<select class="form-control" v-model="role_id">
											<option disabled value="" selected>{{$tc('prompt.select',0)}}:</option>
											<option v-for="role in roles" v-bind:value="role.role_id">{{ role.role_id }}</option>
										</select>
									</div>
								</div>

								<div class="col-md-1">
									<button class="btn btn-sm btn-success" style="margin-top: 35px; border-radius: 100%;" v-on:click="updateAffiliates()">+</button>
								</div>
							</div>
							<div class="row">
								<div class="col-md-12">
									<ol style="margin-left: 15px;">
										<li v-for="(affiliate, index) in selected_user.affiliates" style="margin-bottom: 10px;">

											{{ affiliate.affiliate_name }} - {{ affiliate.role_id }}

											<button v-on:click="selected_user.affiliates.splice(index, 1)" style="border: none; background: none; color: #e74c3c; margin-left: 5px;"><i class="fa fa-trash"></i></button>
										</li>
									</ol>
								</div>
							</div>
							<div v-show="isParentEdit()">
								<div class="row">
									<div class="col-md-12">
										<h4>{{$t('attribute.children')}}</h4>
									</div>
								</div>
								<div class="row">
									<div class="col-md-4">
										<div class="form-group">
											<select class="form-control" v-model="children">
												<option disabled value="" selected>{{$tc('prompt.select',0)}}:</option>
												<option v-for="student in students" v-bind:value="student">{{ student.name }}</option>
											</select>
										</div>
									</div>
									<div class="col-md-1">
										<button class="btn btn-sm btn-success" style="margin-top: 35px; border-radius: 100%;" v-on:click="addChildEdit()">+</button>
									</div>
								</div>
								<div class="row">
									<div class="col-md-12">
										<ol style="margin-left: 15px;">
											<li v-for="(child, index) in selected_children_list" style="margin-bottom: 10px;">
												{{ child.name }}
												<button v-on:click="selected_children_list.splice(index, 1)" style="border: none; background: none; color: #e74c3c; margin-left: 5px;"><i class="fa fa-trash"></i></button>
											</li>
										</ol>
									</div>
								</div>
							</div>
							<br>
							<div class="row">
								<div class="col-md-12">
									<button class="btn btn-default btn-sm btn-success" v-on:click="save()" style="float: right;">{{$t('button.save')}}</button>
								</div>
							</div>
						</div>
					</modal>

					<modal name="delete" :adaptive="true" :width="400" :height="'auto'" :pivotY="0.4">
						<div class="modal-example">
							<h4>{{$t('prompt.confirmation')}}</h4><br>
							<button class="btn btn-default btn-sm btn-danger pull-right" v-on:click="deleteUser(selected_user.id)" style="margin-bottom: 15px;"><i class="fa fa-trash" aria-hidden="true"></i>&nbsp;&nbsp;{{$t('button.delete')}}</button>
						</div>
					</modal>


				</v-tab>
			</vue-tabs>

			<modal name="alert" :adaptive="true" :width="400" :height="'auto'" :pivotY="0.4">
				<div class="modal-example">
					<h4>{{$t('info.validation')}}</h4><br>
				</div>
			</modal>

			<modal name="success" :adaptive="true" :height="'auto'" :pivotY="0.4">
				<div class="modal-example">
					<center><h4>{{$t('info.success')}}</h4></center><br>
				</div>
			</modal>

			<modal name="server_error_message" :adaptive="true" :height="'auto'" :pivotY="0.4">
				<div class="modal-example">
					<center><h4>{{ this.error }}</h4></center><br>
				</div>
			</modal>

		</div>
	</div>
</transition>
</template>

<script src="./Users.js"></script>


<style scoped>

input[type="radio"], input[type="checkbox"]{
	margin-left: 10px;
}

.input-sm{
	display: initial;
	width: 20%;
	font-size: 10pt;
}

#table::-webkit-scrollbar-track {
	background-color: transparent;
}
#table::-webkit-scrollbar {
	width: 3px;
	background: transparent;
}
#table::-webkit-scrollbar-thumb {
	background: #dad7d7;
}

li:hover{
	cursor: pointer;
}

.input-edit, .text-edit{
	display: none;
	margin-bottom: 0;
}

.active, .btnActive{
	display: block;
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
