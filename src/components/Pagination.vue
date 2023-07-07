<template>
    <div class="pagination-block">
        <el-pagination background layout="prev, pager, next" :total="totalBlogs" :page-size="pageSize"
            @current-change="handleCurrentChange" />
    </div>
</template>

<script>
export default {
    props: {
        totalBlogs: {
            default: 10
        },
        pageSize: {
            default: 6
        },

    },
    setup(props, context) {
        const totalBlogs = props.totalBlogs
        const pageSize = props.pageSize
        function handleCurrentChange(curPage) {
            context.emit("changePage", curPage)
        }
        return {
            totalBlogs,
            pageSize,
            handleCurrentChange
        }
    }
}
</script>

<style scoped>
.pagination-block {
    background: none;
}
</style>