<template>
  <div>
    <div class="vx-col w-full mb-base vs-con-loading__container" id="userDetails">
      {{ user}}
      <vx-card>


        <ValidationObserver ref="form" v-slot="errors">
          {{setAllErrors(errors.errors)}}


          <div class="vx-row mb-2">

            <div class="vx-col w-1/2">
              <ValidationProvider v-slot="v" name="Username"
                                  :rules="{'required':true}">
                <vs-input
                  class="w-full"
                  icon-pack="feather"
                  icon="icon-user"
                  icon-no-border
                  val-icon-success="done"
                  val-icon-danger="close"
                  val-icon-warning="warning"
                  :label-placeholder="$t('Username')"
                  v-model="user.login"
                  :success=" !v.errors[0] ? true : false"
                  :danger=" v.errors[0] ? true : false"/>
                <span class="text-danger text-sm">{{ v.errors[0] }}</span>
              </ValidationProvider>
            </div>
            <div class="vx-col w-1/2">
              <ValidationProvider v-slot="v" name="first_name"
                                  :rules="{'required':true}">
                <vs-input
                  class="w-full"
                  icon-pack="feather"
                  icon="icon-user"
                  icon-no-border
                  val-icon-success="done"
                  val-icon-danger="close"
                  val-icon-warning="warning"
                  :label-placeholder="$t('user.first_name')"
                  v-model="user.first_name"
                  :success=" !v.errors[0] ? true : false"
                  :danger=" v.errors[0] ? true : false"/>
                <span class="text-danger text-sm">{{ v.errors[0] }}</span>
              </ValidationProvider>
            </div>

          </div>
          <div class="vx-row mb-2">

            <div class="vx-col w-1/2">
              <ValidationProvider v-slot="v" name="last_name"
                                  :rules="{'required':true}">
                <vs-input
                  class="w-full"
                  icon-pack="feather"
                  icon="icon-user"
                  icon-no-border
                  val-icon-success="done"
                  val-icon-danger="close"
                  val-icon-warning="warning"
                  :label-placeholder="$t('user.last_name')"
                  v-model="user.last_name"
                  :success=" !v.errors[0] ? true : false"
                  :danger=" v.errors[0] ? true : false"/>
                <span class="text-danger text-sm">{{ v.errors[0] }}</span>
              </ValidationProvider>
            </div>
            <div class="vx-col w-1/2">
              <vs-select
                :placeholder="$t('Roles')"
                multiple
                autocomplete
                class="selectExample"
                :label="$t('Roles')"
                v-model="user.roles"
              >
                <vs-select-item :key="index" :value="item" :text="item" v-for="(item,index) in roleList" />
              </vs-select>
            </div>

          </div>
          <div class="vx-row mb-2">

            <div class="vx-col w-1/2">
              <ValidationProvider v-slot="v" name="password"
                                  rules="required|confirmed:confirm_password">
                <vs-input
                  class="w-full"
                  icon-pack="feather"
                  icon="icon-lock"
                  icon-no-border
                  val-icon-success="done"
                  val-icon-danger="close"
                  val-icon-warning="warning"
                  :label-placeholder="$t('Password')"
                  v-model="user.password"
                  :success=" (!v.errors[0] ? true : false) && user.password !== null && user.password !== ''"
                  :danger=" (v.errors[0] ? true : false)|| user.password === null || user.password === ''"/>
                <span class="text-danger text-sm">{{ v.errors[0] }}</span>
              </ValidationProvider>
            </div>
            <div class="vx-col w-1/2">
              <ValidationProvider v-slot="v" name="confirm_password"
                                  rules="required|confirmed:password">
                <vs-input
                  class="w-full"
                  icon-pack="feather"
                  icon="icon-lock"
                  icon-no-border
                  val-icon-success="done"
                  val-icon-danger="close"
                  val-icon-warning="warning"
                  :label-placeholder="$t('Repeat password')"
                  v-model="user.confirm_password"
                  :success=" (!v.errors[0] ? true : false) && user.confirm_password !== null && user.confirm_password !== ''"
                  :danger=" (v.errors[0] ? true : false) || user.confirm_password === null || user.confirm_password === ''"/>
                <span class="text-danger text-sm">{{ v.errors[0] }}</span>
              </ValidationProvider>
            </div>


          </div>
        </ValidationObserver>
      </vx-card>

    </div>
    <div class="vx-col w-full mb-base">
      <vx-card>
        <vs-button class="mr-3 mb-2 float-right" @click="save()">{{$t('actions.update')}}</vs-button>
        <vs-button color="warning" type="border" class="mb-2">{{$t('actions.back')}}
        </vs-button>
      </vx-card>
    </div>

  </div>
</template>
<script>
  import CrudService from "../../../services/crud.service";
  import RoleService from "../../../services/role.service";

  export default {
    name: "edit",
    data() {
      return {
        user: {
          id:null,
          login:"",
          first_name:"",
          last_name:"",
          password:"",
          status:1,
          department_id:1,
          confirm_password:"",
          roles:[]
        },
        roleList:[],
        allErrors: null,
      }
    },
    methods: {
     async  save(){
       let vm = this;
        let obj = {}
        obj.AdminUsers = this.user;
        await CrudService.update('user',obj).then(response => {
          if(response.data === true){
            vm.makeToast(vm.$t('actions.messages.update_success'),vm.$t('actions.success'),'success');
            setTimeout(() => {
              this.$router.push('/admin/users').catch(() => {})
            }, 1000);
          }else{
            vm.makeToast(vm.$t('actions.messages.all_field_required'),vm.$t('actions.error'),'danger');
          }

        });
      },
      setAllErrors(errors) {
        this.allErrors = errors;
      },
      async getUser() {
       if(this.$route.params.id){
         await CrudService.get('user', this.$route.params.id).then(response => {
           this.user = response.data;
         });
       }

      },
      async getRoleList(){
       await RoleService.list().then(response => {
         this.roleList = response.data
       })
      }
    },
    async mounted() {
      await this.getUser();
      await this.getRoleList();
    },
    beforeMount() {
      if(this.$route.params.id){
        this.$route.meta.breadcrumb[this.$route.meta.breadcrumb.length-1].title = this.$route.params.id;
      }



    },
    computed:{
      formValid(){
        let valid = false;
        for (const [key, value] of Object.entries(this.allErrors)) {
          if(value.length === 0){
            valid = true;
          }else{
            valid = false;
          }
        }
        return valid;
      }
    }
  }
</script>
<style scoped>
  .con-select{
    width: 100% !important;
  }
</style>
