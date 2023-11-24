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
        title: 'X. Es lo que está pasando /X'
      }
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('@/Views/HomeView.vue'),
      meta: {
        title: 'Inicio /X',
        layout: LayoutTwitter
      }
    },
    {
      path: '/explore',
      name: 'explore',
      component: () => import('@/Views/ExploreView.vue'),
      meta: {
        title: 'Explorar /X',
        layout: LayoutTwitter
      }
    },
    {
      path: '/notifications',
      name: 'notifications',
      component: () => import('@/Views/NotificationsView.vue'),
      meta: {
        title: 'Notificaciones /X',
        layout: LayoutTwitter
      }
    },
    {
      path: '/messages',
      name: 'messages',
      component: () => import('@/Views/MessagesView.vue'),
      meta: {
        title: 'Mensajes /X',
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
    },
    {
      path: '/logout',
      name: 'logout',
      component: () => import('@/Views/LogoutView.vue'),
      meta: {
        title: 'X'
      }
    }
  ]
});

router.beforeEach((to, from, next) => {
  const { title } = to.meta;
  if (title) document.title = title as string;
  next();
});

export { router };
