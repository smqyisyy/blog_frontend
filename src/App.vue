<template>
  <!-- 导航栏 -->
  <nav class="nav-containter" :class="{ 'red-bgc': isScroll }">
    <HeaderNav />
  </nav>
  <!-- 路由切换的内容展示位置 -->
  <router-view />
  <!-- footer -->
  <footer class="footer-containter">
    <MyFooter />
  </footer>
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
  z-index: 100;
}

.nav-containter.red-bgc {
  background-color: #ee6e73;
}

.footer-containter {
  margin-top: 20px;
  height: 147px;
  background-color: #ee6e73;
  display: flex;
  justify-content: center;
}
</style>

<script>
import Home from '@/pages/Home.vue';
import HeaderNav from '@/components/HeaderNav.vue';
import MyFooter from '@/components/MyFooter.vue';
import { ref, onMounted } from "vue"
export default {
  components: {
    Home,
    HeaderNav,
    MyFooter
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