<template>
    <div class="mobile-toc-wrapper" v-if="headingTree.length">
        <div class="mobile-toc-btn" @click="drawerVisible = true">
            <font-awesome-icon icon="fa-regular fa-rectangle-list" />
        </div>
        <Teleport to="body">
            <div class="mobile-toc-overlay" v-if="drawerVisible" @click="drawerVisible = false"></div>
            <div class="mobile-toc-drawer" :class="{ open: drawerVisible }">
                <div class="drawer-header">
                    <span>目录</span>
                    <span class="drawer-close" @click="drawerVisible = false">&times;</span>
                </div>
                <div class="drawer-body">
                    <ol class="drawer-toc-list">
                        <li v-for="item in headingTree" :key="item.id" class="drawer-toc-item">
                            <a :href="`#${item.id}`" @click.prevent="goTo(item.id)">{{ item.text }}</a>
                            <ol class="drawer-toc-list" v-if="item.children.length">
                                <li v-for="item1 in item.children" :key="item1.id" class="drawer-toc-item">
                                    <a :href="`#${item1.id}`" @click.prevent="goTo(item1.id)">{{ item1.text }}</a>
                                    <ol class="drawer-toc-list" v-if="item1.children.length">
                                        <li v-for="item2 in item1.children" :key="item2.id" class="drawer-toc-item">
                                            <a :href="`#${item2.id}`" @click.prevent="goTo(item2.id)">{{ item2.text }}</a>
                                        </li>
                                    </ol>
                                </li>
                            </ol>
                        </li>
                    </ol>
                </div>
            </div>
        </Teleport>
    </div>
</template>

<script>
import { ref, inject } from 'vue'
export default {
    setup() {
        const headingTree = inject('headingTree', ref([]))
        const drawerVisible = ref(false)

        function goTo(id) {
            const el = document.getElementById(id)
            if (el) {
                el.scrollIntoView({ behavior: 'smooth', block: 'start' })
            }
            drawerVisible.value = false
        }

        return { headingTree, drawerVisible, goTo }
    }
}
</script>

<style scoped>
.mobile-toc-btn {
    position: fixed;
    right: 20px;
    bottom: 80px;
    width: 44px;
    height: 44px;
    border-radius: 50%;
    background: #409EFF;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.3);
    cursor: pointer;
    z-index: 2000;
    transition: transform 0.2s;
}

.mobile-toc-btn:active {
    transform: scale(0.9);
}

@media (min-width: 993px) {
    .mobile-toc-btn {
        display: none;
    }
}

.mobile-toc-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.4);
    z-index: 2500;
}

.mobile-toc-drawer {
    position: fixed;
    top: 0;
    right: -280px;
    width: 280px;
    height: 100%;
    background: #fff;
    z-index: 3000;
    transition: right 0.3s ease;
    display: flex;
    flex-direction: column;
}

.mobile-toc-drawer.open {
    right: 0;
}

.drawer-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px 20px;
    font-size: 18px;
    font-weight: bold;
    border-bottom: 1px solid #eee;
}

.drawer-close {
    font-size: 24px;
    cursor: pointer;
    color: #999;
}

.drawer-body {
    flex: 1;
    overflow-y: auto;
    padding: 12px 0;
}

.drawer-toc-list {
    list-style: none;
    padding-left: 20px;
    margin: 0;
}

.drawer-toc-list > .drawer-toc-item {
    padding: 6px 20px 6px 0;
}

.drawer-toc-list > .drawer-toc-item a {
    text-decoration: none;
    color: #333;
    font-size: 14px;
    line-height: 1.8;
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.drawer-toc-list > .drawer-toc-item a:hover {
    color: #42b983;
}
</style>
