// Vue-router
import { createRouter, createWebHistory } from 'vue-router';

// Layout
import LayoutTwitter from '@/layout/LayoutTwitter.vue';

// Views
import HomeView from '@/Views/HomeView.vue';
import RegisterView from '@/Views/RegisterView.vue';

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'register',
      component: RegisterView
    },
    {
      path: '/home',
      name: 'home',
      component: HomeView,
      meta: { layout: LayoutTwitter }
    }
  ]
});
