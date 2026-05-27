import axios from "axios";
export function getComments(blogId) {
    return axios.get(`/api/comment/list/?blogId=${blogId}`);
}
export function addComment(data) {
    return axios.post('/api/comment/add', data);
}