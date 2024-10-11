import Api from '@/services/Api';

const BASE_URL = 'http://localhost:8081/api/bags';  

export default {
  index() {
    return Api().get(`${BASE_URL}`);  
  },
  show(bagId) {
    return Api().get(`${BASE_URL}/${bagId}`);
  },
  post(bagData) {
    return Api().post(`${BASE_URL}`, bagData);  
  },
  put(bagID, bagData) {  // ensure bagID is used as parameter
    return Api().put(`${BASE_URL}/${bagID}`, bagData);
  },
  getAll() {
    return Api().get(`${BASE_URL}`);  
  },
  getById(bagID) {
    return Api().get(`${BASE_URL}/${bagID}`);  
  },
  update(bagID, formData) {
    return Api().put(`${BASE_URL}/${bagID}`, formData);
  },
  delete(bagID) {
    return Api().delete(`${BASE_URL}/${bagID}`);  
  }
};