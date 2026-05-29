<template>
    <div class="admin-page">
        <div class="admin-header">
            <h2>博客管理后台</h2>
            <div class="header-actions">
                <el-button type="primary" @click="goCreate">新建博客</el-button>
                <el-button @click="$router.push('/admin/comments')">评论管理</el-button>
                <el-button @click="$router.push('/admin/tags')">标签管理</el-button>
                <el-button @click="pwdDialogVisible = true">修改密码</el-button>
                <el-button @click="handleLogout">退出登录</el-button>
            </div>
        </div>

        <el-dialog v-model="pwdDialogVisible" title="修改密码" width="400px">
            <el-form label-width="80px">
                <el-form-item label="旧密码">
                    <el-input v-model="pwdForm.oldPassword" type="password" show-password />
                </el-form-item>
                <el-form-item label="新密码">
                    <el-input v-model="pwdForm.newPassword" type="password" show-password />
                </el-form-item>
            </el-form>
            <template #footer>
                <el-button @click="pwdDialogVisible = false">取消</el-button>
                <el-button type="primary" @click="handleChangePassword" :loading="pwdLoading">确定</el-button>
            </template>
        </el-dialog>
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
        <!-- 访问统计 -->
        <el-card class="visit-stats-card" shadow="hover">
            <template #header>
                <div class="card-header">
                    <span>访问统计</span>
                </div>
            </template>
            <div class="visit-summary">
                <div class="visit-item">
                    <div class="visit-value">{{ visitStats.totalVisits }}</div>
                    <div class="visit-label">总访问量</div>
                </div>
                <div class="visit-item">
                    <div class="visit-value">{{ visitStats.uniqueVisitors }}</div>
                    <div class="visit-label">独立访客</div>
                </div>
                <div class="visit-item">
                    <div class="visit-value">{{ visitStats.todayVisits }}</div>
                    <div class="visit-label">今日访问</div>
                </div>
            </div>
            <!-- 每日趋势图 -->
            <div class="daily-chart" v-if="visitStats.dailyVisits.length">
                <div class="chart-title">近7天访问趋势</div>
                <div class="chart-bars">
                    <div class="bar-item" v-for="day in visitStats.dailyVisits" :key="day.date">
                        <div class="bar-wrapper">
                            <div class="bar" :style="{ height: (day.count / maxDailyVisits * 100) + '%' }">
                                <span class="bar-value">{{ day.count }}</span>
                            </div>
                        </div>
                        <div class="bar-label">{{ day.date.slice(5) }}</div>
                    </div>
                </div>
            </div>
            <!-- 热门文章 -->
            <div class="top-articles" v-if="visitStats.topArticles.length">
                <div class="chart-title">热门文章 TOP10</div>
                <el-table :data="visitStats.topArticles" stripe size="small">
                    <el-table-column prop="blogTitle" label="文章标题" />
                    <el-table-column prop="views" label="阅读量" width="100" align="center" />
                </el-table>
            </div>
        </el-card>
        <!-- 地区分布 -->
        <div class="region-cards">
            <el-card class="region-card" shadow="hover">
                <template #header>
                    <div class="card-header"><span>省份分布 TOP15</span></div>
                </template>
                <div class="region-bars" v-if="visitStats.regions.length">
                    <div class="region-bar-item" v-for="item in visitStats.regions" :key="item.province">
                        <span class="region-name">{{ item.province }}</span>
                        <div class="region-bar-bg">
                            <div class="region-bar" :style="{ width: (item.count / maxRegion * 100) + '%' }"></div>
                        </div>
                        <span class="region-count">{{ item.count }}</span>
                    </div>
                </div>
                <div class="no-data" v-else>暂无数据</div>
            </el-card>
            <el-card class="region-card" shadow="hover">
                <template #header>
                    <div class="card-header"><span>城市分布 TOP15</span></div>
                </template>
                <div class="region-bars" v-if="visitStats.cities.length">
                    <div class="region-bar-item" v-for="item in visitStats.cities" :key="item.city">
                        <span class="region-name">{{ item.city }}</span>
                        <div class="region-bar-bg">
                            <div class="region-bar city-bar" :style="{ width: (item.count / maxCity * 100) + '%' }"></div>
                        </div>
                        <span class="region-count">{{ item.count }}</span>
                    </div>
                </div>
                <div class="no-data" v-else>暂无数据</div>
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
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAdminStore } from '../../store/useAdminStore'
import { getBlogList, deleteBlog, uploadMd, getDashboardStats, changePassword } from '../../request/api/adminBlog'
import { getVisitStats } from '../../request/api/visit'
import { ElMessage } from 'element-plus'

export default {
    setup() {
        const blogList = ref([])
        const stats = ref({ blogs: 0, comments: 0, categories: 0, tags: 0 })
        const visitStats = ref({ totalVisits: 0, uniqueVisitors: 0, todayVisits: 0, dailyVisits: [], topArticles: [], regions: [], cities: [] })
        const pwdDialogVisible = ref(false)
        const pwdLoading = ref(false)
        const pwdForm = ref({ oldPassword: '', newPassword: '' })
        const router = useRouter()
        const adminStore = useAdminStore()

        async function loadStats() {
            try {
                const res = await getDashboardStats()
                stats.value = res.data
            } catch (e) { /* ignore */ }
        }

        async function loadVisitStats() {
            try {
                const res = await getVisitStats(7)
                visitStats.value = res.data
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

        async function handleChangePassword() {
            if (!pwdForm.value.oldPassword || !pwdForm.value.newPassword) {
                ElMessage.warning('请填写完整')
                return
            }
            pwdLoading.value = true
            try {
                await changePassword(pwdForm.value.oldPassword, pwdForm.value.newPassword)
                ElMessage.success('密码修改成功，请重新登录')
                pwdDialogVisible.value = false
                pwdForm.value = { oldPassword: '', newPassword: '' }
                adminStore.logout()
                router.push('/admin/login')
            } catch (e) {
                ElMessage.error(e.response?.data?.message || '修改失败')
            }
            pwdLoading.value = false
        }

        onMounted(() => {
            loadStats()
            loadBlogs()
            loadVisitStats()
        })

        const maxDailyVisits = computed(() => {
            if (!visitStats.value.dailyVisits.length) return 1
            return Math.max(...visitStats.value.dailyVisits.map(d => d.count), 1)
        })

        const maxRegion = computed(() => {
            if (!visitStats.value.regions.length) return 1
            return Math.max(...visitStats.value.regions.map(r => r.count), 1)
        })

        const maxCity = computed(() => {
            if (!visitStats.value.cities.length) return 1
            return Math.max(...visitStats.value.cities.map(c => c.count), 1)
        })

        return {
            blogList, stats, visitStats, maxDailyVisits, maxRegion, maxCity,
            pwdDialogVisible, pwdLoading, pwdForm,
            goCreate, goEdit, handleDelete, handleLogout,
            beforeMdUpload, handleMdUpload, handleChangePassword
        }
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
.visit-stats-card {
    margin-bottom: 20px;
}
.visit-stats-card .card-header {
    font-weight: bold;
    font-size: 16px;
}
.visit-summary {
    display: flex;
    justify-content: space-around;
    padding: 15px 0 25px;
    border-bottom: 1px solid #eee;
    margin-bottom: 20px;
}
.visit-item {
    text-align: center;
}
.visit-value {
    font-size: 32px;
    font-weight: bold;
    color: #67C23A;
}
.visit-label {
    font-size: 14px;
    color: #999;
    margin-top: 4px;
}
.daily-chart {
    margin-bottom: 20px;
}
.chart-title {
    font-size: 15px;
    font-weight: bold;
    color: #333;
    margin-bottom: 15px;
}
.chart-bars {
    display: flex;
    align-items: flex-end;
    height: 150px;
    gap: 10px;
    padding: 0 10px;
}
.bar-item {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;
}
.bar-wrapper {
    flex: 1;
    width: 100%;
    display: flex;
    align-items: flex-end;
    justify-content: center;
}
.bar {
    width: 70%;
    max-width: 50px;
    background: linear-gradient(180deg, #409EFF, #66b1ff);
    border-radius: 4px 4px 0 0;
    min-height: 4px;
    position: relative;
    transition: height 0.5s ease;
}
.bar-value {
    position: absolute;
    top: -20px;
    left: 50%;
    transform: translateX(-50%);
    font-size: 12px;
    color: #409EFF;
    font-weight: bold;
}
.bar-label {
    font-size: 12px;
    color: #999;
    margin-top: 8px;
}
.top-articles {
    margin-top: 10px;
}
.top-articles .chart-title {
    margin-bottom: 10px;
}
.region-cards {
    display: flex;
    gap: 16px;
    margin-bottom: 20px;
}
.region-card {
    flex: 1;
}
.region-card .card-header {
    font-weight: bold;
    font-size: 16px;
}
.region-bars {
    display: flex;
    flex-direction: column;
    gap: 10px;
}
.region-bar-item {
    display: flex;
    align-items: center;
    gap: 10px;
}
.region-name {
    width: 70px;
    font-size: 13px;
    color: #606266;
    text-align: right;
    flex-shrink: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.region-bar-bg {
    flex: 1;
    height: 18px;
    background: #f5f5f5;
    border-radius: 4px;
    overflow: hidden;
}
.region-bar {
    height: 100%;
    background: linear-gradient(90deg, #67C23A, #95d475);
    border-radius: 4px;
    transition: width 0.5s ease;
    min-width: 4px;
}
.city-bar {
    background: linear-gradient(90deg, #E6A23C, #f0c78a);
}
.region-count {
    width: 40px;
    font-size: 13px;
    color: #999;
    text-align: right;
    flex-shrink: 0;
}
.no-data {
    text-align: center;
    color: #999;
    padding: 20px 0;
}
</style>