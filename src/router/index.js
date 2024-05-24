import { createWebHistory, createRouter } from 'vue-router'
import { useBlogStore } from "@/store/useBlogStore";
import { createPinia, PiniaVuePlugin } from 'pinia'
const routes = [
    {
        path: "/",
        name: "home",
        component: () =>
            import("@/pages/Home.vue")
    },
    {
        path: "/tags/:tag",
        name: "tagsDetails",
        component: () => import("@/pages/Tag.vue")
    },
    {
        path: "/tags",
        name: "tags",
        component: () =>
            import("@/pages/Tag.vue")
    },
    {
        path: "/categories/:category",
        name: "categoriesDetails",
        component: () => import("@/pages/Categories.vue")
    },
    {
        path: "/categories",
        name: "categories",
        component: () =>
            import("@/pages/Categories.vue")
    },
    {
        path: "/archives",
        name: "archives",
        component: () =>
            import("@/pages/Archives.vue")
    },
    {
        path: "/about",
        name: "about",
        component: () =>
            import("@/pages/About.vue")
    },
    {
        path: "/contact",
        name: "contact",
        component: () =>
            import("@/pages/Contact.vue")
    },
    {
        path: "/article/:id",
        name: "article",
        component: () =>
            import("@/pages/Article.vue")
    },


]
const router = createRouter({
    history: createWebHistory(),
    routes,
})
// 在每次切换页面的时候将页面回到顶部
router.beforeEach((to, from, next) => {
    let t = to.path.split("/").slice(1)
    let f = from.path.split("/").slice(1)
    // 如果像标签页，分类页页内的切换就不需要重新回到上面
    if (t[0] === f[0]) {
        next()
    }
    else {
        next()
        window.scrollTo({
            top: 0,
            behavior: 'instant'
        })    //滚动条至于浏览器顶部
    }
})
// 初始化 Pinia
const pinia = createPinia()
const store = useBlogStore(pinia)
// 为分类和标签页跳转时，如果未获取到分类或标签，则自动跳转到第一个分类或标签
router.afterEach((to, from) => {
    if (to.path === "/categories") {
        if (!store.firstCategory) {
            store.getFirstCategory().then(() => {
                router.push({ path: "/categories/" + store.firstCategory })
            })
        }
        else {
            router.push({ path: "/categories/" + store.firstCategory })
        }
    }
    if (to.path === "/tags") {
        if (!store.firstTag) {
            store.getFirstTag().then(() => {
                router.push({ path: "/tags/" + store.firstTag })
            })
        }
        else {
            router.push({ path: "/tags/" + store.firstTag })
        }
    }

})
export default router
