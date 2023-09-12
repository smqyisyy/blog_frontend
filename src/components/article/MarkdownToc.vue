<template>
    <!-- 生成标题导航 -->
    <div class="toc-content">
        <el-card>
            <div class="toc-title">
                <font-awesome-icon icon="fa-regular fa-rectangle-list" style="color: #000;" />
                <span class="title">目录</span>
            </div>
            <el-tree :data="headingTree" @node-click="handleNodeClick" icon="none" style="font-size: 20px;" />
        </el-card>
    </div>
</template>
<script>
import { ref, nextTick } from "vue";
export default {
    setup() {
        // 获取标题信息并组织成树形结构
        const headingTree = ref([]);
        function getheadingTree() {
            const headings = Array.from(document.querySelectorAll('h1, h2, h3'));
            // 初始化一个根节点对象
            let tree = { label: 'root', level: 0, text: 'Root', children: [] };
            // stack数组用来跟踪当前正在判断的节点，默认从最顶层放入根节点开始
            let stack = [tree];
            // 遍历获取所有标题元素
            headings.forEach((heading) => {
                // 给每个元素添加scroll-margin-top属性解决滚动时被上方fixed布局的导航栏覆盖的问题
                heading.style.scrollMarginTop="70px"
                const level = parseInt(heading.tagName.charAt(1));
                const label = heading.id;
                const text = heading.textContent;
                // 构建当前遍历中的标题对象
                const item = { label, level, text, children: [] };

                // 如果当前标题的级别小于或等于stack中最后一个节点的级别，就会从stack中pop，循环pop到stack中只有一个节点
                while (stack.length > 1 && stack[stack.length - 1].level >= level) {
                    stack.pop();
                }
                // 将当前标题添加为stack中最后一个节点的子节点，建立父子关系
                stack[stack.length - 1].children.push(item);
                // 将当前标题节点对象push进stack，使其成为下一个节点的父节点
                stack.push(item);
            });
            // 从children中取出所有标题的对象数据
            headingTree.value = tree.children;
        }
        // 跳转到对应标题处
        function jumpToAnchor(id) {
            let anchorElement = document.getElementById(id)
            if (anchorElement) {
                anchorElement.scrollIntoView({ behavior: "smooth", block: "start" })
                // anchorElement.scrollTo({
                //     top: 70,
                //     behavior: 'smooth' // 添加 smooth 以实现平滑滚动效果
                // });
            }
            console.log(anchorElement);
        }
        // 点击树形后跳转到对应内容处
        function handleNodeClick(node) {
            jumpToAnchor(node.label)
        }
        nextTick(() => {
            getheadingTree()
        })
        return {
            jumpToAnchor,
            headingTree,
            getheadingTree,
            handleNodeClick
        }
    }
}
</script>

<style>
.toc-content {
    line-height: 1.5;
    
}

.toc-content .toc-title {
    margin-left: 20px;
}

.toc-content .toc-title .title {
    margin-left: 10px;
    font-weight: bold;
    font-size: 25px;
}

.el-tree-node__label:hover {
    color: #42b983;
    text-decoration: underline;
    cursor: pointer;
}

.el-tree-node__content:hover {
    background-color: transparent;
    cursor: default;
}
</style>