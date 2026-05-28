<template>
    <div class="admin-page">
        <div class="admin-header">
            <h2>标签管理</h2>
            <div class="header-actions">
                <el-button @click="$router.push('/admin')">返回后台</el-button>
            </div>
        </div>
        <el-table :data="tagList" stripe style="width: 100%" v-loading="loading">
            <el-table-column prop="tag" label="标签名" min-width="200" />
            <el-table-column prop="count" label="博客数量" width="100" />
            <el-table-column label="操作" width="200">
                <template #default="scope">
                    <el-button size="small" @click="openRename(scope.row.tag)">重命名</el-button>
                    <el-popconfirm title="确定删除该标签吗？关联的所有博客标签都会被删除。" @confirm="handleDelete(scope.row.tag)">
                        <template #reference>
                            <el-button size="small" type="danger">删除</el-button>
                        </template>
                    </el-popconfirm>
                </template>
            </el-table-column>
        </el-table>

        <el-dialog v-model="dialogVisible" title="重命名标签" width="400px">
            <el-input v-model="newTagName" placeholder="请输入新标签名" @keyup.enter="handleRename" />
            <template #footer>
                <el-button @click="dialogVisible = false">取消</el-button>
                <el-button type="primary" @click="handleRename" :loading="renaming">确定</el-button>
            </template>
        </el-dialog>
    </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { getAdminTags, renameTag, deleteTag } from '../../request/api/adminBlog'
import { ElMessage } from 'element-plus'

export default {
    setup() {
        const tagList = ref([])
        const loading = ref(false)
        const dialogVisible = ref(false)
        const renaming = ref(false)
        const oldTagName = ref('')
        const newTagName = ref('')

        async function loadTags() {
            loading.value = true
            try {
                const res = await getAdminTags()
                tagList.value = res.data.data
            } catch (e) {
                ElMessage.error('获取标签列表失败')
            }
            loading.value = false
        }

        function openRename(tag) {
            oldTagName.value = tag
            newTagName.value = tag
            dialogVisible.value = true
        }

        async function handleRename() {
            if (!newTagName.value.trim()) {
                ElMessage.warning('请输入新标签名')
                return
            }
            if (newTagName.value.trim() === oldTagName.value) {
                dialogVisible.value = false
                return
            }
            renaming.value = true
            try {
                await renameTag(oldTagName.value, newTagName.value.trim())
                ElMessage.success('重命名成功')
                dialogVisible.value = false
                loadTags()
            } catch (e) {
                ElMessage.error('重命名失败')
            }
            renaming.value = false
        }

        async function handleDelete(tag) {
            try {
                await deleteTag(tag)
                ElMessage.success('删除成功')
                loadTags()
            } catch (e) {
                ElMessage.error('删除失败')
            }
        }

        onMounted(() => loadTags())

        return { tagList, loading, dialogVisible, renaming, newTagName, openRename, handleRename, handleDelete }
    }
}
</script>

<style scoped>
.admin-page {
    padding: 30px;
    max-width: 800px;
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
