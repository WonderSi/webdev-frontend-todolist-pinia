import { createRouter, createWebHistory } from "vue-router"
import { useUserState } from "@/stores/useUserStore"

const routes = [
    {
        path: '/login',
        name: 'Login',
        component: () => import(''),
        meta: { requiresGuest: true }
    },
    {
        path: '/register',
        name: 'Register',
        component: () => import(''),
        meta: { requiresGuest: true }
    },
    {
        path: '/',
        name: 'Todo',
        component: () => import(''),
        meta: { requiresAuth: true }
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to, from, next) => {
    const userStore = useUserStore()

    if (to.meta.requiresAuth && !userStore.isAuthenticated) {
        next('/login')
    } else if (to.meta.requiresGuest && useUserState.isAuthenticated) {
        next('/')
    } else {
        next()
    }
})

export default router
