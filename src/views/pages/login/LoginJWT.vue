<template>
  <div>
    <ValidationObserver v-slot="errors">
      <ValidationProvider v-slot="v" name="email"
                          rules="required"
      >
        <vs-input
          data-vv-validate-on="blur"
          icon-no-border
          icon="icon icon-user"
          icon-pack="feather"
          val-icon-success="done"
          val-icon-danger="close"
          val-icon-warning="warning"
          :label-placeholder="$t('Username')"
          v-model="email"
          :success=" (!v.errors[0] ? true : false) && validateForm"
          :danger=" (v.errors[0] ? true : false) || !validateForm"
          class="w-full"/>
        <span class="text-danger text-sm">{{ v.errors[0] }}</span>
      </ValidationProvider>
      <br>

      <ValidationProvider v-slot="v" name="password"
                          rules="required|min:2|max:10">
        <vs-input
          data-vv-validate-on="blur"
          type="password"
          name="password"
          icon-no-border
          icon="icon icon-lock"
          icon-pack="feather"
          val-icon-success="done"
          val-icon-danger="close"
          val-icon-warning="warning"
          :success=" (!v.errors[0] ? true : false) && validateForm"
          :danger=" (v.errors[0] ? true : false) || !validateForm"
          :label-placeholder="$t('Password')"
          v-model="password"
          class="w-full mt-6"/>
        <span class="text-danger text-sm">{{ v.errors[0] }}</span>
      </ValidationProvider>
    </ValidationObserver>


    <div class="flex flex-wrap justify-between my-5">
      <vs-checkbox v-model="checkbox_remember_me" class="mb-3">{{$t('Remember Me')}}</vs-checkbox>
      <router-link to="/pages/forgot-password">{{$t('Forgot password?')}}</router-link>
    </div>
    <div class="flex flex-wrap justify-between mb-3">
      <vs-button type="border" @click="registerUser">{{$t('Registration')}}</vs-button>
      <vs-button :disabled="!validateForm || isLoading" id="loginButton" class="vs-con-loading__container" @click="continueLogin">
        {{$t('actions.login')}}
      </vs-button>
    </div>
  </div>
</template>

<script>
  import {mapActions} from "vuex";

  export default {
    data() {
      return {
        email: '',
        password: '',
        checkbox_remember_me: true,
        isLoading: false,
      }
    },
    computed: {
      validateForm() {
        return this.email !=='' && this.password !== '' && this.email !== null && this.password !== null;
      },
    },
    methods: {
      ...mapActions('auth', [
        'login'
      ]),
      continueLogin() {
        let vm = this;
        vm.isLoading = true;
        vm.setLoadingButton('loginButton');
        this.login({username: this.email, password: this.password}).then(response => {
          if (!response) {
            vm.makeToast('Неправильное имя пользователя или пароль.', vm.$t('actions.error'), 'danger');
          }

        }).finally(() => {
          vm.stopLoadingContent('loginButton');
          vm.isLoading = false;
        });
      },
      registerUser() {
      }
    }
  }

</script>
<style lang="css" scoped>
  pre {
    width: 100%;
    color: rgba(255, 255, 255, .8);
  }
</style>

