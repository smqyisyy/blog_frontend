
<template>
    <el-card class="content-card">
        <template #header>
            <div class="card-header">
                <span>博客标签</span>
                <div>发布时间等</div>
            </div>
        </template>
        <div v-html="content" class="content"></div>
    </el-card>
</template>
 
<script>
import { ref, onMounted } from 'vue'
import { marked } from 'marked'
import { gfmHeadingId } from "marked-gfm-heading-id";
import { getBlogById } from "@/request/api/getBlogInfo";
export default {
    props: {
        blogId: {
            type: Number,
            required: true
        }
    },
    setup(props) {
        const render = new marked.Renderer()
        marked.setOptions({
            renderer: render, // 这是必填项
            gfm: true, // 启动类似于Github样式的Markdown语法
            pedantic: false, // 只解析符合Markdwon定义的，不修正Markdown的错误
            sanitize: true // 原始输出，忽略HTML标签（关闭后，可直接渲染HTML标签）
        })
        // 新版本的marked要用marked-gfm-heading-id插件配置给标题加入id属性
        marked.use(gfmHeadingId({}));
        //  文章内容
        const content = ref('')
        const initContent = () => {
            // 获取当前博客的id
            const blogId = props.blogId;
            console.log(props);
            // 获取id对应数据
            getBlogById(blogId).then(res => {
                console.log(res.data.data);
                content.value = marked(res.data.data.blogContent)
            })
            // const markdownText = ref(`# 一级标题 1
            // ## 二级标题 1.1

            // ### 三级标题 1.1.1

            // 这是一段随机测试内容，包含100字。Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla eget justo vel arcu malesuada varius vel non nisi. Vivamus lacinia lacinia quam, vel tincidunt elit. 

            // ### 三级标题 1.1.2

            // 这是一段随机测试内容，包含100字。Mauris pulvinar justo nec enim pellentesque auctor. Integer malesuada, arcu sit amet feugiat dignissim, justo nunc lacinia massa.

            // ### 三级标题 1.1.3

            // 这是一段随机测试内容，包含100字。Sed rhoncus, purus nec malesuada vestibulum, lectus libero tempus enim, eget mattis dolor metus eu mi.

            // ## 二级标题 1.2

            // ### 三级标题 1.2.1

            // 这是一段随机测试内容，包含100字。Nam scelerisque urna vitae enim malesuada, id feugiat elit tincidunt. Curabitur blandit, lectus sit amet varius pellentesque.

            // ### 三级标题 1.2.2

            // 这是一段随机测试内容，包含100字。Proin ac tortor eget felis dictum pharetra. Vestibulum vestibulum ultricies mi, sed tincidunt arcu malesuada non.

            // ### 三级标题 1.2.3

            // 这是一段随机测试内容，包含100字。Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.

            // # 一级标题 2

            // ## 二级标题 2.1

            // ### 三级标题 2.1.1

            // 这是一段随机测试内容，包含100字。Cras ut dapibus libero. Fusce cursus, nisi non viverra scelerisque, ante erat venenatis dui, vel scelerisque tellus.

            // ### 三级标题 2.1.2

            // 这是一段随机测试内容，包含100字。Vivamus vehicula mauris eu mi vulputate, ut vulputate felis lacinia. Vivamus euismod justo et tristique cursus.

            // ### 三级标题 2.1.3

            // 这是一段随机测试内容，包含100字。Donec in lectus a quam efficitur sodales nec nec lorem. Sed in nulla nec mi tincidunt lacinia.

            // ## 二级标题 2.2

            // ### 三级标题 2.2.1

            // 这是一段随机测试内容，包含100字。Nunc malesuada odio eget nisl elementum, in rhoncus mi cursus. Maecenas quis erat at tellus commodo vulputate.

            // ### 三级标题 2.2.2

            // 这是一段随机测试内容，包含100字。Suspendisse potenti. Ut fringilla quam non semper. Fusce bibendum arcu non consectetur cursus.

            // ### 三级标题 2.2.3

            // 这是一段随机测试内容，包含100字。Morbi auctor venenatis odio, ut tincidunt ex. Nulla facilisi. Sed bibendum diam in massa cursus, vel laoreet libero mattis.

            // # 一级标题 3

            // ## 二级标题 3.1

            // ### 三级标题 3.1.1

            // 这是一段随机测试内容，包含100字。Praesent vitae dapibus lorem. Sed nec mi vel enim faucibus vehicula.

            // ### 三级标题 3.1.2

            // 这是一段随机测试内容，包含100字。Fusce vel arcu sit amet tellus facilisis consectetur. Nullam eu scelerisque lectus, vel interdum ligula.

            // ### 三级标题 3.1.3

            // 这是一段随机测试内容，包含100字。Vestibulum viverra quam ut erat hendrerit, eu iaculis neque scelerisque. Sed euismod vitae arcu in congue.

            // ## 二级标题 3.2

            // ### 三级标题 3.2.1

            // 这是一段随机测试内容，包含100字。Quisque malesuada, quam eget consequat rhoncus, velit velit eleifend ante, eu vulputate quam purus nec orci.

            // ### 三级标题 3.2.2

            // 这是一段随机测试内容，包含100字。Aliquam erat volutpat. Fusce at vestibulum libero. Sed feugiat libero id diam tincidunt mattis.

            // ### 三级标题 3.2.3

            // 这是一段随机测试内容，**包含100字**。In ultrices venenatis consectetur. Suspendisse potenti. Vivamus gravida quam vitae odio dictum, eu dignissim odio feugiat.`)
            // content.value = marked(markdownText.value)
        }

        onMounted(() => {
            initContent()

        })
        return {
            initContent,
            content
        }
    }
}
</script>
<style>
@import url("../../assets/css/markdown-style.css");
</style>