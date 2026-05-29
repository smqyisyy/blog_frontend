import axios from 'axios'
import axiosInstance from '../axiosInstance'

// 记录访问（公开）
export function trackVisit(blogId, path) {
    return axios.post('/api/visit/track', { blogId, path })
}

// 获取文章阅读量（公开）
export function getViews(blogId) {
    return axios.get('/api/visit/views', { params: { blogId } })
}

// 获取后台访问统计（需要登录）
export function getVisitStats(days = 7) {
    return axiosInstance.get('/api/admin/visit/stats', { params: { days } })
}
