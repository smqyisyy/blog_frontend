<!-- 分页组件 -->
<template>
    <div class="pagination-block">
        <el-pagination background layout="prev, pager, next" :total="totalBlog" :page-size="pageSize"
            @current-change="handleCurrentChange" />
    </div>
</template>

<script>
import { getBlogInfo } from '@/request/api/getBlogInfo';
import { ref, onMounted } from "vue"
export default {
    props: {
        pageSize: {
            default: 6
        },
    },
    setup(props, context) {
        let totalBlog = ref()
        onMounted(() => {
            getBlogInfo().then(res => {
                if (res.status === 200) {
                    totalBlog.value = res.data.totalBlog
                }
            })
        })
        const pageSize = props.pageSize
        function handleCurrentChange(curPage) {
            context.emit("changePage", curPage)
        }
        return {
            totalBlog,
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