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
    localStorage.removeItem('role')
  },
  checkEmailExist(email) {
    return apiClient.post('/auth/check-email', { email: email })
  },
  updateUserById(data) {
    return apiClient.post('/auth/update', data)
  },
  updatePasswordByUserId(data) {
    return apiClient.post('/auth/update-password', data)
  },
  uploadFile(file) {
    let formData = new FormData()
    formData.append('file', file)
    return apiClient.post('/bucket/upload-file', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  },
  getUserInfo(data) {
    return apiClient.post('/auth/user-info', { userId: data })
  }
}
