<!-- 分页组件 -->
<template>
    <div class="pagination-block">
        <el-pagination background layout="prev, pager, next" :total="totalBlog" :page-size="pageSize"
            v-model:current-page="curPage" />
    </div>
</template>

<script>
import { ref, watch } from "vue"
export default {
    props: {
        totalBlog: {
            type: Number,
            required: true
        },
        pageSize: {
            type: Number,
            required: true
        }
    },
    setup(props, context) {
        let totalBlog = ref(props.totalBlog);
        let pageSize = ref(props.pageSize);
        // 由于elementui弃用了@current-change事件，所以通过v-model获取curPage的值使用watch监听curPage变化使用emit触发事件
        const curPage = ref(1)
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