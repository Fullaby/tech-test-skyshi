import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import DetailPage from '../views/DetailPage.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path:'/detail/:id',
      name: 'detail',
      component: DetailPage
    }
  ]
})

export default router
