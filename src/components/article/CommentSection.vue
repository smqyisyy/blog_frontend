<template>
    <div class="comment-section">
        <el-card>
            <template #header>
                <div class="comment-header">
                    <font-awesome-icon icon="fa-regular fa-comment" />
                    <span>评论 ({{ flatComments.length }})</span>
                </div>
            </template>
            <div class="comment-list" v-if="commentTree.length">
                <template v-for="item in commentTree" :key="item.id">
                    <div class="comment-item">
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
                            <div class="comment-reply-btn" @click="startReply(item)">回复</div>
                            <!-- 嵌套回复 -->
                            <div class="comment-replies" v-if="item.children && item.children.length">
                                <div class="comment-item reply-item" v-for="child in item.children" :key="child.id">
                                    <div class="comment-avatar">
                                        <el-avatar :size="28" :style="{ background: getColor(child.nickname) }">
                                            {{ child.nickname.charAt(0) }}
                                        </el-avatar>
                                    </div>
                                    <div class="comment-body">
                                        <div class="comment-meta">
                                            <span class="comment-nickname">{{ child.nickname }}</span>
                                            <span class="reply-to" v-if="child.replyTo">@{{ child.replyTo }}</span>
                                            <span class="comment-time">{{ child.createdAt }}</span>
                                        </div>
                                        <div class="comment-content">{{ child.content }}</div>
                                        <div class="comment-reply-btn" @click="startReply(child)">回复</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </template>
            </div>
            <div class="no-comment" v-else>暂无评论，来抢沙发吧~</div>
            <el-divider />
            <div class="comment-form">
                <div class="reply-hint" v-if="replyTo">
                    回复 <strong>{{ replyTo.nickname }}</strong>
                    <span class="reply-cancel" @click="cancelReply">&times;</span>
                </div>
                <el-form :model="formData" @submit.prevent="handleSubmit">
                    <el-form-item>
                        <el-input v-model="formData.nickname" placeholder="你的昵称" maxlength="50" style="width: 200px;" />
                        <el-input v-model="formData.email" placeholder="邮箱（选填，方便交流）" maxlength="100" style="width: 260px; margin-left: 10px;" />
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
import { ref, computed, onMounted } from 'vue'
import { getComments, addComment } from '../../request/api/comment'
import { ElMessage } from 'element-plus'

const colors = ['#409EFF', '#67C23A', '#E6A23C', '#F56C6C', '#909399', '#00bcd4', '#9c27b0', '#ff5722']

export default {
    props: {
        blogId: { type: Number, required: true }
    },
    setup(props) {
        const flatComments = ref([])
        const submitting = ref(false)
        const replyTo = ref(null)
        const formData = ref({ nickname: '', email: '', content: '' })

        const commentTree = computed(() => {
            const map = {}
            const roots = []
            flatComments.value.forEach(c => {
                map[c.id] = { ...c, children: [] }
            })
            flatComments.value.forEach(c => {
                if (c.parentId && map[c.parentId]) {
                    map[c.parentId].children.push(map[c.id])
                } else {
                    roots.push(map[c.id])
                }
            })
            // 给子评论标记回复对象昵称
            flatComments.value.forEach(c => {
                if (c.parentId && map[c.parentId]) {
                    map[c.id].replyTo = map[c.parentId].nickname
                }
            })
            return roots
        })

        async function loadComments() {
            try {
                const res = await getComments(props.blogId)
                flatComments.value = res.data.data
            } catch (e) { /* ignore */ }
        }

        function startReply(comment) {
            replyTo.value = comment
            formData.value.content = ''
        }

        function cancelReply() {
            replyTo.value = null
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
                    email: formData.value.email.trim() || null,
                    content: formData.value.content.trim(),
                    parentId: replyTo.value ? replyTo.value.id : null
                })
                ElMessage.success('评论成功')
                formData.value.content = ''
                replyTo.value = null
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

        return { flatComments, commentTree, submitting, formData, replyTo, handleSubmit, startReply, cancelReply, getColor }
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
    max-height: 500px;
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
.reply-to {
    font-size: 12px;
    color: #409EFF;
}
.comment-content {
    font-size: 14px;
    line-height: 1.6;
    color: #555;
    word-break: break-word;
}
.comment-reply-btn {
    font-size: 12px;
    color: #999;
    cursor: pointer;
    margin-top: 4px;
}
.comment-reply-btn:hover {
    color: #409EFF;
}
.comment-replies {
    margin-top: 8px;
    padding-left: 12px;
    border-left: 2px solid #f0f0f0;
}
.reply-item {
    padding: 8px 0;
}
.reply-hint {
    font-size: 14px;
    color: #666;
    margin-bottom: 8px;
    padding: 6px 12px;
    background: #f5f5f5;
    border-radius: 4px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.reply-cancel {
    cursor: pointer;
    font-size: 18px;
    color: #999;
}
.reply-cancel:hover {
    color: #F56C6C;
}
.no-comment {
    text-align: center;
    color: #999;
    padding: 20px 0;
}
</style>
