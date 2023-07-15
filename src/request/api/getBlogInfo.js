import axios from "axios";
/**
 * 
 * @param {Number} pageNum 
 * @returns {}
 */
export function getBlogInfo(pageNum = 1) {
    return axios({
        method: 'get',
        url: `/api/api/manage/indexArticle/?page=${pageNum}`,
    })
}
