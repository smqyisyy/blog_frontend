import axios from "axios";
export function getBlogInfo(pageNum = 1) {
    return axios({
        method: 'get',
        url: `/api/api/manage/indexArticle/?page=${pageNum}`,
    })
}
