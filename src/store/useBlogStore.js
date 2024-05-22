import { defineStore } from 'pinia'
import { getTags } from "@/request/api/getTagInfo"
import { getCategories } from "@/request/api/getCategoryInfo"
export const useBlogStore = defineStore("blog", {
    state: () => {
        return {
            // 博客数据是否获取完成
            isBlogDataLoaded: false,
            // 标签页的首个数据
            firstTag: "",
            // 分类页的首个数据
            firstCategory: "",
        }
    },
    actions: {
        async getFirstTag() {
            const res = await getTags()
            this.firstTag = res.data.data[0].tag
        },
        async getFirstCategory() {
            const res = await getCategories()
            this.firstCategory = res.data.data[0].category
        },
    }
})
