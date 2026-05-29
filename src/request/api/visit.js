import axiosInstance from '../request'

// 记录访问
export function trackVisit(blogId, path) {
    return axiosInstance.post('/api/visit/track', { blogId, path })
}

// 获取文章阅读量
export function getViews(blogId) {
    return axiosInstance.get('/api/visit/views', { params: { blogId } })
}

// 获取后台访问统计
export function getVisitStats(days = 7) {
    return axiosInstance.get('/api/admin/visit/stats', { params: { days } })
}
