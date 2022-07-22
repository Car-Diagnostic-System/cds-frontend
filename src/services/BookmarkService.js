import apiClient from './AxiosClient'

export default {
  getBookmarkByUserId(data) {
    return apiClient.get('/bookmarks', data)
  },
  addBookmark(data) {
    return apiClient.post('/bookmarks/add', data)
  },
  removeBookmark(data) {
    return apiClient.post('/bookmarks/remove', data)
  }
}
