<template>
    <div class="search-page">
        <div class="search-title-containter">
            <MiddleTitle />
        </div>
        <div class="search-box-containter">
            <el-input v-model="searchKeyword" placeholder="搜索博客..." size="large" @keyup.enter="doSearch" clearable>
                <template #append>
                    <el-button @click="doSearch">
                        <font-awesome-icon icon="fa-solid fa-search" />
                    </el-button>
                </template>
            </el-input>
        </div>
        <div class="search-result-containter" v-loading="loading">
            <div v-if="!loading && searched && blogInfoArr.length === 0" class="no-result">
                未找到与 "{{ currentKeyword }}" 相关的博客
            </div>
            <BlogCard v-for="item in blogInfoArr" :key="item.id" :blogTitle="item.blogTitle" :blogContent="item.blogContent"
                :blogAuthor="item.blogAuthor" :releaseDate="item.releaseDate" :imgUrl="item.imgUrl" :description="item.description"
                @click="routeToBlog(item.id)" />
        </div>
        <div class="pagination-containter" v-if="totalBlog && totalBlog > pageSize">
            <pagination @ChangePage="handleChangePage" :totalBlog="totalBlog" :pageSize="pageSize" />
        </div>
    </div>
</template>

<script>
import MiddleTitle from '@/components/MiddleTitle.vue';
import BlogCard from '@/components/BlogCard.vue';
import pagination from '@/components/Pagination.vue';
import { searchBlog } from '@/request/api/search';
import { ref, onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

export default {
    components: { MiddleTitle, BlogCard, pagination },
    setup() {
        const route = useRoute()
        const router = useRouter()
        let blogInfoArr = ref([])
        let totalBlog = ref(0)
        let pageSize = ref(6)
        let loading = ref(false)
        let searched = ref(false)
        let searchKeyword = ref('')
        let currentKeyword = ref('')

        function doSearch() {
            if (searchKeyword.value.trim()) {
                router.push({ path: '/search', query: { keyword: searchKeyword.value.trim() } })
            }
        }

        async function fetchResults(keyword, pageNum) {
            loading.value = true
            searched.value = true
            currentKeyword.value = keyword
            try {
                const res = await searchBlog(keyword, pageNum)
                blogInfoArr.value = res.data.data
                totalBlog.value = res.data.totalBlog
                pageSize.value = res.data.pageSize
            } catch (e) {
                blogInfoArr.value = []
                totalBlog.value = 0
            }
            loading.value = false
        }

        function handleChangePage(curPage) {
            fetchResults(currentKeyword.value, curPage)
        }

        function routeToBlog(id) {
            router.push(`/article/${id}`)
        }

        watch(() => route.query.keyword, (newKeyword) => {
            if (newKeyword) {
                searchKeyword.value = newKeyword
                fetchResults(newKeyword, 1)
            }
        })

        onMounted(() => {
            const keyword = route.query.keyword
            if (keyword) {
                searchKeyword.value = keyword
                fetchResults(keyword, 1)
            }
        })

        return { blogInfoArr, totalBlog, pageSize, loading, searched, searchKeyword, currentKeyword, doSearch, handleChangePage, routeToBlog }
    }
}
</script>

<style scoped>
.search-page .search-title-containter {
    margin-top: 250px;
}
.search-page .search-box-containter {
    width: 60vw;
    margin: 0 auto;
    margin-top: 50px;
}
.search-page .search-result-containter {
    width: 60vw;
    margin: 0 auto;
    margin-top: 30px;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    gap: 20px;
}
.search-page .search-result-containter .blog-card {
    width: calc((100% - 40px) / 3);
}
.search-page .no-result {
    width: 100%;
    text-align: center;
    color: #999;
    font-size: 18px;
    padding: 40px 0;
}
.search-page .pagination-containter {
    display: flex;
    justify-content: center;
    margin-top: 20px;
}
@media (max-width: 992px) {
    .search-page .search-box-containter {
        width: 95vw;
    }
    .search-page .search-result-containter {
        width: 95vw;
    }
    .search-page .search-result-containter .blog-card {
        width: 100%;
    }
}
</style>