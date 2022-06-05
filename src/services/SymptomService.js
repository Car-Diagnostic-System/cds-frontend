import axiosClient from '@/services/AxiosClient.js'

export default {
  querySymptom(data) {
    return axiosClient.post('/symptom/query', data)
  },
  indexing(data) {
    const formData = new FormData()
    formData.append('file', data)
    return axiosClient.post('/symptom/indexing', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  }
}
