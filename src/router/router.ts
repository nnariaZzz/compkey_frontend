import { createRouter, createWebHistory } from "vue-router"

const routerHistory = createWebHistory()

// 路由信息
const router = createRouter({
  history: routerHistory,
  routes: [
    {
      path: "/",
      redirect: "/main"
    },
    {
      path: "/main",
      component: () => import("@/views/main/index.vue")
    },
    {
      path: "/searchHistory",
      component: () => import("@/views/searchHistory/index.vue")
    },
    {
      path: "/wordCloud",
      component: () => import("@/views/wordCloud/wordCloud.vue")
    },

    {
      path: "/result",
      component: () => import("@/views/searchResult/index.vue")
    }
  ]
})

export default router
