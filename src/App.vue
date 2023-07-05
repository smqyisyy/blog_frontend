<template>
  <!-- 导航栏 -->
  <nav class="nav-containter" :class="{ 'red-bgc': isScroll }">
    <HeaderNav />
  </nav>
  <!-- 路由切换的内容展示位置 -->
  <router-view />
</template>

<style scoped>
/* 第一行导航栏 */
.nav-containter {
  display: flex;
  justify-content: center;
  width: 100%;
  height: 64px;
  position: fixed;
  top: 0;
  z-index: 0;
}

.nav-containter.red-bgc {
  background-color: #ee6e73;
}
</style>

<script>
import Home from '@/pages/Home.vue';
import HeaderNav from '@/components/HeaderNav.vue';
import { ref, onMounted } from "vue"
export default {
  components: {
    Home,
    HeaderNav
  },
  setup() {
    let isScroll = ref(false)
    onMounted(() => {
      window.addEventListener("scroll", function () {
        // 获取滑动位置，超过64之后上边导航加一个类，变为红色背景
        let scrolltop = document.documentElement.scrollTop || document.body.scrollTop;
        if (scrolltop >= 64) {
          isScroll.value = true
        } else {
          isScroll.value = false
        }
      })
    })
    return {
      isScroll
    }
  }
}

</script>