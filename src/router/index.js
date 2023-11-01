import { createWebHistory } from 'vue-router'
import { createRouter } from 'vue-router'
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
export default router
