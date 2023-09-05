import { createWebHistory } from 'vue-router'
import { createRouter, createWebHashHistory } from 'vue-router'
const routes = [
    {
        path: "/",
        name: "home",
        component: () =>
            import("@/pages/Home.vue")
    },
    {
        path: "/tag",
        name: "tag",
        component: () =>
            import("@/pages/Tag.vue")
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
    }
]
const router = createRouter({
    history: createWebHistory(),
    routes,
})
export default router
