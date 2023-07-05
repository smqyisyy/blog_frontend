<template>
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
</template>

<script>
import MyIcon from '@/components/MyIcon.vue';
export default {
    setup() {
        let qqNumer = "1052818122"

        return {
            qqNumer
        }
    }
}
</script>

<style scoped>
.social-link {
    display: flex;
    justify-content: space-around;
}
</style>