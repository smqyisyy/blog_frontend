import axios from "axios";
/**
 * 获取博客相关信息
 * @param {Number} pageNum 
 * @returns {}
 */
export function getBlogInfo(pageNum = 1) {
    return axios({
        method: 'get',
        url: `/api/api/blog/info/?pageNum=${pageNum}`,
    })
}
