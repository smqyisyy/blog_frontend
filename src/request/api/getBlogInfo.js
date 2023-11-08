import axios from "axios";
/**
 * 分页获取博客相关信息
 * @param {Number} pageNum 
 * @returns {}
 */
export function getBlogInfo(pageNum = 1) {
    return axios({
        method: 'get',
        url: `/api/blog/info/?pageNum=${pageNum}`,
    })
}
/**
 * 通过id查询博客相关信息
 * @param {Number} id 
 * @returns 
 */
export function getBlogById(id) {
    return axios({
        method: 'get',
        url: `/api/blog/infoById/?id=${id}`,
    })
}
