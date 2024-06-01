import { createRouter, createWebHistory } from 'vue-router'
declare module 'vue-router' {
  interface RouteMeta {
    title?: string;
  }
}
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: '/chatBot'
    },
    {
      path: '/chatBot',
      name: 'chatBot',
      component: () => import('@/views/ChatBot.vue'),
      meta: {title: '声自远-开始聊天'}
    },
    {
      path: '/settings',
      name:'settings',
      component: () => import('@/views/Settings.vue'),
      meta: {title: '声自远-设置'}
    }
  ]
})
router.beforeEach((to, from, next) => {
  if (to.meta.title)
    document.title = to.meta.title
  next()
})
export default router
