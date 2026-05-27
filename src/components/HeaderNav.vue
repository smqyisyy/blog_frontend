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
            <div class="list_item search-icon" @click="toggleSearch"><font-awesome-icon icon="fa-solid fa-magnifying-glass" style="color: #fff;" /></div>
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
                <div class="search-modal-inner">
                    <font-awesome-icon icon="fa-solid fa-magnifying-glass" class="search-modal-icon" />
                    <el-input v-model="searchKeyword" placeholder="搜索博客..." size="large" @keyup.enter="doSearch" clearable autofocus ref="searchInput" />
                    <el-button type="primary" @click="doSearch" size="large" class="search-btn">搜索</el-button>
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

/* 搜索图标 */
.nav .nav_list .search-icon {
    font-size: 16px;
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

/* 搜索弹框 */
.search-modal {
    position: absolute;
    top: 30%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 50vw;
    max-width: 600px;
    background: #fff;
    border-radius: 12px;
    padding: 30px;
    box-shadow: 0 8px 30px rgba(0,0,0,0.2);
    animation: modalSlide 0.3s ease;
}

@keyframes modalSlide {
    from { opacity: 0; transform: translate(-50%, -50%) translateY(-20px); }
    to { opacity: 1; transform: translate(-50%, -50%) translateY(0); }
}

.search-modal-inner {
    display: flex;
    align-items: center;
    gap: 12px;
}

.search-modal-icon {
    font-size: 20px;
    color: #ee6e73;
}

.search-modal .search-btn {
    background: #ee6e73;
    border-color: #ee6e73;
    color: #fff;
    border-radius: 8px;
}

.search-modal .search-btn:hover {
    background: #d4555a;
    border-color: #d4555a;
}
</style>