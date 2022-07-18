import apiClient from "./AxiosClient";

export default {
    register(data) {
        return apiClient.post('/auth/register/', data);
    },
    login(data) {
        return apiClient.post('/auth/login/', data);
    },
    checkEmailExist(data) {
        return apiClient.post('/auth/check-email/', data);
    },
    updateUserById(data) {
        return apiClient.post('/auth/update/', data);
    },
    updatePasswordByUserId(data) {
        return apiClient.post('/auth/update-password/', data);
    }
}