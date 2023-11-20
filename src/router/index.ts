// Vue-router
import { createRouter, createWebHistory } from 'vue-router';

// Layout
import LayoutTwitter from '@/layout/LayoutTwitter.vue';

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'register',
      component: () => import('@/Views/RegisterView.vue')
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('@/Views/HomeView.vue'),
      meta: { layout: LayoutTwitter }
    },
    {
      path: '/explore',
      name: 'explore',
      component: () => import('@/Views/ExploreView.vue'),
      meta: { layout: LayoutTwitter }
    },
    {
      path: '/notifications',
      name: 'notifications',
      component: () => import('@/Views/NotificationsView.vue'),
      meta: { layout: LayoutTwitter }
    },
    {
      path: '/messages',
      name: 'messages',
      component: () => import('@/Views/MessagesView.vue'),
      meta: { layout: LayoutTwitter }
    },
    {
      path: '/:id',
      name: 'profile',
      component: () => import('@/Views/ProfileView.vue'),
      meta: { layout: LayoutTwitter }
    },
    {
      path: '/:id/lists',
      name: 'lists',
      component: () => import('@/Views/ListsView.vue'),
      meta: { layout: LayoutTwitter }
    }
  ]
});
