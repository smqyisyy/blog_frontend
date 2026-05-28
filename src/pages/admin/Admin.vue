<template>
    <div class="admin-page">
        <div class="admin-header">
            <h2>博客管理后台</h2>
            <div class="header-actions">
                <el-button type="primary" @click="goCreate">新建博客</el-button>
                <el-button @click="$router.push('/admin/comments')">评论管理</el-button>
                <el-button @click="$router.push('/admin/tags')">标签管理</el-button>
                <el-button @click="handleLogout">退出登录</el-button>
            </div>
        </div>
        <div class="dashboard-cards">
            <el-card class="stat-card" shadow="hover">
                <div class="stat-value">{{ stats.blogs }}</div>
                <div class="stat-label">博客</div>
            </el-card>
            <el-card class="stat-card" shadow="hover">
                <div class="stat-value">{{ stats.comments }}</div>
                <div class="stat-label">评论</div>
            </el-card>
            <el-card class="stat-card" shadow="hover">
                <div class="stat-value">{{ stats.categories }}</div>
                <div class="stat-label">分类</div>
            </el-card>
            <el-card class="stat-card" shadow="hover">
                <div class="stat-value">{{ stats.tags }}</div>
                <div class="stat-label">标签</div>
            </el-card>
        </div>
        <div class="admin-upload">
            <el-upload
                :auto-upload="true"
                :show-file-list="false"
                :before-upload="beforeMdUpload"
                :http-request="handleMdUpload"
                accept=".md"
            >
                <el-button type="success">上传 .md 文件</el-button>
            </el-upload>
        </div>
        <el-table :data="blogList" stripe style="width: 100%">
            <el-table-column prop="id" label="ID" width="60" />
            <el-table-column prop="blogTitle" label="标题" min-width="200" />
            <el-table-column prop="category" label="分类" width="120" />
            <el-table-column prop="releaseDate" label="发布日期" width="120" />
            <el-table-column label="操作" width="160">
                <template #default="scope">
                    <el-button size="small" @click="goEdit(scope.row.blogTitle)">编辑</el-button>
                    <el-popconfirm title="确定删除这篇博客吗？" @confirm="handleDelete(scope.row.blogTitle)">
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
import { useRouter } from 'vue-router'
import { useAdminStore } from '../../store/useAdminStore'
import { getBlogList, deleteBlog, uploadMd, getDashboardStats } from '../../request/api/adminBlog'
import { ElMessage } from 'element-plus'

export default {
    setup() {
        const blogList = ref([])
        const stats = ref({ blogs: 0, comments: 0, categories: 0, tags: 0 })
        const router = useRouter()
        const adminStore = useAdminStore()

        async function loadStats() {
            try {
                const res = await getDashboardStats()
                stats.value = res.data
            } catch (e) { /* ignore */ }
        }

        async function loadBlogs() {
            try {
                const res = await getBlogList()
                blogList.value = res.data.data
            } catch (e) {
                ElMessage.error('获取博客列表失败')
            }
        }

        function goCreate() {
            router.push('/admin/edit/new')
        }

        function goEdit(blogTitle) {
            router.push(`/admin/edit/${encodeURIComponent(blogTitle)}`)
        }

        async function handleDelete(blogTitle) {
            try {
                await deleteBlog(blogTitle)
                ElMessage.success('删除成功')
                loadBlogs()
            } catch (e) {
                ElMessage.error('删除失败')
            }
        }

        function handleLogout() {
            adminStore.logout()
            router.push('/admin/login')
        }

        function beforeMdUpload(file) {
            if (!file.name.endsWith('.md')) {
                ElMessage.warning('只能上传 .md 文件')
                return false
            }
            return true
        }

        async function handleMdUpload(options) {
            try {
                await uploadMd(options.file)
                ElMessage.success('上传成功')
                loadBlogs()
            } catch (e) {
                ElMessage.error('上传失败')
            }
        }

        onMounted(() => {
            loadStats()
            loadBlogs()
        })

        return { blogList, stats, goCreate, goEdit, handleDelete, handleLogout, beforeMdUpload, handleMdUpload }
    }
}
</script>

<style scoped>
.admin-page {
    padding: 30px;
    max-width: 900px;
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
.admin-upload {
    margin-bottom: 20px;
}
.dashboard-cards {
    display: flex;
    gap: 16px;
    margin-bottom: 20px;
}
.stat-card {
    flex: 1;
    text-align: center;
}
.stat-value {
    font-size: 28px;
    font-weight: bold;
    color: #409EFF;
}
.stat-label {
    font-size: 14px;
    color: #999;
    margin-top: 4px;
}
</style>