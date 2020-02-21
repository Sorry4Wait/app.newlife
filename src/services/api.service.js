import axios from 'axios'
import {TokenService} from '../services/storage.service'
//import store from '../store'
//import UserService from "./user.service";

const ApiService = {

  // Stores the 401 interceptor position so that it can be later ejected when needed
  _401interceptor: null,

  init(baseURL) {
    axios.defaults.baseURL = baseURL;
  },

  setHeader() {
    axios.defaults.headers.common["Authorization"] = `Bearer ${TokenService.getToken()}`
  },

  removeHeader() {
    axios.defaults.headers.common = {}
  },

  get(resource) {
    return axios.get(resource)
  },

  post(resource, data) {
    return axios.post(resource, data)
  },
  formData(resource, data) {
    return axios.post(resource, data,
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
  },

  put(resource, data) {
    return axios.put(resource, data)
  },

  delete(resource) {
    return axios.delete(resource)
  },

  /**
   * Perform a custom Axios request.
   *
   * data is an object containing the following properties:
   *  - method
   *  - url
   *  - data ... request payload
   *  - auth (optional)
   *    - username
   *    - password
   **/
  customRequest(data) {
    return axios(data)
  },

  mount401Interceptor() {
    this._401interceptor = axios.interceptors.response.use(
      (response) => {
        return response
      },
      async (error) => {
        if (error.request.status == 401) {
          UserService.logout();
          // if (error.config.url.includes('/o/token/')) {
          // 	// Refresh token has failed. Logout the user
          // 	store.dispatch('auth/logout')
          // 	throw error
          // } else {
          // 	// Refresh the access token
          // 	try {
          // 		await store.dispatch('auth/refreshToken')
          // 		// Retry the original request
          // 		return this.customRequest({
          // 			method: error.config.method,
          // 			url: error.config.url,
          // 			data: error.config.data
          // 		})
          // 	} catch (e) {
          // 		// Refresh has failed - reject the original request
          // 		throw error
          // 	}
          // }
        }
        if (error.request.status == 403) {
          window.location.href = "/error/403"
        }
        // If error was not 401 just reject as is
        throw error
      }
    )
  },

  unmount401Interceptor() {
    // Eject the interceptor
    axios.interceptors.response.eject(this._401interceptor)
  }
}

export default ApiService
