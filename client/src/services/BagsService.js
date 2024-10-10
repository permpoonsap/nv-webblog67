import Api from '@/services/Api';

const BASE_URL = 'http://localhost:8081/api/bags';  // Correctly defined API URL

export default {
  index() {
    return Api().get(`${BASE_URL}`);  // ใช้ BASE_URL เพื่อให้เรียกไปยังเส้นทางที่ถูกต้อง
  },
  post(bagData) {
    return Api().post(`${BASE_URL}`, bagData);  // Sends a POST request to create a new bag
  },
  getAll() {
    return Api().get(`${BASE_URL}`);  // Sends a GET request to retrieve all bags
  },
  getById(bagID) {
    return Api().get(`${BASE_URL}/${bagID}`);  // Sends a GET request to retrieve a bag by its ID
  },
  update(bagID, bagData) {
    return Api().put(`${BASE_URL}/${bagID}`, bagData);  // Sends a PUT request to update a bag by its ID
  },
  delete(bagID) {
    return Api().delete(`${BASE_URL}/${bagID}`);  // Sends a DELETE request to remove a bag by its ID
  }
};
