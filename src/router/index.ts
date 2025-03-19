import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import PersonDeatails from '../components/layout/PersonDeatils.vue'
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
      path: '/person/:id',
      name: 'personDetails',
      component: PersonDeatails,
    },

    {
      path: '/:pathMatch(.*)*',
      name: 'notFound',
      component: NotFound,
    }
  ],
})

export default router
