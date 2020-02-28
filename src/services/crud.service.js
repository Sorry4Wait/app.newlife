import ApiService from './api.service'
const CrudService = {
  index(controller,data){
    return ApiService.post(`/${controller}/index`,data);
  },
  update(controller,data){
    return ApiService.post(`/${controller}/update`,data);
  },
  delete(controller,data){
    return ApiService.delete(`/${controller}/delete/${data}`);
  },
  get(controller,data){
    return ApiService.get(`/${controller}/get/${data}`);
  }
};
export default CrudService;
