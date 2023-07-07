<template>
    <el-card :body-style="{ padding: '0' }" class="blog-card">
        <img :src="imgUrl" class="image" />
        <span class="blog-title">{{ blogTitle }}</span>
        <div style="padding: 14px">
            <div class="blog-content">
                {{ blogContent }}
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
        </div>
    </el-card>
</template>

<script >
import { ref } from 'vue'
export default {
    props: {
        blogTitle: {
            default: "第一个blog"
        },
        releaseDate: {
            default: "2023-06-09"
        },
        blogContent: {
            default: "2023年6月6日，星期二，我在镇江的极客营进行Java认知实习的第二天。今天的主要内容是使用Java编写一个”万年历”程序，并了解了Java的程序"
        },
        blogAuthor: {
            default: "DishDish"
        },
        imgUrl: {
            default: "https://www.gtrinee.top/medias/featureimages/5.jpg"
        }
    },
    setup(props) {
        const blogTitle = props.blogTitle || "第一个blog"
        const releaseDate = props.releaseDate
        const blogContent = props.blogContent
        const blogAuthor = props.blogAuthor
        const imgUrl = props.imgUrl || "https://www.gtrinee.top/medias/featureimages/5.jpg"
        return {
            releaseDate,
            blogContent,
            blogTitle,
            blogAuthor,
            imgUrl
        }
    }

}
</script>

<style>
.blog-card {
    width: 32%;
    box-sizing: border-box;
    position: relative;
    border-radius: 15px;
    margin-bottom: 20px;
    transition: .5s;
}

.blog-card:hover {
    transform: scale(1.05);
}

.blog-card .image {
    width: 100%;
    height: 220px;
    cursor: pointer;
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
    height: 72px;

}

.blog-card .bottom {
    margin-top: 13px;
    line-height: 12px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.blog-card .bottom .time {
    font-size: 16px;
    line-height: 1.5;
    color: #000;
}

.blog-card .bottom .time span {
    margin-left: 5px;
}





.blog-card .bottom .author-info {
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 100px;
}
</style>