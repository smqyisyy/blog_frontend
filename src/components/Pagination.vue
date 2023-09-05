<!-- 分页组件 -->
<template>
    <div class="pagination-block">
        <el-pagination background layout="prev, pager, next" :total="totalBlog" :page-size="pageSize"
            v-model:current-page="curPage" />
        <!-- <el-pagination background layout="prev, pager, next" :total="totalBlog" :page-size="pageSize"
            @current-change="handleCurrentChange" v-model:current-page="curPage"/> -->
    </div>
</template>

<script>
import { getBlogInfo } from '@/request/api/getBlogInfo';
import { ref, onMounted, watch } from "vue"
export default {
    setup(props,context) {
        let totalBlog = ref(0)
        let pageSize = ref(0)
        onMounted(() => {
            getBlogInfo().then(res => {
                if (res.status === 200) {
                    totalBlog.value = res.data.totalBlog
                    pageSize.value = res.data.pageSize
                }
            })
        })
        // 由于elementui弃用了@current-change事件，所以通过v-model获取curPage的值使用watch监听curPage变化使用emit触发事件
        const curPage = ref()
        function handleCurrentChange() {
            context.emit("changePage", curPage.value)
        }
        watch(curPage, handleCurrentChange)
        return {
            totalBlog,
            pageSize,
            handleCurrentChange,
            curPage
        }
    }
}
</script>

<style scoped>
.pagination-block {
    background: none;
}
</style>