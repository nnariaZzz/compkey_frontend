import {createRouter, createWebHistory} from 'vue-router'

const routerHistory = createWebHistory()

// 路由信息
const router = createRouter({
    history: routerHistory,
    routes: [
        {
            path: '/',
            redirect: '/main'
        },
        {
            path: '/main',
            component: ()=> import('@/views/main/index.vue')
        },
        {
            path: '/login',
            component: ()=> import('@/views/login/index.vue')
        },
    ]
})

export default router;
