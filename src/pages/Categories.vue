<!-- 分类页 -->
<template>
    <div class="middle-title-containter">
        <MiddleTitle />

    </div>
    <div class="category-card-containter">
        <CategoryCard />
    </div>

    <div class="category-blog-card-containter" v-if="category" v-loading="loading">
        <BlogCard v-for="item in blogInfoArr" :key="item.id" :blogTitle="item.blogTitle" :blogContent="item.blogContent"
            :blogAuthor="item.blogAuthor" :releaseDate="item.releaseDate" :imgUrl="item.imgUrl"
            @click="routeToBlog(item.id)" />
    </div>
    <!-- 分页 -->
    <div class="pagination-containter" v-if="totalBlog && totalBlog > pageSize">
        <pagination @ChangePage="handleChangePage" :totalBlog="totalBlog" :page-size="pageSize" />
    </div>
</template>

<script>
import CategoryCard from '@/components/category/CategoryCard.vue'
import { useRoute, useRouter } from 'vue-router';
import BlogCard from '../components/BlogCard.vue';
import { ref, onMounted, watch } from 'vue';
import { getBlogByCategory } from '@/request/api/getCategoryInfo';
import pagination from '@/components/Pagination.vue';
export default {
    components: {
        CategoryCard,
        BlogCard,
        pagination
    },
    setup() {
        const route = useRoute()
        const router = useRouter()
        const category = ref("")
        let blogInfoArr = ref([])
        let totalBlog = ref(0)
        let pageSize = ref(6)
        let loading = ref(true)
        /**
      * 跳转到对应文章的页面
      * @param {*} id 
      */
        function routeToBlog(id) {
            router.push(`/article/${id}`)
        }
        // 监视route.params.category的变化
        watch(() => route.params.category, (newCategory) => {
            category.value = newCategory;
            loading.value = true;
            getBlogByCategory(category.value).then(res => {
                blogInfoArr.value = res.data.data
                totalBlog.value = res.data.totalBlog
                pageSize.value = res.data.pageSize
                loading.value = false
            })
        })
        /**
         * 换页之后按照页码重新请求数据
         * @param {} curPage 
         */
        function handleChangePage(curPage) {
            loading.value = true;
            getBlogByCategory(category.value, curPage).then(res => {
                if (res.status === 200) {
                    blogInfoArr.value = res.data.data
                    loading.value = false
                }
            })
        }
        onMounted(() => {
            category.value = route.params.category
            if (category) {
                getBlogByCategory(category.value).then(res => {
                    blogInfoArr.value = res.data.data
                    totalBlog.value = res.data.totalBlog
                    pageSize.value = res.data.pageSize
                    loading.value = false
                })
            }
        })
        return {
            category,
            blogInfoArr,
            routeToBlog,
            totalBlog,
            pageSize,
            handleChangePage,
            loading
        }
    }
}
</script>

<style  scoped>
.middle-title-containter {
    margin-top: 250px;
}

.category-card-containter {
    margin: 0 auto;
    margin-top: 150px;
    width: 1125px;

}

.category-blog-card-containter {
    width: 1125px;
    margin: 0 auto;
    margin-top: 50px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
}

.pagination-containter {
    display: flex;
    justify-content: center;
    margin-top: 20px;
}
</style>