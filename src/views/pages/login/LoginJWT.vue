<template>
  <div>
    <ValidationObserver v-slot="errors">
      <ValidationProvider v-slot="v" name="email"
                          rules="required"
      >
        <vs-input
          data-vv-validate-on="blur"
          name="email"
          icon-no-border
          icon="icon icon-user"
          icon-pack="feather"
          label-placeholder="Email"
          v-model="email"
          :success=" !v.errors[0] ? true : false "
          :danger=" v.errors[0] ? true : false"
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
          :success=" !v.errors[0] ? true : false "
          :danger=" v.errors[0] ? true : false "
          label-placeholder="Password"
          v-model="password"
          class="w-full mt-6"/>
        <span class="text-danger text-sm">{{ v.errors[0] }}</span>
      </ValidationProvider>
    </ValidationObserver>


    <div class="flex flex-wrap justify-between my-5">
      <vs-checkbox v-model="checkbox_remember_me" class="mb-3">Remember Me</vs-checkbox>
      <router-link to="/pages/forgot-password">Forgot Password?</router-link>
    </div>
    <div class="flex flex-wrap justify-between mb-3">
      <vs-button type="border" @click="registerUser">Register</vs-button>
      <vs-button :disabled="!validateForm || isLoading" id="loginButton" class="vs-con-loading__container" @click="continueLogin">
        Login
      </vs-button>
    </div>
  </div>
</template>

<script>
  import {mapActions} from "vuex";

  export default {
    data() {
      return {
        email: 'admin@admin.com',
        password: 'adminadmin',
        checkbox_remember_me: false,
        isLoading: false,
      }
    },
    computed: {
      validateForm() {
        return this.email != '' && this.password != '';
      },
    },
    methods: {
      ...mapActions('auth', [
        'login'
      ]),
      continueLogin() {
        let vm = this;
        vm.isLoading = true;
        vm.setLoadingContent('loginButton');
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

