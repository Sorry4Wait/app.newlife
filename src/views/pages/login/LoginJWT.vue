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
      <vs-button :disabled="!validateForm" @click="loginJWT">Login</vs-button>
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
      makeToast(message, title, color) {
        this.$vs.notify({
          title: title,
          text: message,
          iconPack: 'feather',
          icon: 'icon-alert-circle',
          color: color,
          position: 'top-right'
        })
      },
      checkLogin() {
        let vm = this;

        vm.login({username: vm.email, password: vm.password}).then(response => {
          if(!response){
            vm.makeToast('Неправильное имя пользователя или пароль.', vm.$t('actions.error'), 'danger');
          }

        }).catch(e => {
          let response = JSON.parse(e.request.response);
          vm.makeToast(response.error, vm.$t('actions.error'), 'danger')

        }).finally(() => {
          vm.isLoading = false;
        });
      },
      loginJWT() {

        if (!this.checkLogin()) return

        // Loading
        this.$vs.loading()

        const payload = {
          checkbox_remember_me: this.checkbox_remember_me,
          userDetails: {
            email: this.email,
            password: this.password
          }
        }

        this.$store.dispatch('auth/loginJWT', payload)
          .then(() => {
            this.$vs.loading.close()
          })
          .catch(error => {
            this.$vs.loading.close()
            this.$vs.notify({
              title: 'Error',
              text: error.message,
              iconPack: 'feather',
              icon: 'icon-alert-circle',
              color: 'danger'
            })
          })
      },
      registerUser() {
        // if (!this.checkLogin()) return
        // this.$router.push('/pages/register').catch(() => {
        // })
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

