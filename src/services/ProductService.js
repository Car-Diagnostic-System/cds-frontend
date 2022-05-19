import axiosClient from '@/services/AxiosClient.js'

export default {
  addProduct(data) {
    return axiosClient.post('/products/create/', data)
  },
  getAllProducts() {
    return axiosClient.get('/products/')
  },
  getAllProductsPagination(page) {
    return axiosClient.get(`/products/all/${page}/`)
  },
  getProductById(id) {
    return axiosClient.get(`/products/${id}/`)
  },
  updateProduct(id, data) {
    return axiosClient.post(`/products/${id}/edit/`, data)
  },
  deleteProduct(id) {
    return axiosClient.delete(`/products/${id}/delete/`)
  },
  querySymptom(data) {
    return axiosClient.post('/products/query-symptom/', data)
  }
}
