import apiClient from '@/services/AxiosClient.js'

apiClient.interceptors.request.use(
  (request) => {
    const token = localStorage.getItem('token')
    if (token) {
      request.headers['Authorization'] = token
    }
    return request
  },
  (error) => {
    return Promise.reject(error)
  }
)
