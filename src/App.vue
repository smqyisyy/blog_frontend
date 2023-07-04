
<template>
  <div class="content">
    <!-- 导航栏 -->
    <HeaderNav />
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
      <MyButton buttonContent="GITHUB" hrefLink="https://github.com/smqyisyy">
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
  </div>
</template>

<style scoped>
/* 主体盒子 */
.content {}



/* 中间标题 */
.content .containter {
  margin-top: 320px;
  font-size: 60px;
  text-align: center;
}

.content .button-containter {
  margin-top: 100px;
  display: flex;
  justify-content: center;
}

.content .button-containter a:nth-child(1) {
  margin-right: 30px;
}

.content .social-link {
  margin-top: 130px;
  display: flex;
  justify-content: center;
}
.content .social-link a {
  margin: 0 20px;
}
</style>

<script>
import { ref } from "vue"
import HeaderNav from '@/components/HeaderNav.vue';
import ImitateIO from '@/components/ImitateIO.vue';
import MyButton from '@/components/MyButton.vue';
import MyIcon from '@/components/MyIcon.vue';
export default {
  components: {
    HeaderNav,
    ImitateIO,
    MyButton,
    MyIcon
  },
  setup() {
    let title = ref("世界很暗,  但是你来了")
    let subtitle = ref(["Never really desperate, only the lost of the soul", "从来没有真正的绝境，只有心灵的迷途"])

    let qqNumer = "1052818122"

    return {
      title,
      subtitle,
      qqNumer
    }
  }
}

</script>