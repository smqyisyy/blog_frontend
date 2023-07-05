<template>
    <div class="home">
        <!-- 中间大标题 -->
        <div class="home-title-containter">
            <HomeTitle />
        </div>
        <!-- 两个按钮 -->
        <div class="home-buttons-containter">
            <HomeButtons />
        </div>
        <!-- icon联系链接 -->
        <div class="social-link-containter">
            <HomeIcons></HomeIcons>
        </div>
        <!-- 我的梦想卡片 -->
        <div class="dream-card-containter">
            <Dream></Dream>
        </div>
        <!-- 博客卡片 -->
        <!-- 分页 -->
        <!-- footer -->
    </div>
</template>

<script>
import Dream from '@/components/Dream.vue';
import HomeButtons from '@/components/home/HomeButtons.vue';
import HomeIcons from '@/components/home/HomeIcons.vue';
import HomeTitle from '@/components/home/HomeTitle.vue';
import { onMounted, ref } from "vue"
export default {
    components: {
        HomeButtons,
        Dream,
        HomeIcons,
        HomeTitle
    },

    setup() {
       
        return {
         
        }
    }
}
</script>

<style scoped>


/* 中间标题 */
.home .home-title-containter {
    margin: 0 auto;
    margin-top: 380px;
    width: 650px;
}

/* 两个按钮 */
.home .home-buttons-containter {
    margin: 0 auto;
    margin-top: 100px;
    width: 400px;
}

/* 联系方式链接 */
.home .social-link-containter {
    width: 200px;
    margin: 0 auto;
    margin-top: 130px;
    font-size: 20px;
}

/* 我的梦想card */
.home .dream-card-containter {
    width: 1125px;
    margin: 0 auto;
    margin-top: 170px;
    overflow: hidden;
    box-sizing: border-box;
}
</style>