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
        <!-- 导航栏右侧的列表选项 -->
        <div class="nav_list">
            <div class="list_item" @click="toggleSearch"><font-awesome-icon icon="fa-solid fa-magnifying-glass" style="color: #fff;" /><span>搜索</span></div>
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
        <!-- 搜索弹框遮罩层 -->
        <div class="search-overlay" v-if="showSearch" @click="showSearch = false">
            <div class="search-modal" @click.stop>
                <div class="search-header">
                    <span class="search-header-title"><font-awesome-icon icon="fa-solid fa-magnifying-glass" /> 搜索</span>
                    <el-input v-model="searchKeyword" placeholder="搜索博客..." size="large" @keyup.enter="doSearch" clearable ref="searchInput" class="search-input" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { ref, onMounted, onBeforeUnmount } from "vue"
import { useRouter } from 'vue-router'
export default {
    setup() {
        let blogTitle = ref("dishdish")
        const showSearch = ref(false)
        const searchKeyword = ref('')
        const router = useRouter()

        function toggleSearch() {
            showSearch.value = !showSearch.value
        }

        function doSearch() {
            if (searchKeyword.value.trim()) {
                router.push({ path: '/search', query: { keyword: searchKeyword.value.trim() } })
                showSearch.value = false
                searchKeyword.value = ''
            }
        }

        function handleClickOutside(e) {
            const nav = document.querySelector('.nav')
            if (showSearch.value && nav && !nav.contains(e.target)) {
                showSearch.value = false
            }
        }

        onMounted(() => document.addEventListener('click', handleClickOutside))
        onBeforeUnmount(() => document.removeEventListener('click', handleClickOutside))

        return { blogTitle, showSearch, searchKeyword, toggleSearch, doSearch }
    }
}
</script>

<style scoped>
/* 上方导航栏 */
.nav {
    width: 70vw;
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
    border-radius: 12px;
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
</style>