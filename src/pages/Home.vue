<template>
    <div class="home">
        <!-- 中间大标题 -->
        <div class="home-title-containter">
            <HomeTitle />
        </div>
        <!-- 两个按钮 -->
        <div class="home-buttons-containter">
            <HomeButtons />
        </div>
        <!-- icon联系链接 -->
        <div class="social-link-containter">
            <HomeIcons></HomeIcons>
        </div>
        <!-- 我的梦想卡片 -->
        <div class="dream-card-containter">
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
            <pagination :totalBlogs="100" @ChangePage="handleChangePage" />
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
        let blogInfoArr = ref([
            {
                blogTitle: "111",
                releaseDate: "2023-06-09",
                blogContent: "2023年6月6日，星期二，我在镇江的极客营进行Java认知实习的第二天。今天的主要内容是使用Java编写一个”万年历”程序，并了解了Java的程序",
                blogAuthor: "Dish",
                imgUrl: null || undefined
            },
            {
                blogTitle: "222",
                releaseDate: "2023-06-09",
                blogContent: "2023年6月7日，星期二，我在镇江的极客营进行Java认知实习的第二天。今天的主要内容是使用Java编写一个”万年历”程序，并了解了Java的程序",
                blogAuthor: "Dish"
            },
            {
                blogTitle: "333",
                releaseDate: "2023-06-09",
                blogContent: "2023年6月8日，星期二，我在镇江的极客营进行Java认知实习的第二天。今天的主要内容是使用Java编写一个”万年历”程序，并了解了Java的程序",
                blogAuthor: "Dish"
            },
            {
                blogTitle: "444",
                releaseDate: "2023-06-09",
                blogContent: "2023年6月9日，星期二，我在镇江的极客营进行Java认知实习的第二天。今天的主要内容是使用Java编写一个”万年历”程序，并了解了Java的程序",
                blogAuthor: "Dish"
            },
            {
                blogTitle: "555",
                releaseDate: "2023-06-09",
                blogContent: "2023年6月10日，星期二，我在镇江的极客营进行Java认知实习的第二天。今天的主要内容是使用Java编写一个”万年历”程序，并了解了Java的程序",
                blogAuthor: "Dish"
            },
            {
                blogTitle: "666",
                releaseDate: "2023-06-09",
                blogContent: "2023年6月11日，星期二，我在镇江的极客营进行Java认知实习的第二天。今天的主要内容是使用Java编写一个”万年历”程序，并了解了Java的程序",
                blogAuthor: "Dish"
            },
        ])
        let totalPage = ref()
        onMounted(() => {
            getBlogInfo()
                .then(res => {
                    if (res.status === 200) {
                        blogInfoArr.value.length = 0
                        console.log(res.data);
                        totalPage = res.data.totalPage
                        res.data.data.forEach(val => {
                            blogInfoArr.value.push({ blogTitle: val.Title, releaseDate: val.Release_Time ? val.Release_Time.slice(0, 10) : undefined, blogContent: val.Content, blogAuthor: val.Author, imgUrl: val.Image_Url || undefined })
                        })
                    }
                })
        })
        function handleChangePage(curPage) {
            getBlogInfo(curPage).then(res => {
                if (res.status === 200) {
                    blogInfoArr.value.length = 0
                    totalPage = res.data.totalPage || 10
                    res.data.data.forEach(val => {
                        blogInfoArr.value.push({ blogTitle: val.Title, releaseDate: val.Release_Time ? val.Release_Time.slice(0, 10) : undefined, blogContent: val.Content, blogAuthor: val.Author, imgUrl: val.Image_Url || undefined })
                    })
                }
            })
        }
        return {
            blogInfoArr,
            totalPage,
            handleChangePage
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