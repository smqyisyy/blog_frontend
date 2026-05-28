<!-- 博客缩略预览卡片组件 -->
<template>
    <el-card :body-style="{ padding: '0' }" class="blog-card">
        <img :src="imgUrl" class="image" />
        <span class="blog-title" v-if="highlightKeyword" v-html="highlightedTitle"></span>
        <span class="blog-title" v-else>{{ blogTitle }}</span>
        <div style="padding: 14px">
            <div class="blog-content" v-if="highlightKeyword" v-html="highlightedContent"></div>
            <div class="blog-content" v-else>
                {{ displayContent }}
            </div>
            <div class="bottom">
                <time class="time"><font-awesome-icon icon="fa-regular fa-clock" />
                    <span>{{ releaseDate }}</span>
                </time>
                <div class="author-info">
                    <font-awesome-icon icon="fa-solid fa-user" />
                    <span class="author">{{ blogAuthor }}</span>
                </div>
            </div>
            <div class="divider"></div>
        </div>
    </el-card>
</template>

<script>
export default {
    props: {
        blogTitle: {
            default: "第一个blog"
        },
        releaseDate: {
            default: "2023-06-09"
        },
        blogContent: {
            default: ''
        },
        description: {
            default: ''
        },
        blogAuthor: {
            default: "DishDish"
        },
        imgUrl: {
            default: "/images/default-cover.jpg"
        },
        highlightKeyword: {
            default: ''
        }
    },
    setup(props) {
        const blogTitle = props.blogTitle
        const releaseDate = props.releaseDate
        const blogContent = props.blogContent
        const description = props.description
        const blogAuthor = props.blogAuthor
        const imgUrl = props.imgUrl
        const displayContent = description || blogContent.replace(/[#*\[\]!>`\-_~]/g, '').replace(/\n+/g, ' ').trim()

        function highlightText(text, keyword) {
            if (!text || !keyword) return text
            const escaped = keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
            const regex = new RegExp(`(${escaped})`, 'gi')
            return text.replace(regex, '<em class="hl-keyword">$1</em>')
        }

        const highlightedTitle = highlightText(blogTitle, props.highlightKeyword)
        const highlightedContent = highlightText(displayContent, props.highlightKeyword)

        return {
            releaseDate,
            blogContent,
            blogTitle,
            blogAuthor,
            imgUrl,
            displayContent,
            highlightedTitle,
            highlightedContent
        }
    }

}
</script>

<style>
.blog-card {
    width: calc((1125px - 40px) / 3);
    box-sizing: border-box;
    position: relative;
    border-radius: var(--radius-lg);
    transition: .5s;
    cursor: pointer;
}

.blog-card:hover {
    transform: scale(1.05);
}

.blog-card .image {
    width: 100%;
    height: 220px;
}

.blog-card .blog-title {
    color: #fff;
    font-size: 24px;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 150px;
    text-align: center;
}

.blog-card .blog-content {
    font-size: 16px;
    line-height: 1.5;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
}

.blog-card .bottom {
    margin-top: 13px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px 0;
}

.blog-card .divider {
    height: 1px;
    background: linear-gradient(90deg, transparent, #e0e0e0, transparent);
    margin: 8px 0;
}

.blog-card .bottom .time {
    font-size: 14px;
    line-height: 1.5;
    color: var(--color-text-muted);
    display: flex;
    align-items: center;
    gap: 5px;
}

.blog-card .bottom .time span {
    margin-left: 2px;
}

.blog-card .bottom .author-info {
    display: flex;
    align-items: center;
    gap: 5px;
    font-size: 14px;
    color: var(--color-text-muted);
}

/* 关键词高亮 */
.hl-keyword {
    color: #e96900;
    font-style: normal;
    background: #fff3e0;
    padding: 0 2px;
    border-radius: 2px;
}

/* 移动端适配 */
@media (max-width: 992px) {
    .blog-card {
        width: var(--mobile-width);
    }
}
</style>