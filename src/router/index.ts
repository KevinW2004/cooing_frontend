import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/chatBot'
    },
    {
      path: '/chatBot',
      name: 'chatBot',
      component: () => import('@/views/ChatBot.vue')
    },
    {
      path: '/settings',
      name:'settings',
      component: () => import('@/views/Settings.vue')
    }
  ]
})
router.beforeEach((to, from, next) => {
  next()
})
export default router
