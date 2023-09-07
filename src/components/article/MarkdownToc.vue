<template>
    <!-- 生成标题导航 -->
    <div class="toc-content">
        <el-card>
            <div class="toc-title">
                <font-awesome-icon icon="fa-regular fa-rectangle-list" style="color: #000;" />
                <span class="title">目录</span>
            </div>
            <el-menu class="el-menu-vertical-demo" @open="handleOpen(item)" @close="handleClose" v-for="item in tocData"
                :key="item.id">
                <el-sub-menu :index="1">
                    <template #title>
                        <el-icon>
                            <location />
                        </el-icon>
                        <span>{{ item.id }}</span>
                    </template>

                    <el-menu-item index="1-1">item one</el-menu-item>
                    <el-menu-item index="1-2">item two</el-menu-item>

                    <el-sub-menu index="1-4">
                        <template #title>item four</template>
                        <el-menu-item index="1-4-1">item one</el-menu-item>
                    </el-sub-menu>
                </el-sub-menu>
            </el-menu>
            <ul>
                <!-- 这里为了设置各级标题的不同样式，添加了类，h1标签类为item-1，h2标签类为item-2 -->
                <li v-for="item in tocData" :key="item.id" :class="`item-${item.tagName.charAt(1)}`"
                    @click="jumpToAnchor(item.id)">
                    {{ item.id }}{{ item.tagName }}
                </li>
            </ul>

        </el-card>
    </div>
</template>
<script>
import { ref, onMounted, nextTick, computed } from "vue";
export default {
    setup() {
        // 初始化标题
        function initToc() {
            // 获取所有h1 h2 h3 标签
            let all_headings = document.querySelectorAll('h1, h2, h3')
            return all_headings
        }
        // 存放 toc 目录数据
        const tocData = ref(null)
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
        // 获取标题信息并组织成树形结构
        const headingTree = ref([]);
        function getheadingTree() {
            const headings = Array.from(document.querySelectorAll('#markdown-content h1, #markdown-content h2, #markdown-content h3'));
            let tree = headingTree.value;
            let stack = [];

            headings.forEach((heading) => {
                const level = parseInt(heading.tagName.charAt(1));

                const id = heading.id;
                const text = heading.textContent;
                const item = { id, text, children: [] };

                while (stack.length >= level) {
                    stack.pop();
                    tree = tree.parent;
                }

                if (stack.length < level) {
                    stack.push(item);
                    tree.children.push(item);
                    item.parent = tree;
                    tree = item;
                }
            })
        }
        function handleOpen(item) {
            console.dir(item);
        }
        nextTick(() => {
            // tocData.value = initToc()
            // tocData.value = headingTree()
            getheadingTree()
            console.log(headingTree);
        })
        return {
            tocData,
            jumpToAnchor,
            handleOpen,
            headingTree,
            getheadingTree
        }
    }
}
</script>

<style scoped>
.toc-content {
    line-height: 1.5;
}

.toc-content .toc-title .title {
    margin-left: 10px;
    font-weight: bold;
    font-size: 25px;
}

ul li:hover {
    cursor: pointer;
    color: #42b983;
    text-decoration: underline;
}

ul li:focus {
    cursor: pointer;
    color: #42b983;
    text-decoration: underline;
}

.item-1 {
    /* font-weight: 700; */
    padding-left: 0;
}

.item-2 {
    padding-left: 20px;
}

.item-3 {
    padding-left: 40px;
}
</style>