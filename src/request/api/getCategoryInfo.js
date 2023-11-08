import axios from "axios";
/**
 * 通过category分页获取对应分类博客相关信息
 * @param {Number} pageNum 
 * @param {String} category 
 * @returns {}
 */
export function getBlogByCategory(category, pageNum = 1,) {
    return axios({
        method: 'get',
        url: `/api/categories/infoByCategory/?pageNum=${pageNum}&category=${category}`,
    })
}
/**
 * 查询各个分类对应博客的数量
 * @param 
 * @returns 
 */
export function getCategories() {
    return axios({
        method: 'get',
        url: `/api/categories/info`,
    })
}