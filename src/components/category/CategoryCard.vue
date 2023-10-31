<!-- 分类卡片组件 -->
<template>
    <div class="category-card">
        <div class="article-category-containter">
            <font-awesome-icon icon="fa-solid fa-bookmark" />
            <span class="article-category">文章分类</span>
        </div>
        <div class="category-list">
            <div class="category-item" v-for="category in categoriesArr" @click="routeToCategory(category.category)">
                <my-tag :tagName="category.category" :tag-count="category.count" :color="getRandomColor()" />
            </div>

        </div>
    </div>
</template>
<script>
import { getCategories } from "@/request/api/getCategoryInfo"
import { ref, onMounted } from "vue"
import MyTag from '@/components/MyTag.vue';
import { useRouter } from "vue-router";
export default {
    components: {
        MyTag
    },
    setup() {
        const categoriesArr = ref([])
        onMounted(() => {
            getCategories().then((result) => {
                categoriesArr.value = result.data.data
            })
        })
        function getRandom(min, max) {
            return Math.floor(Math.random() * (max - min) + min)
        }
        // 生成随机颜色
        const colors = [
            "#F9EBEA", "#F5EEF8", "#D5F5E3", "#E8F8F5", "#FEF9E7", "#F8F9F9", "#82E0AA", "#D7BDE2", "#A3E4D7", "#85C1E9", "#F8C471", "#F9E79F",
        ];
        function getRandomColor() {
            return colors[getRandom(0, colors.length)]
        }
        const router = useRouter()
        /**
         * 跳转到对应分类的页面
         * @param {*} category 
         */
        function routeToCategory(category) {
            router.push({
                path: `/categories/${category}`
            })
        }
        return {
            categoriesArr,
            getRandomColor,
            routeToCategory,
        }
    }
}
</script>

<style scoped>
.category-card {
    border-radius: 10px;
    color: #3C4858;
    background-color: #fff;
    padding: 20px 40px;

}

.category-card .article-category-containter {
    text-align: center;
    font-size: 28px;
    margin: 30px 0;
    font-weight: 400;
}

.category-card .article-category-containter .article-category {
    margin: 0 10px;
}

.category-card .category-list {
    width: 70%;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
}

.category-card .category-list .category-item {
    margin: 10px 15px;
}
</style>