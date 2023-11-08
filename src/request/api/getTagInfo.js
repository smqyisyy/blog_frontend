import axios from "axios";
/**
 * 通过tag分页获取对应分类博客相关信息
 * @param {Number} pageNum 
 * @param {String} tag
 * @returns {}
 */
export function getBlogByTag(tag, pageNum = 1,) {
    return axios({
        method: 'get',
        url: `/api/tags/infoBytag/?pageNum=${pageNum}&tag=${tag}`,
    })
}
/**
 * 查询各个标签对应博客的数量
 * @param 
 * @returns 
 */
export function getTags() {
    return axios({
        method: 'get',
        url: `/api/tags/info`,
    })
}
