import apiClient from './AxiosClient'

export default {
  getBookmarkByUserId(data) {
    return apiClient.post('/bookmarks/', { userId: data })
  },
  addBookmark(userId, data) {
    return apiClient.post('/bookmarks/add', {
      userId: userId,
      serialNo: data
    })
  },
  removeBookmark(userId, data) {
    return apiClient.post('/bookmarks/remove', {
      userId: userId,
      serialNo: data
    })
  }
}
