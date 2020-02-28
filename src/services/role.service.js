import ApiService from './api.service'
const RoleService = {
  list(){
    return ApiService.get(`/role/list`);
  },

};
export default RoleService;
