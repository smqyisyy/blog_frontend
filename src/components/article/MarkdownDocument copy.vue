<template>
    <div class="md-blog">
        <!-- <h1>博客标题</h1> -->
        <el-card class="content-card">
            <template #header>
                <div class="card-header">
                    <span>博客标签</span>
                    <div>发布时间等</div>
                </div>
            </template>
            <div v-html="parsedMarkdown"></div>
        </el-card>

        <el-card class="sidebar-card">
            <div class="sidebar-title">
                <font-awesome-icon icon="fa-regular fa-rectangle-list" style="color: #000;" />
                <span class="title">目录</span>
            </div>
            <!-- <div v-for="heading in headings" :key="heading.id" class="sidebar-content">
                <a :href="`#${heading.id}`">{{ heading.text }}</a>
            </div> -->
            <ul>
                <template v-for="item in sidebarItems" :key="item.id">
                    <li>
                        <a :href="'#' + item.id" @click="scrollTo(item.id)">{{ item.title }}</a>
                        <ul v-if="item.children.length > 0">
                            <li v-for="child in item.children" :key="child.id">
                                <a :href="'#' + child.id" @click="scrollTo(child.id)">{{ child.title }}</a>
                            </li>
                        </ul>
                    </li>
                </template>
            </ul>
        </el-card>
    </div>
</template>
  
<script>
import { ref, onMounted } from 'vue';
import { marked } from 'marked';
import { gfmHeadingId } from "marked-gfm-heading-id";
export default {
    props: {
        blogID: {
            default: 1
        }
    },
    setup(props) {
        // 博客的id
        const blogID = props.blogID
        // 侧边导航栏数组
        const sidebarItems = ref([])
        // 被解析好的html文本
        const parsedMarkdown = ref("")
        onMounted(() => {
            parseMarkdown();
        })
        // onMounted(() => {
        // const markdownText = '# haproxy\n## 1-ha\n### 1.1-ha\n- 服务器端先初始化Socket，然后与端口绑定(bind)，对端口进行监听(listen)，调用accept阻塞，等待客户端连接。在这时如果有个客户端初始化一个Socket，然后连接服务器(connect)，如果连接成功，这时 客户端与服务器端的连接就建立了。客户端发送数据请求，服务器端接收请求并处理请求，然后把回应 数据发送给客户端，客户端读取数据，最后关闭连接，一次交互结束\n## 2-ha\n### 2.1\n### 2.2\n## 3\n# nginx\n## nginx-1';
        //     const renderer = new marked.Renderer();
        //     renderer.heading = (text, level, raw) => {
        //         const id = raw.toLowerCase().replace(/[^\w]+/g, '-');
        //         headings.value.push({ id, text });
        //         return `<h${level} id="${id}">${text}</h${level}>`;
        //     };

        //     const html = marked(markdownText, { renderer });
        //     renderedMarkdown.value = html;
        // });
        const markdownText = ref('# haproxy\n## 1-ha\n### 1.1-ha\n- 服务器端先初始化Socket，然后与端口绑定(bind)，对端口进行监听(listen)，调用accept阻塞，等待客户端连接。在这时如果有个客户端初始化一个Socket，然后连接服务器(connect)，如果连接成功，这时 客户端与服务器端的连接就建立了。客户端发送数据请求，服务器端接收请求并处理请求，然后把回应 数据发送给客户端，客户端读取数据，最后关闭连接，一次交互结束服务器端先初始化Socket，然后与端口绑定(bind)，对端口进行监听(listen)，调用accept阻塞，等待客户端连接。在这时如果有个客户端初始化一个Socket，然后连接服务器(connect)，如果连接成功，这时 客户端与服务器端的连接就建立了。客户端发送数据请求，服务器端接收请求并处理请求，然后把回应 数据发送给客户端，客户端读取数据，最后关闭连接，一次交互结束服务器端先初始化Socket，然后与端口绑定(bind)，对端口进行监听(listen)，调用accept阻塞，等待客户端连接。在这时如果有个客户端初始化一个Socket，然后连接服务器(connect)，如果连接成功，这时 客户端与服务器端的连接就建立了。客户端发送数据请求，服务器端接收请求并处理请求，然后把回应 数据发送给客户端，客户端读取数据，最后关闭连接，一次交互结束服务器端先初始化Socket，然后与端口绑定(bind)，对端口进行监听(listen)，调用accept阻塞，等待客户端连接。在这时如果有个客户端初始化一个Socket，然后连接服务器(connect)，如果连接成功，这时 客户端与服务器端的连接就建立了。客户端发送数据请求，服务器端接收请求并处理请求，然后把回应 数据发送给客户端，客户端读取数据，最后关闭连接，一次交互结束服务器端先初始化Socket，然后与端口绑定(bind)，对端口进行监听(listen)，调用accept阻塞，等待客户端连接。在这时如果有个客户端初始化一个Socket，然后连接服务器(connect)，如果连接成功，这时 客户端与服务器端的连接就建立了。客户端发送数据请求，服务器端接收请求并处理请求，然后把回应 数据发送给客户端，客户端读取数据，最后关闭连接，一次交互结束服务器端先初始化Socket，然后与端口绑定(bind)，对端口进行监听(listen)，调用accept阻塞，等待客户端连接。在这时如果有个客户端初始化一个Socket，然后连接服务器(connect)，如果连接成功，这时 客户端与服务器端的连接就建立了。客户端发送数据请求，服务器端接收请求并处理请求，然后把回应 数据发送给客户端，客户端读取数据，最后关闭连接，一次交互结束\n## 2-ha\n### 2.1\n### 2.2\n## 3\n# nginx\n## nginx-1\n服务器端先初始化Socket，然后与端口绑定(bind)，对端口进行监听(listen)，调用accept阻塞，等待客户端连接。在这时如果有个客户端初始化一个Socket，然后连接服务器(connect)，如果连接成功，这时 客户端与服务器端的连接就建立了。客户端发送数据请求，服务器端接收请求并处理请求，然后把回应 数据发送给客户端，客户端读取数据，最后关闭连接，一次交互结束');
        function parseMarkdown() {
            // const options = {
            //     prefix: "my-prefix-",
            // };
            // marked.use(gfmHeadingId(options));
            const tokens = marked.lexer(markdownText.value);
            sidebarItems.value = generateSidebarItems(tokens);
            //  { headerIds: true }选项被弃用，想要生成自带id的标题标签要用marked-gfm-heading-id库
            parsedMarkdown.value = marked.parser(tokens);
        }
        function generateSidebarItems(tokens) {
            const headings = tokens.filter(
                (token) => token.type === 'heading' && token.depth <= 3
            );
            const sidebarItems = [];
            let currentItem;
            headings.forEach((heading) => {
                const id = heading.text.replace(/\s+/g, '-').toLowerCase();
                const item = {
                    id,
                    title: heading.text,
                    children: [],
                };
                if (heading.depth === 1) {
                    sidebarItems.push(item);
                    currentItem = item;
                } else if (heading.depth === 2 && currentItem) {
                    currentItem.children.push(item);
                } else if (heading.depth === 3 && currentItem && currentItem.children.length > 0) {
                    currentItem.children[currentItem.children.length - 1].children.push(item);
                }
            });
            return sidebarItems;
        }
        /**
         * 点击后跳转到标题对应文章内容处的
         * @param {*} id 
         */
        function scrollTo(id) {
            const element = document.getElementById(id);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }
       
        return {
            // headings,
            blogID,
            generateSidebarItems,
            parseMarkdown,
            sidebarItems,
            parsedMarkdown,
            scrollTo
        };
    }
};
</script>
  
<style scoped>
.md-blog {
    margin: 0 auto;
    display: flex;
    width: 60%;
    justify-content: space-between;
}

.md-blog .content-card {
    /* flex-grow: 1; */
    width: 65%;
}

.md-blog .sidebar-card {
    /* flex-grow: 2; */
    width: 30%;
}

.md-blog .sidebar-card .sidebar-title {
    /* display: flex;
    justify-content: space-around; */
    font-weight: bold;
    font-size: 28px;
    margin-left: 30px;
}

.md-blog .sidebar-card .sidebar-title .title {
    margin-left: 10px;

}

.md-blog .sidebar-card .sidebar-content {
    margin-left: 30px;
    margin-top: 15px;
    font-size: 22px;
}
</style>