const TOKEN_KEY = 'access_token'
const REFRESH_TOKEN_KEY = 'refresh_token'
const USER_INFO = 'user_info';
const USER_LOCALE = 'locale';
const USER_RULES = 'rules'


/**
 * Manage the how Access Tokens are being stored and retreived from storage.
 *
 * Current implementation stores to localStorage. Local Storage should always be
 * accessed through this instace.
 **/
const TokenService = {
  getToken() {
    return localStorage.getItem(TOKEN_KEY)
  },
  getLocale() {
    return localStorage.getItem(USER_LOCALE)
  },
  setLocale(lang) {
    localStorage.setItem(USER_LOCALE, lang)
  },

  saveToken(accessToken) {
    localStorage.setItem(TOKEN_KEY, accessToken)
  },

  removeToken() {
    localStorage.removeItem(TOKEN_KEY)
  },
  removeLocale() {
    localStorage.removeItem(USER_LOCALE)
  },

  getRefreshToken() {
    return localStorage.getItem(REFRESH_TOKEN_KEY)
  },

  saveRefreshToken(refreshToken) {
    localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken)
  },

  removeRefreshToken() {
    localStorage.removeItem(REFRESH_TOKEN_KEY)
  },
  setUserInfo(data) {
    localStorage.setItem(USER_INFO, JSON.stringify(data))
  },
  getUserInfo() {
    return JSON.parse(localStorage.getItem(USER_INFO))
  },
  removeUserInfo() {
    localStorage.removeItem(USER_INFO)
  },
  getRules() {
    let obj = JSON.parse(localStorage.getItem('state'));
    return obj.rules
  }

}

export {TokenService}
