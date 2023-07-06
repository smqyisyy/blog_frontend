<template>
    <div class="footer">
        <!-- 左边 -->
        <div class="footer-left">
            <div>Copyright © 2022 - 2023 <router-link to="/about">smqy</router-link> | Powered by
                <a href="https://cn.vuejs.org/guide/introduction.html">vue3</a>
            </div>
            <div>本站已运行 {{ runTime }}</div>
        </div>
        <!-- 右边 -->
        <div class="footer-right">
            <HomesIcons></HomesIcons>
        </div>
    </div>
</template>

<script>
import HomesIcons from "@/components/home/HomeIcons.vue"
import { ref, onMounted } from "vue"
export default {
    components: {
        HomesIcons
    },
    setup() {
        let buildTime = "2023-7-6-16:00"
        let nowTime = ref(new Date())
        const runTime = ref(" 5 年 300 天 16 小时 32 分钟 39 秒")
        onMounted(() => {
            console.log(nowTime);
        })
        return {
            runTime,
            nowTime
        }
    }
}
</script>

<style  scoped>
.footer {
    display: flex;
    padding-top: 40px;
    color: #ccc;
}

.footer a {
    color: #fff;
}

.footer .footer-left {
    width: 500px;
    text-align: center;
}

.footer .footer-left div {
    margin: 5px 0;
}

.footer .footer-right {
    width: 150px;
    padding-top: 10px;
    font-size: 18px;
}
</style>