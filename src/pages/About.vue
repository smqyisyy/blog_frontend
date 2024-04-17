<!-- 关于页 -->
<template>

    <div class="middle-title-containter">
        <MiddleTitle />
    </div>
    <div class="about-container">
        <AboutCard :cardContent="content" />
    </div>
</template>

<script>
import MiddleTitle from "@/components/MiddleTitle.vue";
import AboutCard from "@/components/about/AboutCard.vue";
import { ref } from "vue";
import { marked } from 'marked'
export default {
    components: {
        MiddleTitle,
        AboutCard
    },
    setup() {
        const render = new marked.Renderer()
        marked.setOptions({
            renderer: render, // 这是必填项
            gfm: true, // 启动类似于Github样式的Markdown语法
            pedantic: false, // 只解析符合Markdwon定义的，不修正Markdown的错误
            sanitize: true // 原始输出，忽略HTML标签（关闭后，可直接渲染HTML标签）
        })
        let content = ref(`# 关于本站与作者

## 前端

Vue3+Vite+ElementPlus+VueRouter+Pinia+Axios

字体库使用了[Font Awesome](https://fa5.dashgame.com/#/)

github地址:https://github.com/smqyisyy/front_backend

## 后端

NodeJs的koa2框架

github地址:https://github.com/smqyisyy/blog_backend

## 数据库

使用了MySQL 5.7数据库

## 本站的部署

本站部署在腾讯云新加坡节点服务器中，因为境外节点可以不用备案，为了省去备案的麻烦所有选择了境外的服务器，但是国内网络问题，有时候访问速度会相对有点慢

部署的时候后端**nodejs**通过pm2直接后台运行，用**容器**启动了**nginx**给后端做**反向代理**来解决前后端的跨域问题

前端的打包产物直接放在了nginx的首页目录下，前端仓库接入了**github的工作流**，每次更新的时候自动把新的前端打包直接放到服务器的nginx容器挂载目录下

**MySQL数据库**也直接用了容器挂载数据卷的方式进行搭建

## 本站的开发心路历程

其实本站的外观是参考了一个hexo的博客模板，闪烁之狐[戳这里](https://blinkfox.github.io/about/)

之前其实也有用过lnmp，hexo搭过博客感觉都是用别人写好的东西，不是自己写的还是没内味，最后就决定自己手写一个自己的博客，刚好那段时间对于前端比较感兴趣，就自己尝试从零开始写了本站这样的一个博客站点

对于程序员来说设计页面样式什么的是真滴难，最后还是找了个个人感觉长得还相对挺好看的站点，就上面这个闪烁之狐的模板，自己用样式把里面的一些效果全都实现了一遍，也还是比较有成就感的（但是确实也没复刻的一模一样，有些功能我也偷了个懒就没实现了🤭）

最开始其实就是随便写写，闲的时候写写代码，但是项目一旦开始，就还是希望可以把项目写完，不要烂尾，所以后来虽然工作不那么闲，还是抽了一些休息时间接着完成本站，本站的开发周期也确实有点久（看github提交记录时间就看出来了），最开始还是在本地测试环境随便写写（当时也想着给我的学生当个项目拿去用也可以😂），后来大体博客功能都有了，那就顺便再买个服务器部署一下算了，到后面就慢慢的变成了现在这个样子，但是其实还是有很多功能还是想要慢慢加上去的，就看我心情，什么时候闲下来，就回来再看看再加点功能，也把本站当作一个学习前端过程中的练手项目

如果你对本站也比较感兴趣的话，代码也都是开源的，直接拿去部署就好了，想要联系我的话博客主页也有我的邮箱和qq，欢迎有技术问题一起讨论交流

## 关于作者

其实我并不是一个做前端开发的程序员，其实是一名**运维工程师**，如果再仔细分类的话应该算是**DBA**，之前在深圳**腾讯TEG**做**云数据库**相关的运维工作，主要技术栈也是Linux，MySQL，Docker相关的，目前在一家大学生培训公司做云计算讲师的工作，也是心血来潮，在不用上课的空闲之余学习了一下前端开发技术，练练手写了这样的一个博客站。`)
        content.value = marked(content.value)
        return {
            content
        }
    }
}
</script>


<style scoped>

.middle-title-containter {
    margin-top: 250px;
}

.about-container {
    width: 80vw;
    margin: 100px auto;
}
</style>