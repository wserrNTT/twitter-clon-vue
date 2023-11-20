// Vue
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { router } from '@/router';
import App from '@/App.vue';

// Styles
import '@/assets/style.scss';

const app = createApp(App);
const pinia = createPinia();

pinia.use((context) => {
  const storeId = context.store.$id;
  console.log(`${storeId} cargado ✅`);

  const fromStorage = JSON.parse(
    window.localStorage.getItem(storeId) || '{}'
  );
  if (fromStorage) {
    context.store.$patch(fromStorage);
  }

  context.store.$subscribe((mutation, state) => {
    window.localStorage.setItem(storeId, JSON.stringify(state));
  });
});

app.use(router);
app.use(pinia);
app.mount('#app');
