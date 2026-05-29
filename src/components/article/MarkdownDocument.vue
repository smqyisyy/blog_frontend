
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
        <div class="article-stats">
            <span class="view-count"><font-awesome-icon icon="fa-regular fa-eye" /> {{ viewCount }} 阅读</span>
        </div>
        <div class="like-section">
            <div class="like-btn" :class="{ liked, animate: animating }" @click="handleLike">
                <div class="like-icon-wrap">
                    <font-awesome-icon :icon="liked ? 'fa-solid fa-heart' : 'fa-regular fa-heart'" class="like-icon" />
                    <!-- 点赞粒子 -->
                    <span v-for="i in 6" :key="i" class="particle" :class="'p' + i" v-show="animating"></span>
                </div>
                <span class="like-count">{{ likeCount }}</span>
                <span class="like-text">{{ liked ? '已点赞' : '点赞' }}</span>
            </div>
        </div>
    </el-card>
</template>
 
<script>
import { ref, onMounted } from 'vue'
import { marked } from 'marked'
import { gfmHeadingId } from "marked-gfm-heading-id";
import { getBlogById } from "@/request/api/getBlogInfo";
import { getLike, toggleLike } from "@/request/api/like";
import { getViews, trackVisit } from "@/request/api/visit";
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
        const likeCount = ref(0)
        const liked = ref(false)
        const animating = ref(false)
        const viewCount = ref(0)

        async function loadLike() {
            try {
                const res = await getLike(props.blogId)
                likeCount.value = res.data.likes
                liked.value = res.data.liked
            } catch (e) { /* ignore */ }
        }

        async function loadViews() {
            try {
                const res = await getViews(props.blogId)
                viewCount.value = res.data.views
            } catch (e) { /* ignore */ }
        }

        async function handleLike() {
            try {
                const res = await toggleLike(props.blogId)
                liked.value = res.data.liked
                likeCount.value = res.data.likes
                // 触发点赞动画
                animating.value = true
                setTimeout(() => { animating.value = false }, 700)
            } catch (e) { /* ignore */ }
        }

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
            loadLike()
            loadViews()
            // 记录访问
            trackVisit(props.blogId, `/article/${props.blogId}`)
            // 标识加载完成
            loading.value = false
        })
        return {
            initContent,
            content,
            releaseDate,
            category,
            blogTitle,
            loading,
            likeCount,
            liked,
            animating,
            viewCount,
            handleLike
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
.article-stats {
    text-align: center;
    padding: 15px 0;
    color: #999;
    font-size: 14px;
}
.view-count {
    display: inline-flex;
    align-items: center;
    gap: 6px;
}
.like-section {
    text-align: center;
    padding: 20px 0 10px;
    border-top: 1px solid #eee;
    margin-top: 10px;
}
.like-btn {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    padding: 12px 32px;
    border: 2px solid #e0e0e0;
    border-radius: 30px;
    cursor: pointer;
    font-size: 16px;
    color: #aaa;
    transition: all 0.3s;
    user-select: none;
    position: relative;
    background: #fff;
}
.like-btn:hover {
    border-color: #F56C6C;
    color: #F56C6C;
    box-shadow: 0 2px 12px rgba(245, 108, 108, 0.15);
}
.like-btn.liked {
    border-color: #F56C6C;
    color: #F56C6C;
    background: #fef0f0;
    box-shadow: 0 2px 12px rgba(245, 108, 108, 0.15);
}
.like-icon-wrap {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
}
.like-icon {
    font-size: 24px;
    transition: transform 0.3s;
}
.like-btn:hover .like-icon {
    transform: scale(1.15);
}
.like-btn.liked .like-icon {
    color: #F56C6C;
}
.like-count {
    font-weight: bold;
    font-size: 18px;
    min-width: 20px;
}
.like-text {
    font-size: 14px;
}
/* 点赞弹跳动画 */
.like-btn.animate .like-icon {
    animation: heartPop 0.6s ease-out;
}
@keyframes heartPop {
    0% { transform: scale(1); }
    15% { transform: scale(0.8); }
    30% { transform: scale(1.3); }
    50% { transform: scale(0.95); }
    70% { transform: scale(1.1); }
    100% { transform: scale(1); }
}
/* 粒子效果 */
.particle {
    position: absolute;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    pointer-events: none;
    opacity: 0;
}
.like-btn.animate .particle {
    animation: particleBurst 0.7s ease-out forwards;
}
.p1 { background: #F56C6C; }
.p2 { background: #E6A23C; }
.p3 { background: #67C23A; }
.p4 { background: #409EFF; }
.p5 { background: #F56C6C; }
.p6 { background: #E6A23C; }
.like-btn.animate .p1 { animation-name: p1; }
.like-btn.animate .p2 { animation-name: p2; }
.like-btn.animate .p3 { animation-name: p3; }
.like-btn.animate .p4 { animation-name: p4; }
.like-btn.animate .p5 { animation-name: p5; }
.like-btn.animate .p6 { animation-name: p6; }
@keyframes p1 { 0% { opacity: 1; transform: translate(0, 0) scale(1); } 100% { opacity: 0; transform: translate(-20px, -30px) scale(0); } }
@keyframes p2 { 0% { opacity: 1; transform: translate(0, 0) scale(1); } 100% { opacity: 0; transform: translate(20px, -30px) scale(0); } }
@keyframes p3 { 0% { opacity: 1; transform: translate(0, 0) scale(1); } 100% { opacity: 0; transform: translate(-28px, -10px) scale(0); } }
@keyframes p4 { 0% { opacity: 1; transform: translate(0, 0) scale(1); } 100% { opacity: 0; transform: translate(28px, -10px) scale(0); } }
@keyframes p5 { 0% { opacity: 1; transform: translate(0, 0) scale(1); } 100% { opacity: 0; transform: translate(-10px, -35px) scale(0); } }
@keyframes p6 { 0% { opacity: 1; transform: translate(0, 0) scale(1); } 100% { opacity: 0; transform: translate(10px, -35px) scale(0); } }
@keyframes particleBurst {
    0% { opacity: 1; transform: translate(0, 0) scale(1); }
    100% { opacity: 0; }
}
/* 暗黑模式 */
html.dark .like-btn {
    background: #1a1a2e;
    border-color: #2a2a4a;
    color: #888;
}
html.dark .like-btn:hover,
html.dark .like-btn.liked {
    border-color: #F56C6C;
    color: #F56C6C;
    background: rgba(245, 108, 108, 0.1);
}
html.dark .like-section {
    border-top-color: #2a2a4a;
}
</style>
<style>
/* markdown样式 */
@import url("../../assets/css/markdown-style.css");
/* 代码块高亮样式 */
@import url("../../assets/css/prism.css");
</style>