import axiosClient from '@/services/AxiosClient.js'

export default {
  addCar(data) {
    return axiosClient.post('/cars/create/', data)
  },
  getAllCars() {
    return axiosClient.get('/cars/')
  },
  getAllCarsPagination(page) {
    return axiosClient.get(`/cars/all/${page}/`)
  },
  getCarById(id) {
    return axiosClient.get(`/cars/${id}/`)
  },
  updateCar(id, data) {
    return axiosClient.post(`/cars/${id}/edit/`, data)
  },
  deleteCar(id) {
    return axiosClient.delete(`/cars/${id}/delete/`)
  }
}
