<template>
    <div class="pagination-block">
        <el-pagination background layout="prev, pager, next" :total="totalBlogs" :size="pageSize" />
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
        }

    },
    setup(props) {
        const totalBlogs = props.totalBlogs
        const pageSize = props.pageSize
        return { 
            totalBlogs,
            pageSize 
        }
    }
}
</script>

<style scoped>
.pagination-block {
    background: none;
}
</style>