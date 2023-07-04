<template>
    <!-- 导航栏左侧标题 -->
    <div class="title">
        <a href="">
            <img src="@/assets/images/logo.png" alt="">
            <span>{{ blogTitle }}</span>
        </a>
    </div>
    <!-- 导航栏右侧的列表选项 -->
    <div class="nav_list">
        <div class="list_item"><font-awesome-icon icon="fa-solid fa-house" style="color: #fff;" /><span>首页</span></div>
        <div class="list_item"><font-awesome-icon icon="fa-solid fa-tags" style="color: #fff;" /><span>标签</span></div>
        <div class="list_item"><font-awesome-icon icon="fa-solid fa-bookmark" style="color: #fff;" /><span>分类</span>
        </div>
        <div class="list_item"><font-awesome-icon icon="fa-solid fa-box-archive" style="color: #fff;" /><span>归档</span>
        </div>
        <div class="list_item"><font-awesome-icon icon="fa-solid fa-circle-user" style="color: #fff;" /><span>关于</span>
        </div>
        <div class="list_item"><font-awesome-icon icon="fa-solid fa-comments" style="color: #fff;" /><span>留言板</span>
        </div>
        <div class="list_item"><font-awesome-icon icon="fa-solid fa-gamepad" style="color: #fff;" /><span>小游戏</span>
        </div>
    </div>
</template>

<script>
import { ref } from "vue"
export default {
    setup() {
        let blogTitle = ref("dishdish")
        return {
            blogTitle
        }
    }
}
</script>

<style scoped>
/* 上方导航栏 */
.title a img {
    width: 40px;
    height: 40px;
    vertical-align: -10px;

}

.title a span {
    font-size: 24px;
    line-height: 64px;
    margin-left: 10px;

}

/* 导航栏右侧列表 */
.nav_list {
    display: flex;
    line-height: 64px;
}

.nav_list .list_item {
    font-size: 15px;
    cursor: pointer;
    padding: 0px 10px;
    transition: .5s;
}

.nav_list .list_item:hover {
    background-color: rgb(103, 160, 186);
}

.nav_list .list_item span {
    margin-left: 3px;
}
</style>