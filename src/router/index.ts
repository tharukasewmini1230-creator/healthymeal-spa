import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { 
      path: '/', 
      name: 'home', 
      component: () => import('../views/HomeView.vue') 
    },
    { 
      path: '/favorites', 
      name: 'favorites', 
      component: () => import('../views/FavoritesView.vue') 
    },
    { 
      path: '/weekly', 
      name: 'weekly', 
      component: () => import('../views/WeeklyPlan.vue') 
    }
  ]
})

export default router