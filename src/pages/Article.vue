<!-- 文章展示页 -->
<template>
    <div class="md-blog-containter">
        <div class="content-card-contianter">
            <MarkdownDocument :blogID="blogID" />
        </div>
        <div class="toc-card-containter">
            <MarkdownToc />
        </div>
    </div>
</template>

<script>
import MarkdownDocument from '@/components/article/MarkdownDocument.vue';
import MarkdownToc from '@/components/article/MarkdownToc.vue';
import { useRoute } from "vue-router";
export default {
    components: {
        MarkdownDocument,
        MarkdownToc
    },
    setup() {
        const route = useRoute()
        const blogID = route.params.id
        return {
            blogID
        }
    }
}
</script>

<style  scoped>
.md-blog-containter {
    margin: 250px auto 0 auto;
    color: #000;
    width: 80%;
    display: flex;
    justify-content: space-around;
    /* height: calc(100% - 64px - 150px); */
    overflow: auto;
}

.md-blog-containter .content-card-contianter {
    width: 60%;
    font-size: 22px;
}

.md-blog-containter .toc-card-containter {
    width: 25%;
    font-size: 22px;
}
</style>