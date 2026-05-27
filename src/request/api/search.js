import axios from "axios";
export function searchBlog(keyword, pageNum = 1) {
    return axios.get(`/api/blog/search/?keyword=${encodeURIComponent(keyword)}&pageNum=${pageNum}`);
}