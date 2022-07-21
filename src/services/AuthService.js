import apiClient from './AxiosClient'

export default {
  register(data) {
    return apiClient.post('/auth/register', data)
  },
  login(data) {
    return apiClient
      .post('/auth', data)
      .then((res) => {
        localStorage.setItem('token', res.data.token)
        localStorage.setItem('user', JSON.stringify(res.data.user))
        localStorage.setItem('role', res.data.user.role)
      })
      .catch((err) => {
        console.log(err)
      })
  },
  logout() {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    localStorage.removeItem('role')
  },
  checkEmailExist(data) {
    return apiClient.post('/auth/check-email', data)
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
    return apiClient.post('/uploadFile', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  }
}
