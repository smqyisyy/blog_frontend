<template>
    <el-card shadow="hover" :body-style="{ padding: '0px', width: '350px', height: '390px', position: 'relative' }">
        <img src="../assets/images/5.jpg" class="image" />
        <span class="blog-title">{{ blogTitle }}</span>
        <div style="padding: 14px">
            <div class="blog-content">
                {{ blogContent }}
            </div>
            <div class="bottom">
                <time class="time"><font-awesome-icon icon="fa-regular fa-clock" /><span>{{ releaseDate }}</span></time>
                <div class="author-info">
                    <font-awesome-icon icon="fa-solid fa-user" />
                    <span class="author">DishDish</span>
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
        }
    },
    setup(props) {
        const blogTitle = props.blogTitle
        const releaseDate = props.releaseDate
        const blogContent = props.blogContent
        return {
            releaseDate,
            blogContent,
            blogTitle
        }
    }

}
</script>

<style>
.image {
    width: 100%;
    height: 60%;
}

.blog-title {
    color: #fff;
    font-size: 24px;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 220px;
    text-align: center;

}

.blog-content {
    font-size: 16px;
    line-height: 1.5;
}

.time {
    font-size: 16px;
    line-height: 1.5;
    color: #000;
}

.time span {
    margin-left: 5px;
}

.bottom {
    margin-top: 13px;
    line-height: 12px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}



.author-info {
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 100px;
}
</style>