<template>
    <div class="tag-card">
        <div class="article-tag-containter">
            <font-awesome-icon icon="fa-solid fa-tags" />
            <span class="article-tag">文章标签</span>
        </div>
        <div class="tag-list"></div>
    </div>
    <router-view></router-view>
</template>
<script>
export default {
    setup() {

        return {

        }
    }
}
</script>

<style scoped>
.tag-card {
    border-radius: 10px;
    color: #3C4858;
    background-color: #fff;
    padding: 20px 40px;

}

.tag-card .article-tag-containter {
    text-align: center;
    font-size: 28px;
    margin: 30px 0;
    font-weight: 400;
}

.tag-card .article-tag-containter .article-tag {
    margin: 0 10px;
}

.tag-card .tag-list {}
</style>