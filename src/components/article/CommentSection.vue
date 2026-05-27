<template>
    <div class="comment-section">
        <el-card>
            <template #header>
                <div class="comment-header">
                    <font-awesome-icon icon="fa-regular fa-comment" />
                    <span>评论 ({{ comments.length }})</span>
                </div>
            </template>
            <div class="comment-list" v-if="comments.length">
                <div class="comment-item" v-for="item in comments" :key="item.id">
                    <div class="comment-avatar">
                        <el-avatar :size="36" :style="{ background: getColor(item.nickname) }">
                            {{ item.nickname.charAt(0) }}
                        </el-avatar>
                    </div>
                    <div class="comment-body">
                        <div class="comment-meta">
                            <span class="comment-nickname">{{ item.nickname }}</span>
                            <span class="comment-time">{{ item.createdAt }}</span>
                        </div>
                        <div class="comment-content">{{ item.content }}</div>
                    </div>
                </div>
            </div>
            <div class="no-comment" v-else>暂无评论，来抢沙发吧~</div>
            <el-divider />
            <div class="comment-form">
                <el-form :model="formData" @submit.prevent="handleSubmit">
                    <el-form-item>
                        <el-input v-model="formData.nickname" placeholder="你的昵称" maxlength="50" style="width: 200px;" />
                    </el-form-item>
                    <el-form-item>
                        <el-input v-model="formData.content" type="textarea" :rows="3" placeholder="写下你的评论..." maxlength="1000" show-word-limit />
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="handleSubmit" :loading="submitting">发表评论</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </el-card>
    </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { getComments, addComment } from '../../request/api/comment'
import { ElMessage } from 'element-plus'

const colors = ['#409EFF', '#67C23A', '#E6A23C', '#F56C6C', '#909399', '#00bcd4', '#9c27b0', '#ff5722']

export default {
    props: {
        blogId: { type: Number, required: true }
    },
    setup(props) {
        const comments = ref([])
        const submitting = ref(false)
        const formData = ref({ nickname: '', content: '' })

        async function loadComments() {
            try {
                const res = await getComments(props.blogId)
                comments.value = res.data.data
            } catch (e) { /* ignore */ }
        }

        async function handleSubmit() {
            if (!formData.value.nickname.trim()) {
                ElMessage.warning('请输入昵称')
                return
            }
            if (!formData.value.content.trim()) {
                ElMessage.warning('请输入评论内容')
                return
            }
            submitting.value = true
            try {
                await addComment({
                    blogId: props.blogId,
                    nickname: formData.value.nickname.trim(),
                    content: formData.value.content.trim()
                })
                ElMessage.success('评论成功')
                formData.value.content = ''
                loadComments()
            } catch (e) {
                ElMessage.error('评论失败')
            }
            submitting.value = false
        }

        function getColor(name) {
            let hash = 0
            for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash)
            return colors[Math.abs(hash) % colors.length]
        }

        onMounted(() => loadComments())

        return { comments, submitting, formData, handleSubmit, getColor }
    }
}
</script>

<style scoped>
.comment-section {
    margin-top: 20px;
}
.comment-header {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 18px;
    font-weight: bold;
}
.comment-list {
    max-height: 400px;
    overflow-y: auto;
}
.comment-item {
    display: flex;
    gap: 12px;
    padding: 12px 0;
    border-bottom: 1px solid #f0f0f0;
}
.comment-item:last-child {
    border-bottom: none;
}
.comment-body {
    flex: 1;
}
.comment-meta {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 6px;
}
.comment-nickname {
    font-weight: bold;
    color: #333;
}
.comment-time {
    font-size: 12px;
    color: #999;
}
.comment-content {
    font-size: 14px;
    line-height: 1.6;
    color: #555;
    word-break: break-word;
}
.no-comment {
    text-align: center;
    color: #999;
    padding: 20px 0;
}
</style>