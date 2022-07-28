import apiClient from './AxiosClient'

export default {
  uploadFile(file) {
    let formData = new FormData()
    formData.append('file', file)
    return apiClient.post('/bucket/upload-file', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  }
}
