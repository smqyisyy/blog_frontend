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
  <!-- 返回顶部按钮 -->
  <div class="back-top-btn-containter animate__animated"
    :class="{ animate__slideOutDown: !backTopBtnShow, animate__slideInUp: backTopBtnShow }" @click="handleBackTop">
    <BackTopBtn />
  </div>
</template>

<style scoped>
/* 第一行导航栏 */
.nav-containter {
  display: flex;
  justify-content: center;
  width: 100vw;
  height: 64px;
  position: fixed;
  top: 0;
  z-index: 100;
}

.nav-containter.red-bgc {
  background-color: #ee6e73;
}

/* 顶部导航栏移动端适配 */
@media (max-width: 992px) {
  .nav-containter {
    display: none;
  }
}

/* 底部使用flex居中 */
.footer-containter {
  margin-top: 30px;
  height: 147px;
  width: 100%;
  background-color: #ee6e73;
  display: flex;
  justify-content: center;
}

/* 返回顶部按钮样式 */
.back-top-btn-containter {
  width: 48px;
  height: 48px;
  font-size: 27px;
  line-height: 48px;
  position: fixed;
  bottom: 20px;
  right: 20px;
}

/* 控制返回顶部按钮的消失与出现样式,使用animatecss */
.animate__slideOutDown,
.animate__slideInUp {
  animation-duration: 300ms;
}
</style>

<script>
import Home from '@/pages/Home.vue';
import HeaderNav from '@/components/HeaderNav.vue';
import MyFooter from '@/components/MyFooter.vue';
import BackTopBtn from '@/components/BackTopBtn.vue';
import { ref, onMounted, onUnmounted } from "vue"
export default {
  components: {
    Home,
    HeaderNav,
    MyFooter,
    BackTopBtn
  },
  setup() {
    let isScroll = ref(false)
    let backTopBtnShow = ref(false)
    const addBgc = function () {
      // 获取滑动位置，超过64后顶部导航栏加一个类，变为红色背景,并添加回到顶部按钮
      let scrolltop = document.documentElement.scrollTop || document.body.scrollTop;
      if (scrolltop >= 64) {
        isScroll.value = true
        backTopBtnShow.value = true
      } else {
        isScroll.value = false
        backTopBtnShow.value = false
      }

    }
    onMounted(() => {
      window.addEventListener("scroll", addBgc)
    })
    onUnmounted(() => {
      window.removeEventListener("scroll", addBgc)
    }),
      // 回到顶部
      function handleBackTop() {
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
    return {
      isScroll,
      backTopBtnShow,
      handleBackTop
    }
  }
}

</script>