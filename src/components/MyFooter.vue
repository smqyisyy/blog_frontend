<template>
    <div class="footer">
        <!-- 左边 -->
        <div class="footer-left">
            <div>Copyright © 2022 - 2023 <router-link to="/about">smqy</router-link> | Powered by
                <a href="https://cn.vuejs.org/guide/introduction.html" target="_blank">vue3</a>
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
        let runTime = ref()
        let startTime="2023-01-01 00:00:00"
        const buildTime = new Date(startTime)
        onMounted(() => {
            // 计算运行时间
            window.setInterval(function logname() {
                let staytimeGap = new Date().getTime() - buildTime.getTime();
                let stayDay = Math.floor(staytimeGap / (3600 * 1000 * 24));
                let leave = staytimeGap % (3600 * 1000 * 24);
                let stayHour = Math.floor(leave / (3600 * 1000));
                let leave1 = leave % (3600 * 1000);
                let stayMin = Math.floor(leave1 / (60 * 1000));
                let leave2 = leave1 % (60 * 1000);
                let staySec = Math.floor(leave2 / 1000);
                runTime.value = stayDay + "天" + stayHour + "时" + stayMin + "分" + staySec + "秒";
            }, 1000)
        })
        return {
            runTime,
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