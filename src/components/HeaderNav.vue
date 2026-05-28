<!-- 顶部导航栏组件 -->
<template>
    <div class="nav">
        <!-- 导航栏左侧标题 -->
        <router-link to="/">
            <div class="title">
                <a href="">
                    <img src="@/assets/images/logo.png" alt="">
                    <span>{{ blogTitle }}</span>
                </a>
            </div>
        </router-link>
        <!-- 导航栏右侧的列表选项（桌面端） -->
        <div class="nav_list">
            <div class="list_item" @click="toggleSearch"><font-awesome-icon icon="fa-solid fa-magnifying-glass" style="color: #fff;" /><span>搜索</span></div>
            <div class="list_item" @click="toggleTheme"><font-awesome-icon :icon="isDark ? 'fa-solid fa-sun' : 'fa-solid fa-moon'" style="color: #fff;" /></div>
            <router-link to="/">
                <div class="list_item"><font-awesome-icon icon="fa-solid fa-house" style="color: #fff;" /><span>首页</span>
                </div>
            </router-link>
            <router-link to="/tags">
                <div class="list_item"><font-awesome-icon icon="fa-solid fa-tags" style="color: #fff;" /><span>标签</span>
                </div>
            </router-link>
            <router-link to="/categories">
                <div class="list_item"><font-awesome-icon icon="fa-solid fa-bookmark" style="color: #fff;" /><span>分类</span>
                </div>
            </router-link>
            <router-link to="/archives">
                <div class="list_item"><font-awesome-icon icon="fa-solid fa-box-archive"
                        style="color: #fff;" /><span>归档</span>
                </div>
            </router-link>
            <router-link to="/about">
                <div class="list_item"><font-awesome-icon icon="fa-solid fa-circle-user"
                        style="color: #fff;" /><span>关于</span>
                </div>
            </router-link>
            <a href="/games">
                <div class="list_item"><font-awesome-icon icon="fa-solid fa-gamepad" style="color: #fff;" /><span>小游戏</span>
                </div>
            </a>
        </div>
        <!-- 移动端汉堡菜单按钮 -->
        <div class="hamburger" @click="toggleDrawer">
            <font-awesome-icon :icon="showDrawer ? 'fa-solid fa-xmark' : 'fa-solid fa-bars'" style="color: #fff;" />
        </div>
        <!-- 移动端侧边抽屉 -->
        <div class="drawer-overlay" v-if="showDrawer" @click="showDrawer = false"></div>
        <div class="mobile-drawer" :class="{ open: showDrawer }">
            <div class="drawer-header">
                <span>{{ blogTitle }}</span>
            </div>
            <div class="drawer-menu">
                <router-link to="/" class="drawer-item" @click="showDrawer = false">
                    <font-awesome-icon icon="fa-solid fa-house" /><span>首页</span>
                </router-link>
                <router-link to="/tags" class="drawer-item" @click="showDrawer = false">
                    <font-awesome-icon icon="fa-solid fa-tags" /><span>标签</span>
                </router-link>
                <router-link to="/categories" class="drawer-item" @click="showDrawer = false">
                    <font-awesome-icon icon="fa-solid fa-bookmark" /><span>分类</span>
                </router-link>
                <router-link to="/archives" class="drawer-item" @click="showDrawer = false">
                    <font-awesome-icon icon="fa-solid fa-box-archive" /><span>归档</span>
                </router-link>
                <router-link to="/about" class="drawer-item" @click="showDrawer = false">
                    <font-awesome-icon icon="fa-solid fa-circle-user" /><span>关于</span>
                </router-link>
                <a href="/games" class="drawer-item" @click="showDrawer = false">
                    <font-awesome-icon icon="fa-solid fa-gamepad" /><span>小游戏</span>
                </a>
                <div class="drawer-item" @click="showDrawer = false; toggleSearch()">
                    <font-awesome-icon icon="fa-solid fa-magnifying-glass" /><span>搜索</span>
                </div>
                <div class="drawer-item" @click="showDrawer = false; toggleTheme()">
                    <font-awesome-icon :icon="isDark ? 'fa-solid fa-sun' : 'fa-solid fa-moon'" /><span>{{ isDark ? '浅色模式' : '深色模式' }}</span>
                </div>
            </div>
        </div>
        <!-- 搜索弹框遮罩层 -->
        <div class="search-overlay" v-if="showSearch" @click="showSearch = false">
            <div class="search-modal" @click.stop>
                <div class="search-header">
                    <span class="search-header-title"><font-awesome-icon icon="fa-solid fa-magnifying-glass" /> 搜索</span>
                    <el-input v-model="searchKeyword" placeholder="搜索博客..." size="large" @keyup.enter="doSearch" clearable ref="searchInput" class="search-input" @input="onInput" />
                </div>
                <div class="search-preview" v-if="previewResults.length > 0">
                    <div class="preview-item" v-for="item in previewResults" :key="item.id" @click="goToArticle(item.id)">
                        <img class="preview-cover" :src="item.imgUrl" :alt="item.blogTitle" />
                        <div class="preview-info">
                            <div class="preview-title" v-html="highlight(item.blogTitle)"></div>
                            <div class="preview-desc" v-html="highlight(item.description)"></div>
                            <div class="preview-meta">
                                <span class="preview-category"><font-awesome-icon icon="fa-solid fa-bookmark" /> {{ item.category }}</span>
                                <span class="preview-date"><font-awesome-icon icon="fa-regular fa-clock" /> {{ item.releaseDate }}</span>
                            </div>
                        </div>
                    </div>
                    <div class="preview-more" @click="doSearch">
                        <font-awesome-icon icon="fa-solid fa-magnifying-glass" /> 查看全部搜索结果
                    </div>
                </div>
                <div class="search-preview" v-else-if="previewLoading">
                    <div class="preview-loading">搜索中...</div>
                </div>
                <div class="search-preview" v-else-if="searchKeyword.trim() && !previewLoading && searched">
                    <div class="preview-empty">未找到相关结果</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { ref, onMounted, onBeforeUnmount } from "vue"
import { useRouter } from 'vue-router'
import { searchBlog } from "@/request/api/search"
export default {
    setup() {
        let blogTitle = ref("dishdish")
        const isDark = ref(false)
        const showDrawer = ref(false)
        const showSearch = ref(false)
        const searchKeyword = ref('')
        const router = useRouter()
        const previewResults = ref([])
        const previewLoading = ref(false)
        const searched = ref(false)
        let debounceTimer = null

        function toggleSearch() {
            showSearch.value = !showSearch.value
        }

        function toggleDrawer() {
            showDrawer.value = !showDrawer.value
        }

        function toggleTheme() {
            isDark.value = !isDark.value
            document.documentElement.classList.toggle('dark', isDark.value)
            localStorage.setItem('theme', isDark.value ? 'dark' : 'light')
        }

        function onInput(val) {
            clearTimeout(debounceTimer)
            if (!val || !val.trim()) {
                previewResults.value = []
                searched.value = false
                return
            }
            debounceTimer = setTimeout(async () => {
                previewLoading.value = true
                searched.value = true
                try {
                    const res = await searchBlog(val.trim(), 1)
                    previewResults.value = (res.data.data || []).slice(0, 5)
                } catch {
                    previewResults.value = []
                }
                previewLoading.value = false
            }, 300)
        }

        function highlight(text) {
            if (!text || !searchKeyword.value.trim()) return text
            const kw = searchKeyword.value.trim()
            const regex = new RegExp(`(${kw.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi')
            return text.replace(regex, '<em class="highlight-keyword">$1</em>')
        }

        function goToArticle(id) {
            showSearch.value = false
            searchKeyword.value = ''
            previewResults.value = []
            router.push(`/article/${id}`)
        }

        function doSearch() {
            if (searchKeyword.value.trim()) {
                router.push({ path: '/search', query: { keyword: searchKeyword.value.trim() } })
                showSearch.value = false
                searchKeyword.value = ''
                previewResults.value = []
            }
        }

        function handleClickOutside(e) {
            const nav = document.querySelector('.nav')
            if (showSearch.value && nav && !nav.contains(e.target)) {
                showSearch.value = false
            }
        }

        onMounted(() => {
            document.addEventListener('click', handleClickOutside)
            const saved = localStorage.getItem('theme')
            if (saved === 'dark') {
                isDark.value = true
                document.documentElement.classList.add('dark')
            }
        })
        onBeforeUnmount(() => document.removeEventListener('click', handleClickOutside))

        return { blogTitle, isDark, showDrawer, showSearch, searchKeyword, previewResults, previewLoading, searched, toggleDrawer, toggleSearch, toggleTheme, onInput, highlight, goToArticle, doSearch }
    }
}
</script>

<style scoped>
/* 上方导航栏 */
.nav {
    width: var(--container-width);
    display: flex;
    justify-content: space-between;
}

.nav .title a img {
    width: 40px;
    height: 40px;
    vertical-align: -10px;

}

.nav .title a span {
    font-size: 24px;
    line-height: 64px;
    margin-left: 10px;

}

/* 导航栏右侧列表 */
.nav .nav_list {
    display: flex;
    line-height: 64px;
}

.nav .nav_list .list_item {
    font-size: 15px;
    cursor: pointer;
    padding: 0px 10px;
    transition: .5s;
}

.nav .nav_list .list_item:hover {
    background-color: rgb(0, 0, 0, 0.1);
}

.nav .nav_list .list_item span {
    margin-left: 3px;
}

/* 搜索遮罩层 */
.nav .search-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.5);
    z-index: 200;
    animation: fadeIn 0.2s ease;
}

@keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
}

/* 搜索弹框 - 参考 matery 主题风格 */
.search-modal {
    position: absolute;
    top: 15%;
    left: 50%;
    transform: translateX(-50%);
    width: 80%;
    max-width: 800px;
    min-height: 200px;
    background: #fff;
    border-radius: var(--radius-md);
    padding: 24px 32px;
    box-shadow: 0 24px 48px rgba(0,0,0,0.2);
    animation: modalSlide 0.3s ease;
}

@keyframes modalSlide {
    from { opacity: 0; transform: translateX(-50%) translateY(-30px); }
    to { opacity: 1; transform: translateX(-50%) translateY(0); }
}

.search-header {
    display: flex;
    flex-direction: column;
    gap: 16px;
}

.search-header-title {
    font-size: 1.6rem;
    color: #333;
    font-weight: bold;
}

.search-header-title svg {
    color: #ee6e73;
    margin-right: 8px;
}

.search-input {
    width: 100%;
}

.search-input :deep(.el-input__wrapper) {
    border-radius: 8px;
    box-shadow: 0 0 0 1px #ddd inset;
    padding: 4px 12px;
}

.search-input :deep(.el-input__wrapper:hover) {
    box-shadow: 0 0 0 1px #ee6e73 inset;
}

.search-input :deep(.el-input__wrapper.is-focus) {
    box-shadow: 0 0 0 1px #ee6e73 inset;
}

/* 搜索预览结果 */
.search-preview {
    margin-top: 16px;
    border-top: 1px solid #eee;
    padding-top: 8px;
    max-height: 50vh;
    overflow-y: auto;
}

.preview-item {
    display: flex;
    gap: 14px;
    padding: 12px 8px;
    border-bottom: 1px solid #f0f0f0;
    cursor: pointer;
    border-radius: 8px;
    transition: background 0.2s;
}

.preview-item:hover {
    background: #f9f9f9;
}

.preview-cover {
    width: 80px;
    height: 60px;
    object-fit: cover;
    border-radius: 6px;
    flex-shrink: 0;
}

.preview-info {
    flex: 1;
    min-width: 0;
}

.preview-title {
    font-size: 15px;
    color: #333;
    font-weight: 500;
    margin-bottom: 4px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.preview-desc {
    font-size: 13px;
    color: #888;
    margin-bottom: 6px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.preview-meta {
    display: flex;
    gap: 16px;
    font-size: 12px;
    color: #aaa;
}

.preview-meta .preview-category {
    color: #ee6e73;
}

.preview-more {
    text-align: center;
    padding: 14px;
    color: #ee6e73;
    font-size: 14px;
    cursor: pointer;
    border-radius: 6px;
    transition: background 0.2s;
}

.preview-more:hover {
    background: #fef0f0;
}

.preview-loading,
.preview-empty {
    text-align: center;
    padding: 20px;
    color: #999;
    font-size: 14px;
}

/* 关键词高亮 */
:deep(.highlight-keyword) {
    color: #e96900;
    font-style: normal;
    background: #fff3e0;
    padding: 0 2px;
    border-radius: 2px;
}

/* 汉堡菜单按钮（桌面端隐藏） */
.hamburger {
    display: none;
    font-size: 22px;
    line-height: 64px;
    cursor: pointer;
    padding: 0 8px;
}

/* 移动端侧边抽屉遮罩 */
.drawer-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.4);
    z-index: 300;
    animation: fadeIn 0.2s ease;
}

/* 移动端侧边抽屉 */
.mobile-drawer {
    position: fixed;
    top: 0;
    right: -280px;
    width: 280px;
    height: 100vh;
    background: #fff;
    z-index: 301;
    transition: right 0.3s ease;
    box-shadow: -4px 0 20px rgba(0, 0, 0, 0.15);
    overflow-y: auto;
}

.mobile-drawer.open {
    right: 0;
}

.drawer-header {
    padding: 20px 24px;
    font-size: 20px;
    font-weight: bold;
    color: var(--color-primary);
    border-bottom: 1px solid #f0f0f0;
}

.drawer-menu {
    padding: 8px 0;
}

.drawer-item {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 14px 24px;
    font-size: 16px;
    color: var(--color-text);
    cursor: pointer;
    transition: background 0.2s;
    text-decoration: none;
}

.drawer-item:hover {
    background: var(--color-primary-light);
    color: var(--color-primary);
}

.drawer-item svg {
    width: 18px;
    text-align: center;
    color: var(--color-text-muted);
}

.drawer-item:hover svg {
    color: var(--color-primary);
}

/* 移动端适配 */
@media (max-width: 992px) {
    .nav {
        width: var(--mobile-width);
        padding: 0 12px;
        box-sizing: border-box;
    }

    .nav .nav_list {
        display: none !important;
    }

    .nav .hamburger {
        display: block;
    }
}
</style>