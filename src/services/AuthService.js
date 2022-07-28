import apiClient from './AxiosClient'

export default {
  register(data) {
    return apiClient.post('/auth/register', data)
  },
  login(data) {
    return apiClient.post('/auth/', data)
  },
  logout() {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  },
  checkEmailExist(email) {
    return apiClient.post('/auth/check-email', { email: email })
  },
  updateInfoByUserId(data) {
    return apiClient.post('/auth/update-information', data)
  },
  updatePasswordByUserId(data) {
    return apiClient.post('/auth/update-password', data)
  }
}
