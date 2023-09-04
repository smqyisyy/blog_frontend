<!-- 返回顶部的按钮组件 -->
<template>
    <div class="back-top-btn">
        <font-awesome-icon icon="fa-solid fa-arrow-up" style="width: color:#fff;" />
    </div>
</template>

<script>
export default {
    setup() {


        return {}
    }
}
</script>

<style  scoped>
.back-top-btn {
    cursor: pointer;
    font-weight: 900;
    border-radius: 50%;
    text-align: center;
    background: linear-gradient(to bottom right, #FF5E3A 0%, #FF2A68 100%);
}
</style>