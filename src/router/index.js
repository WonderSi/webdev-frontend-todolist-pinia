import { createRouter, createWebHistory } from "vue-router"
import { useUserStore } from "@/stores/useUserStore"

const routes = [
    {
        path: '/login',
        name: 'Login',
        component: () => import('@/page/LoginPage.vue'),
        meta: { requiresGuest: true }
    },
    {
        path: '/register',
        name: 'Register',
        component: () => import('@/page/RegisterPage.vue'),
        meta: { requiresGuest: true }
    },
    {
        path: '/',
        name: 'Todo',
        component: () => import('@/page/TodoPage.vue'),
        meta: { requiresAuth: true }
    },
    {
        path: '/about',
        name: 'About',
        component: () => import('@/page/AboutPage.vue'),
        meta: { requiresGuest: true }
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to, from, next) => {
    const userStore = useUserStore()

    userStore.init()

    if (to.meta.requiresAuth && !userStore.isAuthenticated) {
        next('/login')
    } else if (to.meta.requiresGuest && userStore.isAuthenticated) {
        next('/')
    } else {
        next()
    }
})

export default router
