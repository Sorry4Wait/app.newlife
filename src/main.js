import Vue from 'vue'
import App from './App.vue'

// PrismJS
import 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'

// Theme Configurations
import '../themeConfig.js'
// Vuesax Component Framework
import Vuesax from 'vuesax'
import 'material-icons/iconfont/material-icons.css' //Material Icons
import 'vuesax/dist/vuesax.css'; // Vuesax
Vue.use(Vuesax);

//Services
import ApiService from "./services/api.service";
// Firebase
import '@/firebase/firebaseConfig'
// Globally Registered Components
import './globalComponents.js'
// Styles: SCSS
import './assets/scss/main.scss'
// Tailwind
import '@/assets/css/main.css'
// Vue Router
import router from './router'


// Vuex Store
import store from './store/store'


// i18n
import i18n from './lang/lang'


// Vuexy Admin Filters
import './filters/filters'


import {abilitiesPlugin} from '@casl/vue'
import {ability} from "./store/store";

/* FOR MANAGING USER PERMISSIONS */
Vue.use(abilitiesPlugin, ability);


// VeeValidate
import {ValidationProvider,ValidationObserver} from 'vee-validate'
Vue.component('ValidationProvider', ValidationProvider);
Vue.component('ValidationObserver', ValidationObserver);
import {extend} from 'vee-validate';
import { required } from 'vee-validate/dist/rules';
import { confirmed } from 'vee-validate/dist/rules';
import { integer } from 'vee-validate/dist/rules';
import { regex } from 'vee-validate/dist/rules';
import { min } from 'vee-validate/dist/rules';
import { max } from 'vee-validate/dist/rules';
import { email } from 'vee-validate/dist/rules';
extend('required', {
  ...required,
  //+ values._field_
  message: (_, values) => i18n.t('validator.required',TokenService.getLocale())
});
extend('email', {
  ...email,
  //+ values._field_
  message: (_, values) => i18n.t('validator.email',TokenService.getLocale())
});
extend('regex', {
  ...regex,
  //+ values._field_
  message: (_, values) => i18n.t('validator.regex',TokenService.getLocale())
});
extend('integer', {
  ...integer,
  //+ values._field_
  message: (_, values) => i18n.t('validator.integer',TokenService.getLocale())
});
extend('min', {
  ...min,
  //+ values._field_
  message: (_, values) => i18n.t('validator.min',TokenService.getLocale())
});
extend('max', {
  ...max,
  //+ values._field_
  message: (_, values) => i18n.t('validator.max',TokenService.getLocale())
});
extend('confirmed', {
  ...confirmed,
  //+ values._field_
  message: (_, values) => i18n.t('validator.confirmed',TokenService.getLocale())
});
extend('positive', value => {
  if (value >= 0) {
    return true;
  }

  return i18n.t('validator.positive',TokenService.getLocale());
});

// Vuejs - Vue wrapper for hammerjs
import { VueHammer } from 'vue2-hammer'
import {TokenService} from "./services/storage.service";
Vue.use(VueHammer)


Vue.mixin({
  methods: {
    //
    setLoadingContent(container){
      this.$vs.loading({
        background: 'primary',
        color: '#fff',
        container: "#"+ container,
        scale: 0.45
      });
    },
    stopLoadingContent(container){
      this.$vs.loading.close("#"+container +" > .con-vs-loading")
    },
    makeToast(message, title, color,position = 'top-right') {
      this.$vs.notify({
        title: title,
        text: message,
        icon: 'error',
        color: color,
        position: position
      })
    },
  }
});

// Feather font icon
require('./assets/css/iconfont.css')


// Vue select css
// Note: In latest version you have to add it separately
 import 'vue-select/dist/vue-select.css';


Vue.config.productionTip = false;
// SET BASE_URL
ApiService.init(process.env.VUE_APP_ROOT_API);
new Vue({
    router,
    store,
    i18n,
    render: h => h(App)
}).$mount('#app');
