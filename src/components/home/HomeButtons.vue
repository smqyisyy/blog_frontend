<!-- 首页的按钮组件 -->
<template>
    <div class="home-buttons">
        <MyButton buttonContent="开始阅读" @click="handleRead">
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
</template>

<script>
import MyButton from '@/components/MyButton.vue';
export default {
    components: {
        MyButton
    },
    setup(_, context) {
        function handleRead() {
            context.emit("startRead")
        }
        return {
            handleRead
        }
    }
}
</script>

<style  scoped>

.home-buttons {
    display: flex;
    justify-content: space-between;
}


</style>