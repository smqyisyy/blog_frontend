<!-- 标签卡片组件 -->
<template>
    <div class="tag-card">
        <div class="article-tag-containter">
            <font-awesome-icon icon="fa-solid fa-tags" />
            <span class="article-tag">文章标签</span>
        </div>
        <div class="tag-list">
            <div class="tag-item" v-for="(tag, index) in tagsArr" @click="routeToTag(tag.tag, index)">
                <my-tag :tagName="tag.tag" :tag-count="tag.count" :color="getRandomColor()"
                    :isSelected="isSelected(index)" />
            </div>
        </div>
    </div>
    <router-view></router-view>
</template>
<script>
import { getTags } from "@/request/api/getTagInfo"
import MyTag from '@/components/MyTag.vue';
import { ref, onMounted, watch } from "vue"
import { useRouter, useRoute } from "vue-router";
export default {
    components: {
        MyTag
    },
    setup() {
        const tagsArr = ref([])
        onMounted(() => {
            getTags().then((result) => {
                tagsArr.value = result.data.data
            })
        })
        const route = useRoute()
        // 默认第一个
        const selectedIndex = ref(0);
        // 每次变化的时候都将当前选中那个更新为准确的索引
        watch(() => route.params.tag, () => {
            const index = tagsArr.value.findIndex(tag => tag.tag === route.params.tag)
            selectedIndex.value = index !== -1 ? index : 0; // 如果找到索引，就使用该索引；否则使用默认值 0
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
         * 跳转到对应标签的页面
         * @param {*} tag 
         */
        function routeToTag(tag, index) {
            // 更改被选中的按钮索引
            selectedIndex.value = index
            router.push({
                path: `/tags/${tag}`
            })
        }
        const isSelected = (index) => {
            return index === selectedIndex.value
        }
        return {
            tagsArr,
            getRandomColor,
            routeToTag,
            isSelected
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
    margin: 0 .7rem;
}

.tag-card .tag-list {
    width: 70%;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
}

.tag-card .tag-list .tag-item {
    margin: .7rem 1rem;
}

@media (max-width: 992px) {
    .tag-card .article-tag-containter {
        text-align: center;
        font-size: 2rem;
        margin: 2rem 0;
        font-weight: 400;
    }

    .tag-card .tag-list {
        width: fit-content;
    }
}
</style>