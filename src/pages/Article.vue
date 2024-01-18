<!-- 文章展示页 -->
<template>
    <div class="md-blog-containter">
        <div class="content-card-contianter">
            <MarkdownDocument :blogId="+blogId" />
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
        const blogId = route.params.id
        return {
            blogId
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

/* 移动端适配隐藏目录 */
@media (max-width: 992px) {
    .md-blog-containter {
        width: 92vw;
        margin-top: 15rem;
    }

    .md-blog-containter .content-card-contianter {
        width: 100%;
    }

    .md-blog-containter .toc-card-containter {
        display: none;
    }
}
</style>