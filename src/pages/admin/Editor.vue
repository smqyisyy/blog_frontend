<template>
    <div class="editor-page">
        <div class="editor-header">
            <el-button @click="goBack">返回</el-button>
            <h2>{{ isNew ? '新建博客' : '编辑博客' }}</h2>
            <el-button type="primary" @click="handleSave" :loading="saving">保存</el-button>
        </div>
        <div class="editor-form">
            <el-form :model="formData" label-width="80px">
                <el-row :gutter="20">
                    <el-col :span="8">
                        <el-form-item label="标题">
                            <el-input v-model="formData.blogTitle" placeholder="博客标题" />
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="分类">
                            <el-input v-model="formData.category" placeholder="分类" />
                        </el-form-item>
                    </el-col>
                    <el-col :span="4">
                        <el-form-item label="作者">
                            <el-input v-model="formData.blogAuthor" placeholder="作者" />
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="发布日期">
                            <el-date-picker v-model="formData.releaseDate" type="date" placeholder="选择日期" value-format="YYYY-MM-DD" style="width: 100%;" />
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="8">
                        <el-form-item label="封面图">
                            <el-input v-model="formData.imgUrl" placeholder="/images/xxx.jpg 或外部URL" />
                        </el-form-item>
                    </el-col>
                    <el-col :span="16">
                        <el-form-item label="标签">
                            <el-select v-model="formData.tags" multiple filterable allow-create default-first-option placeholder="输入标签" style="width: 100%;">
                                <el-option v-for="tag in existingTags" :key="tag" :label="tag" :value="tag" />
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </div>
        <div class="editor-content">
            <MdEditor v-model="formData.blogContent" :onUploadImg="handleUploadImg" />
        </div>
    </div>
</template>

<script>
import { ref, onMounted, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { MdEditor } from 'md-editor-v3'
import 'md-editor-v3/lib/style.css'
import { getBlogByTitle, createBlog, updateBlog, uploadImage } from '../../request/api/adminBlog'
import { getTags } from '../../request/api/getTagInfo'
import { ElMessage } from 'element-plus'

export default {
    components: { MdEditor },
    setup() {
        const router = useRouter()
        const route = useRoute()
        const saving = ref(false)
        const existingTags = ref([])

        const formData = ref({
            blogTitle: '',
            category: '',
            blogAuthor: 'smqy',
            releaseDate: new Date().toISOString().slice(0, 10),
            imgUrl: '/images/default-cover.jpg',
            tags: [],
            blogContent: '',
            originalTitle: ''
        })

        const isNew = computed(() => route.params.blogTitle === 'new')

        async function loadBlog() {
            if (!isNew.value) {
                const blogTitle = decodeURIComponent(route.params.blogTitle)
                try {
                    const res = await getBlogByTitle(blogTitle)
                    const blog = res.data.data
                    formData.value = {
                        blogTitle: blog.blogTitle,
                        category: blog.category,
                        blogAuthor: blog.blogAuthor,
                        releaseDate: blog.releaseDate,
                        imgUrl: blog.imgUrl,
                        tags: [],
                        blogContent: blog.blogContent || '',
                        originalTitle: blog.blogTitle
                    }
                } catch (e) {
                    ElMessage.error('加载博客失败')
                }
            }
        }

        async function loadTags() {
            try {
                const res = await getTags()
                existingTags.value = res.data.data.map(item => item.tag)
            } catch (e) {
                // ignore
            }
        }

        async function handleUploadImg(files, callback) {
            const urls = []
            for (const file of files) {
                try {
                    const res = await uploadImage(file)
                    urls.push(res.data.url)
                } catch (e) {
                    ElMessage.error('图片上传失败')
                }
            }
            callback(urls)
        }

        async function handleSave() {
            if (!formData.value.blogTitle) {
                ElMessage.warning('请填写标题')
                return
            }
            saving.value = true
            try {
                if (isNew.value) {
                    await createBlog(formData.value)
                    ElMessage.success('创建成功')
                } else {
                    await updateBlog(formData.value)
                    ElMessage.success('更新成功')
                }
                router.push('/admin')
            } catch (e) {
                ElMessage.error(e.response?.data?.message || '保存失败')
            } finally {
                saving.value = false
            }
        }

        function goBack() {
            router.push('/admin')
        }

        onMounted(() => {
            loadBlog()
            loadTags()
        })

        return { formData, isNew, saving, existingTags, handleUploadImg, handleSave, goBack }
    }
}
</script>

<style scoped>
.editor-page {
    padding: 20px;
    max-width: 1200px;
    margin: 0 auto;
}
.editor-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
}
.editor-header h2 {
    color: #333;
    margin: 0;
}
.editor-form {
    margin-bottom: 16px;
}
.editor-content {
    height: calc(100vh - 300px);
}
</style>