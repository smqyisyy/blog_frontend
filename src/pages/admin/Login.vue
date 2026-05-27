<template>
    <div class="login-page">
        <div class="login-card">
            <h2>博客后台管理</h2>
            <el-input
                v-model="password"
                type="password"
                placeholder="请输入管理密码"
                show-password
                @keyup.enter="handleLogin"
            />
            <el-button type="primary" @click="handleLogin" :loading="loading" style="width: 100%; margin-top: 20px;">
                登录
            </el-button>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAdminStore } from '../../store/useAdminStore'
import { login } from '../../request/api/adminBlog'
import { ElMessage } from 'element-plus'

export default {
    setup() {
        const password = ref('')
        const loading = ref(false)
        const router = useRouter()
        const adminStore = useAdminStore()

        async function handleLogin() {
            if (!password.value) {
                ElMessage.warning('请输入密码')
                return
            }
            loading.value = true
            try {
                const res = await login(password.value)
                adminStore.setToken(res.data.token)
                ElMessage.success('登录成功')
                router.push('/admin')
            } catch (e) {
                ElMessage.error(e.response?.data?.message || '登录失败')
            } finally {
                loading.value = false
            }
        }

        return { password, loading, handleLogin }
    }
}
</script>

<style scoped>
.login-page {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}
.login-card {
    background: #fff;
    padding: 40px;
    border-radius: 12px;
    width: 360px;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
}
.login-card h2 {
    text-align: center;
    margin-bottom: 24px;
    color: #333;
    font-size: 22px;
}
</style>