import axios from 'axios';


const BASE_URL = 'http://localhost:8081/api/bags';

export default {
  post(bagData) {
    return axios.post(`${BASE_URL}`, bagData);
  },
  getAll() {
    return axios.get(`${BASE_URL}`);
  },
  getById(bagID) {
    return axios.get(`${BASE_URL}/${bagID}`);
  },
  update(bagID, bagData) {
    return axios.put(`${BASE_URL}/${bagID}`, bagData);
  },
  delete(bagID) {
    return axios.delete(`${BASE_URL}/${bagID}`);
  }
};
