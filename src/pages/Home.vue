<!-- 首页 -->
<template>
    <div class="home">
        <!-- 中间大标题 -->
        <div class="home-title-containter">
            <HomeTitle />
        </div>
        <!-- 两个按钮 -->
        <div class="home-buttons-containter">
            <HomeButtons @startRead="startRead" />
        </div>
        <!-- icon联系链接 -->
        <div class="social-link-containter">
            <HomeIcons></HomeIcons>
        </div>
        <!-- 我的梦想卡片 -->
        <div class="dream-card-containter" ref="dreamCard">
            <Dream></Dream>
        </div>
        <!-- 博客卡片 -->
        <div class="blog-card-containter" v-loading="loading">
            <BlogCard v-for="item in blogInfoArr" :key="item.id" :blogTitle="item.blogTitle" :blogContent="item.blogContent"
                :blogAuthor="item.blogAuthor" :releaseDate="item.releaseDate" :imgUrl="item.imgUrl"
                @click="routeToBlog(item.id)" />
        </div>
        <!-- 分页 -->
        <div class="pagination-containter" v-if="totalBlog && totalBlog > pageSize">
            <pagination @ChangePage="handleChangePage" :totalBlog="totalBlog" :pageSize="pageSize" />
        </div>
    </div>
</template>

<script>
import Dream from '@/components/Dream.vue';
import HomeButtons from '@/components/home/HomeButtons.vue';
import HomeIcons from '@/components/home/HomeIcons.vue';
import HomeTitle from '@/components/home/HomeTitle.vue';
import BlogCard from '@/components/BlogCard.vue';
import pagination from '@/components/Pagination.vue';
import { onMounted, ref } from "vue";
import { getBlogInfo } from '@/request/api/getBlogInfo';
import { useRouter } from 'vue-router';
export default {
    components: {
        HomeButtons,
        Dream,
        HomeIcons,
        HomeTitle,
        BlogCard,
        pagination,
    },
    setup() {
        let blogInfoArr = ref([])
        let totalBlog = ref()
        let pageSize = ref()
        // 分页时，对每一页的内容做加载中显示
        let loading = ref(true)
        onMounted(async () => {
            // 获取博客数据
            const res = await getBlogInfo()
            blogInfoArr.value = res.data.data
            totalBlog.value = res.data.totalBlog;
            pageSize.value = res.data.pageSize;
            loading.value = false
        })
        /**
         * 换页之后按照页码重新请求数据
         * @param {} curPage 
         */
        function handleChangePage(curPage) {
            loading.value = true
            getBlogInfo(curPage).then(res => {
                if (res.status === 200) {
                    blogInfoArr.value = res.data.data
                    loading.value = false
                }
            })
        }
        // 点击开始阅读按钮滚动到文章部分,使用ref获取组件
        const dreamCard = ref()
        function startRead() {
            dreamCard.value.scrollIntoView({
                behavior: "smooth",  // 平滑过渡
                block: "start"    // 上边框与视窗顶部平齐
            })
        }
        const router = useRouter()
        /**
         * 跳转到对应文章的页面
         * @param {*} id  文章的id
         */
        function routeToBlog(id) {
            router.push(`/article/${id}`)
        }

        return {
            blogInfoArr,
            handleChangePage,
            startRead,
            dreamCard,
            routeToBlog,
            totalBlog,
            pageSize,
            loading
        }
    }
}
</script>

<style scoped>
/* 中间标题 */
.home .home-title-containter {
    /* margin: 0 auto; */
    margin-top: 40vh;
    /* width: 650px; */
}

/* 两个按钮 */
.home .home-buttons-containter {
    margin: 0 auto;
    margin-top: 100px;
    width: 400px;
}

/* 两个按钮移动端适配 */
@media (max-width: 992px) {
    .home .home-buttons-containter {
        margin-top: 15vh;
        width: 85vw;
    }
}


/* 联系方式链接 */
.home .social-link-containter {
    width: 200px;
    margin: 0 auto;
    margin-top: 130px;
    font-size: 20px;
}

/* 我的梦想card */
.home .dream-card-containter {
    width: 1125px;
    margin: 0 auto;
    margin-top: 170px;
    overflow: hidden;
    box-sizing: border-box;
}

/* 梦想card移动端适配 */
@media (max-width: 992px) {
    .home .dream-card-containter {
        width: 95vw;
    }
}

/* 博客缩略图 */
.home .blog-card-containter {
    width: 1125px;
    margin: 0 auto;
    margin-top: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
}

.home .pagination-containter {
    display: flex;
    justify-content: center;
    margin-top: 20px;
}

/* 博客卡片移动端适配 */
@media (max-width: 992px) {
    .home .blog-card-containter {
        width: 95vw;
    }
}
</style>