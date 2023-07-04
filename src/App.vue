
<template>
  <div class="content">
    <!-- 导航栏 -->
    <nav class="nav-containter" :class="{ 'red-bgc': isScroll }">
      <div class="nav">
        <HeaderNav />
      </div>
    </nav>
    <!-- 中间大标题 -->

    <div class="containter">
      <h1>{{ title }}</h1>
      <!-- 会动的子标题 -->
      <ImitateIO :subtitle="subtitle" />
    </div>
    <!-- 两个按钮 -->

    <div class="button-containter">
      <MyButton buttonContent="开始阅读">
        <template #icon>
          <font-awesome-icon icon="fa-solid fa-angles-down" style="color: #fff;" />
        </template>
      </MyButton>
      <MyButton buttonContent="GITHUB" hrefLink="https://github.com/smqyisyy" :needChange="true">
        <template #icon>
          <font-awesome-icon icon="fa-brands fa-github-alt" style="color: #fff;" />
        </template>
      </MyButton>
    </div>

    <!-- icon联系链接 -->
    <div class="social-link">
      <MyIcon popContent="访问我的GitHub" hrefLink="https://github.com/smqyisyy">
        <template #icon>
          <font-awesome-icon icon="fa-brands fa-github" style="color: #fff;" />
        </template>
      </MyIcon>
      <MyIcon :popContent="`邮件联系我`" :hrefLink="`mailto:${qqNumer}@qq.com`">
        <template #icon>
          <font-awesome-icon icon="fa-solid fa-envelope-open" style="color: #fff;" />
        </template>
      </MyIcon>
      <MyIcon :popContent="`QQ联系我：${qqNumer}`"
        :hrefLink="`tencent://AddContact/?fromId=50&fromSubId=1&subcmd=all&uin=${qqNumer}`">
        <template #icon>
          <font-awesome-icon icon="fa-brands fa-qq" style="color: #fff;" />
        </template>
      </MyIcon>
    </div>
    <!-- 我的梦想卡片 -->
    <div class="dream-card">
      <Dream></Dream>

    </div>

  </div>
</template>

<style scoped>
/* 主体盒子 */
.content {}

/* 第一行导航栏 */
.content .nav-containter {
  display: flex;
  justify-content: center;
  width: 100%;
  height: 64px;
  position: fixed;
  top: 0;
}

.content .nav-containter .nav {
  width: 1125px;
  display: flex;
  justify-content: space-between;
}

.content .nav-containter.red-bgc {
  background-color: #ee6e73;
}


/* 中间标题 */
.content .containter {
  margin-top: 380px;
  font-size: 60px;
  line-height: 60px;
  text-align: center;
}

/* 两个按钮 */
.content .button-containter {
  margin-top: 100px;
  display: flex;
  justify-content: center;
}

.content .button-containter a:nth-child(1) {
  margin-right: 30px;
}

/* 联系方式链接 */
.content .social-link {
  margin-top: 130px;
  display: flex;
  justify-content: center;
}

.content .social-link a {
  margin: 0 20px;
}

/* 我的梦想card */
.content .dream-card {
  background-color: #fff;
  width: 1045px;
  color: black;
  margin: 0 auto;
  margin-top: 170px;
}
</style>

<script>
import { ref } from "vue"
import HeaderNav from '@/components/HeaderNav.vue';
import ImitateIO from '@/components/ImitateIO.vue';
import MyButton from '@/components/MyButton.vue';
import MyIcon from '@/components/MyIcon.vue';
import Dream from '@/components/Dream.vue';

export default {
  components: {
    HeaderNav,
    ImitateIO,
    MyButton,
    MyIcon,
    Dream
  },
  setup() {
    let title = ref("世界很暗,  但是你来了")
    let subtitle = ref(["Never really desperate, only the lost of the soul", "从来没有真正的绝境，只有心灵的迷途"])
    let qqNumer = "1052818122"
    let isScroll = ref(false)
    return {
      title,
      subtitle,
      qqNumer,
      isScroll,
    }
  }
}

</script>