<template>
    <!-- 生成标题导航 -->
    <div class="toc" :class="{ 'is-fixed': isScroll }">
        <el-card>
            <div class="toc-title">
                <font-awesome-icon icon="fa-regular fa-rectangle-list" style="color: #000;" />
                <span class="title">目录</span>
            </div>
            <div class="toc-content">
                <ol class="toc-list">
                    <li v-for="item in headingTree" :key="item.text" class="toc-list-item ">
                        <a :href="`#${item.id}`" target="_self">
                            {{ item.text }}
                        </a>
                        <ol class="toc-list is-collapsed  is-collapsble">
                            <li v-for="item1 in item.children" class="toc-list-item">
                                <a :href="`#${item1.id}`" target="_self">
                                    {{ item1.text }}
                                </a>
                                <ol class="toc-list is-collapsed is-collapsble">
                                    <li v-for="item2 in item1.children" class="toc-list-item">
                                        <a :href="`#${item2.id}`" target="_self">
                                            {{ item2.text }}
                                        </a>
                                    </li>
                                </ol>
                            </li>
                        </ol>
                    </li>
                </ol>
            </div>
        </el-card>
    </div>
</template>
<script>
import { ref, nextTick, onMounted } from "vue";
export default {
    setup() {
        // 获取标题信息并组织成树形结构
        const headingTree = ref([]);
        function getheadingTree() {
            const headings = Array.from(document.querySelectorAll('h1, h2, h3'));
            // 初始化一个根节点对象
            let tree = { id: 'root', level: 0, text: 'Root', children: [] };
            // stack数组用来跟踪当前正在判断的节点，默认从最顶层放入根节点开始
            let stack = [tree];
            // 遍历获取所有标题元素
            headings.forEach((heading) => {
                // 给每个元素添加scroll-margin-top属性解决滚动时被上方fixed布局的导航栏覆盖的问题
                heading.style.scrollMarginTop = "80px"
                const level = parseInt(heading.tagName.charAt(1));
                const id = heading.id;
                const text = heading.textContent;
                const el = function () {
                    return document.querySelector(`a[href="#${id}"]`)?.parentElement?.parentElement;
                }
                const childEl = function () {
                    if (document.querySelector(`a[href="#${id}"]`)?.nextElementSibling?.tagName === "OL") {
                        return document.querySelector(`a[href="#${id}"]`).nextElementSibling;
                    }
                }
                // 构建当前遍历中的标题对象
                const item = { id, level, text, children: [], el, childEl };
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
        // 对选中的目录标题添加is-active类样式并移除其is-collapsed类样式
        function highLight(heading) {
            // 清楚之前的全部高亮样式
            document.querySelectorAll('a.is-active').forEach(a => {
                a.classList.remove('is-active');
            });
            const currentA = document.querySelector(`a[href="#${heading.id}"]`)
            currentA.classList.add('is-active');
        }
        // 处理展开与关闭目录节点,每次将所有其他节点都收起，对本次经过的路径节点展开
        function toggleToc(path) {
            document.querySelectorAll("ol.toc-list.is-collapsble").forEach((ol) => {
                ol.classList.add('is-collapsed');
            });
            path.forEach((ol) => {
                ol?.classList?.remove('is-collapsed');
            });
        }
        // 查找当前目录走过了路径，借助dfs工具函数
        function findPath(root, target) {
            const path = [];
            if (dfs(root, target, path)) {
                return path;
            } else {
                return null;
            }
        }
        // 深度优先遍历
        function dfs(node, target, path) {
            if (node.id === target) {
                if (node.el) {
                    path.push(node.el());
                }
                if (node.childEl) {
                    path.push(node.childEl());
                }
                return true;
            }
            for (const child of node.children) {
                if (dfs(child, target, path)) {
                    if (node.el) {
                        path.push(node.el());
                    }
                    if (node.childEl) {
                        path.push(node.childEl());
                    }
                    return true;
                }
            }
            return false;
        }
        // 防抖函数
        function debunce(fn, delay) {
            let timer;
            return (...args) => {
                clearTimeout(timer);
                timer = setTimeout(() => {
                    fn.apply(this, args);
                }, delay);
            }
        }
        const scrollHandler = debunce(function () {
            // 获取所有标题元素
            const headings = Array.from(document.querySelectorAll('h1, h2, h3'));
            // 获取所有标题的矩形，用于获取当前标题在整个页面的位置
            const rects = headings.map((heading) => heading.getBoundingClientRect())
            const topRange = 200
            for (let i = 0; i < headings.length; i++) {
                const heading = headings[i];
                const rect = rects[i];
                // 如果矩形范围在200px之后，就认为当前标题在顶部
                if (rect.top <= topRange && rect.top >= 80) {
                    highLight(heading);
                    const path = findPath({ children: headingTree.value }, heading.id);
                    toggleToc(path)
                    break;
                }
                // 第二种情况，如果当前标题不在页面，下一个标题也没有进入页面，就应当显示当前区域对应标题的内容
                else if (rect.top < 0 && rect[i + 1] && rect[i + 1].top > document.documentElement.clientHeight) {
                    highLight(heading);
                    const path = findPath({ children: headingTree.value }, heading.id);
                    toggleToc(path)
                    break;
                }
            }
        }
            , 300)
        // 当滚动200px后目录变为fixed布局
        let isScroll = ref(false);
        nextTick(() => {
            getheadingTree()
        })
        onMounted(() => {
            window.addEventListener("scroll",
                function () {
                    // 获取滑动位置，超过200后
                    let scrolltop = document.documentElement.scrollTop || document.body.scrollTop;
                    if (scrolltop >= 200) {
                        isScroll.value = true

                    } else {
                        isScroll.value = false
                    }
                })
            // 监听滚动事件,当标题元素到达位置时自动进行高亮与目录展开
            window.addEventListener("scroll", scrollHandler)
        })
        return {
            headingTree,
            getheadingTree,
            isScroll,
        }
    }
}
</script>

<style>
.toc {
    line-height: 1.5;
    width: 340px;
}

.toc.is-fixed {
    position: fixed;
    top: 70px;
}

.toc .toc-title {
    padding-left: 20px;
}

.toc .toc-title .title {
    margin-left: 10px;
    font-weight: bold;
    font-size: 25px;
}

.toc .toc-content ol.toc-list {
    padding-left: 20px;

}

/* 只拥有此类没有is-collapsed类时为展开效果 */
.toc .toc-content ol.toc-list.is-collapsble {
    max-height: 1000px;
    overflow: hidden;
    transition: all 300ms ease-in-out;
}

/* 移除此类时，可以展开下层目录 */
.toc .toc-content ol.toc-list.is-collapsed {
    max-height: 0;
}

/* 标题的鼠标悬浮效果 */
.toc .toc-content ol.toc-list li.toc-list-item a:hover {
    color: #42b983;
    text-decoration: underline;
    font-weight: bold;
}

/* 为当前选中目录时的效果 */
.toc .toc-content ol.toc-list li.toc-list-item a.is-active {
    color: #42b983;
    font-weight: bold;
}
</style>