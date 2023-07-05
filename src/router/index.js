import { createRouter,createWebHashHistory } from 'vue-router'
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
        path: "/classify ",
        name: "classify ",
        component: () =>
            import("@/pages/Classify .vue")
    }
]
const router = createRouter({
    history: createWebHashHistory(),
    routes,
})
export default router
