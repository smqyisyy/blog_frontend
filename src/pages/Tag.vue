<!-- 标签页 -->
<template>
    <div class="middle-title-containter">
        <MiddleTitle />
    </div>
    <div class="tag-card-containter">
        <TagCard />
    </div>
    <div class="tag-blog-card-containter" v-if="tag">
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
import MiddleTitle from '../components/MiddleTitle.vue';
import TagCard from '@/components/tag/TagCard.vue'
import BlogCard from '../components/BlogCard.vue';
import { useRoute, useRouter } from 'vue-router';
import { ref, onMounted, watch } from 'vue';
import { getBlogByTag } from '@/request/api/getTagInfo';
import pagination from '@/components/Pagination.vue';
export default {
    components: {
        MiddleTitle,
        TagCard,
        pagination
    },
    setup() {
        const route = useRoute()
        const router = useRouter()
        const tag = ref("")
        let blogInfoArr = ref([])

        let totalBlog = ref(0)
        let pageSize = ref(6)
        /**
     * 跳转到对应文章的页面
     * @param {*} id 
     */
        function routeToBlog(id) {
            router.push(`/article/${id}`)
        }
        // 监视route.params.tag的变化
        watch(() => route.params.tag, (newTag) => {
            tag.value = newTag;
            getBlogByTag(tag.value).then(res => {
                blogInfoArr.value = res.data.data;
                totalBlog.value = res.data.totalBlog
                pageSize.value = res.data.pageSize
            })
        })
        /**
         * 换页之后按照页码重新请求数据
         * @param {} curPage 
         */
        function handleChangePage(curPage) {
            getBlogByTag(tag.value, curPage).then(res => {
                if (res.status === 200) {
                    blogInfoArr.value = res.data.data
                }
            })
        }
        onMounted(() => {
            tag.value = route.params.tag
            if (tag) {
                getBlogByTag(tag.value).then(res => {
                    blogInfoArr.value = res.data.data
                    totalBlog.value = res.data.totalBlog
                    pageSize.value = res.data.pageSize
                })
            }
        })
        return {
            tag,
            blogInfoArr,
            routeToBlog,
            totalBlog,
            pageSize,
            handleChangePage
        }
    }
}
</script>

<style scoped>
.middle-title-containter {
    margin-top: 250px;
}

.tag-card-containter {
    margin: 0 auto;
    margin-top: 150px;
    width: 1125px;

}

.tag-blog-card-containter {
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