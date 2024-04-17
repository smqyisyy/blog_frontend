
<template>
    <el-card class="content-card" v-loading="loading">
        <template #header>
            <div class="card-header">
                <span>{{ category }}</span>
                <div>{{ releaseDate }}</div>
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
        marked.setOptions({
            renderer: render, // 这是必填项
            gfm: true, // 启动类似于Github样式的Markdown语法
            pedantic: false, // 只解析符合Markdwon定义的，不修正Markdown的错误
            sanitize: true // 原始输出，忽略HTML标签（关闭后，可直接渲染HTML标签）
        })
        // 新版本的marked要用marked-gfm-heading-id插件配置给标题加入id属性
        marked.use(gfmHeadingId({}));
        // 文章分类
        const category = ref('')
        //  发布时间
        const releaseDate = ref('')
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
            loading
        }
    }
}
</script>
<style>
/* markdown样式 */
@import url("../../assets/css/markdown-style.css");
/* 代码块高亮样式 */
@import url("../../assets/css/prism.css");
</style>