<!-- 文章展示页 -->
<template>
    <div class="md-blog-containter">
        {{  }}
        <MarkdownDocument :blogID="blogID"/>
    </div>
</template>

<script>
import MarkdownDocument from '@/components/article/MarkdownDocument.vue';
import { useRoute } from "vue-router";
export default {
    components: {
        MarkdownDocument
    },
    setup() {
        const route=useRoute()
        const blogID=route.params.id
        return {
            blogID
        }
    }
}
</script>

<style  scoped>
.md-blog-containter {
    margin-top: 250px;
    color: #000;
    font-size: 25px;
}
</style>