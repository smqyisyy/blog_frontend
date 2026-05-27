import axios from 'axios'
import { useAdminStore } from '../store/useAdminStore'
import router from '../router'

const axiosInstance = axios.create({
    baseURL: '',
    timeout: 30000
})

axiosInstance.interceptors.request.use(config => {
    const adminStore = useAdminStore()
    if (adminStore.token) {
        config.headers.Authorization = `Bearer ${adminStore.token}`
    }
    return config
})

axiosInstance.interceptors.response.use(
    response => response,
    error => {
        if (error.response && error.response.status === 401) {
            const adminStore = useAdminStore()
            adminStore.logout()
            router.push('/admin/login')
        }
        return Promise.reject(error)
    }
)

export default axiosInstance