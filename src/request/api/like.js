import axios from "axios";

export function getLike(blogId) {
    return axios.get(`/api/like?blogId=${blogId}`);
}

export function toggleLike(blogId) {
    return axios.post('/api/like', { blogId });
}
