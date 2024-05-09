<template>
    <el-card class="content-card">
        <!-- 内容 -->
        <div class="content" v-html="cardContent">
        </div>
    </el-card>
</template>

<script>
export default {
    props: {
        cardContent: {
            type: String,
            required: true
        }
    },
    setup(props) {

        const cardContent = props.cardContent
        return {
            cardContent
        }
    }
}
</script>

<style>
/* markdown样式 */
@import url("../../assets/css/markdown-style.css");
</style>
<style scoped>
.content-card .content {
    padding: 2em 2em;
    line-height: 1.5;

}
</style>