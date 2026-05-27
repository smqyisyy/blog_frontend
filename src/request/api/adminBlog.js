import axiosInstance from '../axiosInstance'

export function login(password) {
    return axiosInstance.post('/api/admin/login', { password })
}

export function getBlogList() {
    return axiosInstance.get('/api/admin/blogs')
}

export function getBlogByTitle(blogTitle) {
    return axiosInstance.get('/api/admin/blog/byTitle', { params: { blogTitle } })
}

export function createBlog(data) {
    return axiosInstance.post('/api/admin/blog', data)
}

export function updateBlog(data) {
    return axiosInstance.put('/api/admin/blog', data)
}

export function deleteBlog(blogTitle) {
    return axiosInstance.delete(`/api/admin/blog/${encodeURIComponent(blogTitle)}`)
}

export function uploadImage(file) {
    const formData = new FormData()
    formData.append('file', file)
    return axiosInstance.post('/api/admin/upload/image', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
    })
}

export function uploadMd(file) {
    const formData = new FormData()
    formData.append('file', file)
    return axiosInstance.post('/api/admin/upload/md', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
    })
}