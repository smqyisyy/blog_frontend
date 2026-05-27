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
            <div class="search-item" @click="toggleSearch">
                <div class="list_item"><font-awesome-icon icon="fa-solid fa-search" style="color: #fff;" /><span>搜索</span></div>
            </div>
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
        <div class="search-expand" v-if="showSearch">
            <el-input v-model="searchKeyword" placeholder="搜索博客..." size="small" @keyup.enter="doSearch" clearable autofocus>
                <template #append>
                    <el-button @click="doSearch" size="small">
                        <font-awesome-icon icon="fa-solid fa-search" />
                    </el-button>
                </template>
            </el-input>
        </div>
    </div>
</template>

<script>
import { ref } from "vue"
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

.nav .search-expand {
    position: absolute;
    top: 64px;
    left: 0;
    width: 70vw;
    padding: 10px 0;
    background: #fff;
    box-shadow: 0 2px 8px rgba(0,0,0,0.15);
    z-index: 100;
}
</style>