<template>
    <div class="admin-page">
        <div class="admin-header">
            <h2>评论管理</h2>
            <div class="header-actions">
                <el-button @click="$router.push('/admin')">返回后台</el-button>
            </div>
        </div>
        <el-table :data="commentList" stripe style="width: 100%" v-loading="loading">
            <el-table-column prop="id" label="ID" width="60" />
            <el-table-column prop="blogTitle" label="所属博客" min-width="150" show-overflow-tooltip />
            <el-table-column prop="nickname" label="昵称" width="100" />
            <el-table-column prop="content" label="评论内容" min-width="200" show-overflow-tooltip />
            <el-table-column prop="createdAt" label="评论时间" width="170" />
            <el-table-column label="操作" width="80">
                <template #default="scope">
                    <el-popconfirm title="确定删除这条评论吗？" @confirm="handleDelete(scope.row.id)">
                        <template #reference>
                            <el-button size="small" type="danger">删除</el-button>
                        </template>
                    </el-popconfirm>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { getAllComments, deleteComment } from '../../request/api/adminBlog'
import { ElMessage } from 'element-plus'

export default {
    setup() {
        const commentList = ref([])
        const loading = ref(false)

        async function loadComments() {
            loading.value = true
            try {
                const res = await getAllComments()
                commentList.value = res.data.data
            } catch (e) {
                ElMessage.error('获取评论列表失败')
            }
            loading.value = false
        }

        async function handleDelete(id) {
            try {
                await deleteComment(id)
                ElMessage.success('删除成功')
                loadComments()
            } catch (e) {
                ElMessage.error('删除失败')
            }
        }

        onMounted(() => loadComments())

        return { commentList, loading, handleDelete }
    }
}
</script>

<style scoped>
.admin-page {
    padding: 30px;
    max-width: 1000px;
    margin: 0 auto;
}
.admin-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
}
.admin-header h2 {
    color: #333;
    margin: 0;
}
.header-actions {
    display: flex;
    gap: 10px;
}
</style>
