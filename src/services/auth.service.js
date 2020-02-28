import ApiService from './api.service'
const AuthService = {
  index(){
    return ApiService.post(`/auth-item/index`);
  },
  getUserList(data){
    return ApiService.post(`/user/index`,data);
  }
};
export default AuthService;
