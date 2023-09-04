<!-- 首页的标题组件 -->
<template>
    <div class="home-title">
        <h1>{{ title }}</h1>
        <!-- 会动的子标题 -->
        <ImitateIO :subtitle="subtitle" />
    </div>
</template>

<script>
import { ref } from "vue"
import ImitateIO from '@/components/ImitateIO.vue';
export default {
    components: {
        ImitateIO
    },
    setup() {
        let title = ref("世界很暗,  但是你来了")
        let subtitle = ref(["Never really desperate, only the lost of the soul", "从来没有真正的绝境，只有心灵的迷途"])
        return {
            title,
            subtitle,
        }
    }
}
</script>

<style scoped>
.home-title {
    font-size: 60px;
    line-height: 60px;
    text-align: center;
}
</style>