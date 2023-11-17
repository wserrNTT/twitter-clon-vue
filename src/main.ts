// Vue
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { router } from '@/router';
import App from '@/App.vue';

// Styles
import '@/assets/style.scss';

// Icons

const app = createApp(App);
const pinia = createPinia();

app.use(router);
app.use(pinia);
app.mount('#app');
