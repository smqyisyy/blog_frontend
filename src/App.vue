
<template>
  <div class="content">
    <!-- 导航栏 -->
    <HeaderNav/>
    <!-- 中间大标题 -->
    <div class="containter">
      <h1>{{ title }}</h1>
      <!-- 会动的子标题 -->
      <ImitateIO :subtitle="subtitle"/>
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


</style>

<script>
import { ref } from "vue"
import HeaderNav from '@/components/HeaderNav.vue';
import ImitateIO from '@/components/ImitateIO.vue';
export default {
  components:{
    HeaderNav,
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