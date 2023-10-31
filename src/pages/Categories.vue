<!-- 分类页 -->
<template>
    <div class="middle-title-containter">
        <MiddleTitle />

    </div>
    <div class="category-card-containter">
        <CategoryCard />
    </div>

    <div class="category-blog-card-containter" v-if="category">
        <BlogCard v-for="item in blogInfoArr" :key="item.id" :blogTitle="item.blogTitle" :blogContent="item.blogContent"
            :blogAuthor="item.blogAuthor" :releaseDate="item.releaseDate" :imgUrl="item.imgUrl"
            @click="routeToBlog(item.id)" />
    </div>
</template>

<script>
import CategoryCard from '@/components/category/CategoryCard.vue'
import { useRoute, useRouter } from 'vue-router';
import BlogCard from '../components/BlogCard.vue';
import { ref, onMounted, watch } from 'vue';
import { getBlogByCategory } from '@/request/api/getCategoryInfo';
export default {
    components: {
        CategoryCard,
        BlogCard
    },
    setup() {
        const route = useRoute()
        const router = useRouter()
        const category = ref("")
        let blogInfoArr = ref([])
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
            getBlogByCategory(category.value).then(res => {
                blogInfoArr.value = res.data.data
            })
        })

        onMounted(() => {
            category.value = route.params.category
            if (category) {
                getBlogByCategory(category.value).then(res => {
                    blogInfoArr.value = res.data.data
                })
            }
        })
        return {
            category,
            blogInfoArr,
            routeToBlog
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
</style>