import { defineStore } from 'pinia'


export const useBlogStore = defineStore("blog", {
    state: () => {
        return {
            // 博客数据是否获取完成
            isBlogDataLoaded: false
        }

    }
})
