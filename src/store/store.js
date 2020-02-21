import Vue from 'vue'
import Vuex from 'vuex'
import {auth} from './auth.module'
import state from "./state"
import getters from "./getters"
import mutations from "./mutations"
import actions from "./actions"
import storage from './storage'
import {abilityPlugin, ability as appAbility} from './ability'

export const ability = appAbility;
Vue.use(Vuex)

// import moduleTodo from './todo/moduleTodo.js'
// import moduleCalendar from './calendar/moduleCalendar.js'
// import moduleChat from './chat/moduleChat.js'
// import moduleEmail from './email/moduleEmail.js'
import moduleECommerce from './eCommerce/moduleECommerce.js'


export default new Vuex.Store({
  getters,
  mutations,
  state,
  actions,
  modules: {
    auth,
    // todo: moduleTodo,
    // calendar: moduleCalendar,
    // chat: moduleChat,
    // email: moduleEmail,

    eCommerce: moduleECommerce,
  },
  plugins: [
    storage({
      storedKeys: ['rules'],
      destroyOn: ['auth/logoutSuccess']
    }),
    abilityPlugin
  ],
  strict: process.env.NODE_ENV !== 'production'
})
