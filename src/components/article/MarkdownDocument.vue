<template>
    <div class="md-blog">
        <div class="content">
            <div v-html="renderedMarkdown"></div>
        </div>
        <div class="sidebar">
            <ul>
                <li v-for="heading in headings" :key="heading.id">
                    <a :href="`#${heading.id}`">{{ heading.text }}</a>
                </li>
            </ul>
        </div>
    </div>
</template>
  
<script>
import { ref, onMounted } from 'vue';
import { marked } from 'marked';

export default {
    props:{
        blogID:{
            default:1
        }
    },
    setup(props) {
        const renderedMarkdown = ref('');
        const headings = ref([]);
        // 博客的id
        const blogID=props.blogID
        onMounted(() => {
            const markdownText = '# haproxy\n## 1-ha\n### 1.1-ha\n服务器端先初始化Socket，然后与端口绑定(bind)，对端口进行监听(listen)，调用accept阻塞，等待客户端连接。在这时如果有个客户端初始化一个Socket，然后连接服务器(connect)，如果连接成功，这时 客户端与服务器端的连接就建立了。客户端发送数据请求，服务器端接收请求并处理请求，然后把回应 数据发送给客户端，客户端读取数据，最后关闭连接，一次交互结束\n## 2-ha\n### 2.1\n### 2.2\n## 3\n# nginx\n## nginx-1';
            const renderer = new marked.Renderer();

            renderer.heading = (text, level, raw) => {
                const id = raw.toLowerCase().replace(/[^\w]+/g, '-');
                headings.value.push({ id, text });
                return `<h${level} id="${id}">${text}</h${level}>`;
            };

            const html = marked(markdownText, { renderer });
            renderedMarkdown.value = html;
        });

        return {
            renderedMarkdown,
            headings,
            blogID
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
.sidebar {
    flex-grow: 2;
}

.content {
    flex-grow: 1;
}
</style>