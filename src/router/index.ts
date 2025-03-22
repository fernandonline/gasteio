import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CategoryDetails from '../components/layout/CategoryDetails.vue'
import NotFound from '@/views/NotFound.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/category/:id',
      name: 'categoryDetails',
      component: CategoryDetails,
    },

    {
      path: '/:pathMatch(.*)*',
      name: 'notFound',
      component: NotFound,
    }
  ],
})

export default router
