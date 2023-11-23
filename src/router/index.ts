// Vue-router
import { createRouter, createWebHistory } from 'vue-router';

// Layout
import LayoutTwitter from '@/layout/LayoutTwitter.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'register',
      component: () => import('@/Views/RegisterView.vue'),
      meta: {
        title: 'X. Es lo que está pasando'
      }
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('@/Views/HomeView.vue'),
      meta: {
        title: 'Inicio',
        layout: LayoutTwitter
      }
    },
    {
      path: '/explore',
      name: 'explore',
      component: () => import('@/Views/ExploreView.vue'),
      meta: {
        title: 'Explorar',
        layout: LayoutTwitter
      }
    },
    {
      path: '/notifications',
      name: 'notifications',
      component: () => import('@/Views/NotificationsView.vue'),
      meta: {
        title: 'Notificaciones',
        layout: LayoutTwitter
      }
    },
    {
      path: '/messages',
      name: 'messages',
      component: () => import('@/Views/MessagesView.vue'),
      meta: {
        title: 'Mensajes',
        layout: LayoutTwitter
      }
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
      meta: {
        layout: LayoutTwitter
      }
    }
  ]
});

router.beforeEach((to, from, next) => {
  const { title } = to.meta;
  if (title) document.title = `${title} / X`;
  next();
});

export { router };
