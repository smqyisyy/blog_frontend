
<template>
    <el-card class="content-card" v-loading="loading">
        <template #header>
            <div class="card-header">
                <div class="header-top">
                    <span class="header-category"><font-awesome-icon icon="fa-solid fa-bookmark" style="color: #ee6e73;" /> {{ category }}</span>
                    <div class="header-date"><font-awesome-icon icon="fa-regular fa-clock" style="color: #999;" /> {{ releaseDate }}</div>
                </div>
                <h1 class="header-title">{{ blogTitle }}</h1>
            </div>
        </template>
        <div v-html="content" class="content"></div>
    </el-card>
</template>
 
<script>
import { ref, onMounted } from 'vue'
import { marked } from 'marked'
import { gfmHeadingId } from "marked-gfm-heading-id";
import { getBlogById } from "@/request/api/getBlogInfo";
import { useBlogStore } from "@/store/useBlogStore";
import '../../assets/js/prism'; // prismjs库使markdown代码高亮
export default {
    props: {
        blogId: {
            type: Number,
            required: true
        }
    },
    setup(props) {
        let loading = ref(true);
        const render = new marked.Renderer()
        render.image = function({ href, title, text }) {
            const titleAttr = title ? ` title="${title}"` : ''
            return `<img src="${href}" alt="${text}"${titleAttr} loading="lazy">`
        }
        marked.setOptions({
            renderer: render,
            gfm: true,
            pedantic: false,
            sanitize: true
        })
        // 新版本的marked要用marked-gfm-heading-id插件配置给标题加入id属性
        marked.use(gfmHeadingId({}));
        // 文章分类
        const category = ref('')
        //  发布时间
        const releaseDate = ref('')
        // 文章标题
        const blogTitle = ref('')
        //  文章内容
        const content = ref('')
        const initContent = async () => {
            // 获取当前博客的id
            const blogId = props.blogId;
            // 获取id对应数据
            const res = await getBlogById(blogId)
            content.value = marked(res.data.data.blogContent)
            releaseDate.value = res.data.data.releaseDate
            category.value = res.data.data.category
            blogTitle.value = res.data.data.blogTitle
            const store = useBlogStore();
            // 获取博客数据完成后，标识一下
            store.$patch({ isBlogDataLoaded: true })
        }
        onMounted(async () => {
            await initContent()
            Prism.highlightAll()
            // 标识加载完成
            loading.value = false
        })
        return {
            initContent,
            content,
            releaseDate,
            category,
            blogTitle,
            loading
        }
    }
}
</script>
<style scoped>
.card-header {
    padding: 10px 0;
}
.header-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 12px;
}
.header-category {
    font-size: 14px;
    color: #ee6e73;
    font-weight: bold;
}
.header-date {
    font-size: 13px;
    color: #999;
}
.header-title {
    font-size: 26px;
    font-weight: bold;
    color: #333;
    margin: 0;
    line-height: 1.4;
}
</style>
<style>
/* markdown样式 */
@import url("../../assets/css/markdown-style.css");
/* 代码块高亮样式 */
@import url("../../assets/css/prism.css");
</style>