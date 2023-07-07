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
        <div class="blog-card-containter">
            <BlogCard v-for="item in blogInfoArr" :key="item.blogTitle" :blogTitle="item.blogTitle"
                :blogContent="item.blogContent" :blogAuthor="item.blogAuthor" :releaseDate="item.releaseDate"
                :imgUrl="item.imgUrl" />
        </div>
        <!-- 分页 -->
        <div class="pagination-containter">
            <pagination :totalBlogs="totalBlogs" @ChangePage="handleChangePage" />
        </div>

    </div>
</template>

<script>
import Dream from '@/components/Dream.vue';
import HomeButtons from '@/components/home/HomeButtons.vue';
import HomeIcons from '@/components/home/HomeIcons.vue';
import HomeTitle from '@/components/home/HomeTitle.vue';
import BlogCard from '@/components/BlogCard.vue';
import pagination from '@/components/pagination.vue';
import { onMounted, ref } from "vue";
import { getBlogInfo } from '@/request/api/getBlogInfo'
export default {
    components: {
        HomeButtons,
        Dream,
        HomeIcons,
        HomeTitle,
        BlogCard,
        pagination
    },
    setup() {
        let blogInfoArr = ref([])
        let totalBlogs = ref()
        onMounted(() => {
            getBlogInfo()
                .then(res => {
                    if (res.status === 200) {
                        totalBlogs.value = res.data.totalBlogs
                        blogInfoArr.value = res.data.data
                    }
                })
        })
        function handleChangePage(curPage) {
            getBlogInfo(curPage).then(res => {
                if (res.status === 200) {
                    totalBlogs.value = res.data.totalBlogs
                    blogInfoArr.value = res.data.data
                }
            })
        }
        // 点击开始阅读按钮滚动到文章部分
        const dreamCard = ref()
        function startRead() {
            dreamCard.value.scrollIntoView({
                behavior: "smooth",  // 平滑过渡
                block: "start"    // 上边框与视窗顶部平齐
            })
        }
        return {
            blogInfoArr,
            totalBlogs,
            handleChangePage,
            startRead,
            dreamCard
        }
    }
}
</script>

<style scoped>
/* 中间标题 */
.home .home-title-containter {
    margin: 0 auto;
    margin-top: 380px;
    width: 650px;
}

/* 两个按钮 */
.home .home-buttons-containter {
    margin: 0 auto;
    margin-top: 100px;
    width: 400px;
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
</style>