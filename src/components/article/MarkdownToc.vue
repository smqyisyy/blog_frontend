<template>
    <div class="toc" :class="{ 'is-fixed': isScroll }">
        <el-card>
            <div class="toc-title">
                <font-awesome-icon icon="fa-regular fa-rectangle-list" style="color: #000;" />
                <span class="title">目录</span>
            </div>
            <div class="toc-content">
                <ol class="toc-list">
                    <li v-for="item in headingTree" :key="item.id" class="toc-list-item">
                        <a :href="`#${item.id}`" @click.prevent="smoothScroll(item.id)">
                            {{ item.text }}
                        </a>
                        <ol class="toc-list is-collapsed is-collapsble">
                            <li v-for="item1 in item.children" :key="item1.id" class="toc-list-item">
                                <a :href="`#${item1.id}`" @click.prevent="smoothScroll(item1.id)">
                                    {{ item1.text }}
                                </a>
                                <ol class="toc-list is-collapsed is-collapsble">
                                    <li v-for="item2 in item1.children" :key="item2.id" class="toc-list-item">
                                        <a :href="`#${item2.id}`" @click.prevent="smoothScroll(item2.id)">
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
import { ref, onMounted, watch, onUnmounted, provide } from "vue";
import { useBlogStore } from "@/store/useBlogStore";
export default {
    setup() {
        const headingTree = ref([]);
        provide('headingTree', headingTree);

        function getheadingTree() {
            const headings = Array.from(document.querySelectorAll('h1, h2, h3'));
            let tree = { id: 'root', level: 0, text: 'Root', children: [] };
            let stack = [tree];
            headings.forEach((heading) => {
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
                const item = { id, level, text, children: [], el, childEl };
                while (stack.length > 1 && stack[stack.length - 1].level >= level) {
                    stack.pop();
                }
                stack[stack.length - 1].children.push(item);
                stack.push(item);
            });
            headingTree.value = tree.children;
        }

        const store = useBlogStore()
        watch(store,
            (state) => {
                if (state.isBlogDataLoaded) {
                    getheadingTree()
                    store.$reset()
                }
            }
        )

        function smoothScroll(id) {
            const el = document.getElementById(id);
            if (el) {
                el.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }

        function highLight(heading) {
            document.querySelectorAll('a.is-active').forEach(a => {
                a.classList.remove('is-active');
            });
            const currentA = document.querySelector(`a[href="#${heading.id}"]`)
            currentA?.classList.add('is-active');
        }

        function toggleToc(path) {
            document.querySelectorAll("ol.toc-list.is-collapsble").forEach((ol) => {
                ol.classList.add('is-collapsed');
            });
            path?.forEach((ol) => {
                ol?.classList?.remove('is-collapsed');
            });
        }

        function findPath(root, target) {
            const path = [];
            if (dfs(root, target, path)) {
                return path;
            } else {
                return null;
            }
        }

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

        function debounce(fn, delay) {
            let timer;
            return (...args) => {
                clearTimeout(timer);
                timer = setTimeout(() => {
                    fn.apply(this, args);
                }, delay);
            }
        }

        const scrollHandler = debounce(function () {
            const headings = Array.from(document.querySelectorAll('h1, h2, h3'));
            const rects = headings.map((heading) => heading.getBoundingClientRect())
            const topRange = 200
            for (let i = 0; i < headings.length; i++) {
                const heading = headings[i];
                const rect = rects[i];
                if (rect.top <= topRange && rect.top >= 0) {
                    highLight(heading);
                    const path = findPath({ children: headingTree.value }, heading.id);
                    toggleToc(path)
                    break;
                }
                else if (rect.top < 0 && rects[i + 1] && rects[i + 1].top > document.documentElement.clientHeight) {
                    highLight(heading);
                    const path = findPath({ children: headingTree.value }, heading.id);
                    toggleToc(path)
                    break;
                }
            }
        }, 100)

        let isScroll = ref(false);
        onMounted(() => {
            window.addEventListener("scroll", function () {
                let scrolltop = document.documentElement.scrollTop || document.body.scrollTop;
                if (scrolltop >= 200) {
                    isScroll.value = true
                } else {
                    isScroll.value = false
                }
            })
            window.addEventListener("scroll", scrollHandler)
        })
        onUnmounted(() => {
            window.removeEventListener("scroll", scrollHandler)
        })
        return {
            headingTree,
            getheadingTree,
            isScroll,
            smoothScroll,
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
    right: calc((100% - var(--content-width)) / 2 + 2%);
}

.toc .toc-title {
    padding-left: 20px;
}

.toc .toc-title .title {
    margin-left: 10px;
    font-weight: bold;
    font-size: 25px;
}

.toc .toc-content {
    max-height: calc(100vh - 140px);
    overflow-y: auto;
}

.toc .toc-content ol.toc-list {
    padding-left: 20px;
}

.toc .toc-content ol.toc-list.is-collapsble {
    max-height: 1000px;
    overflow: hidden;
    transition: all 300ms ease-in-out;
}

.toc .toc-content ol.toc-list.is-collapsed {
    max-height: 0;
}

.toc .toc-content ol.toc-list li.toc-list-item a:hover {
    color: #42b983;
    text-decoration: underline;
    font-weight: bold;
}

.toc .toc-content ol.toc-list li.toc-list-item a.is-active {
    color: #42b983;
    font-weight: bold;
}
</style>
