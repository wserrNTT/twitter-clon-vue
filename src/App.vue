<script setup lang="ts">
import { RouterView, useRouter } from 'vue-router';
import LayoutEmpty from '@/layout/LayoutEmpty.vue';
import { watch } from "vue"
// Pinia
import { useUserStore } from '@/store/user.store';

const userStore = useUserStore();
const router = useRouter()

watch(() => userStore.getLogged, (currentState) => {
  if (currentState) router.push({ name: 'home' })
  else router.push({ name: 'register' })
})
</script>

<template>
  <component :is="$route.meta.layout||LayoutEmpty">
    <RouterView />
  </component>
</template>

<style scoped>
.default-layout {
  height: 100vh;
}
</style>
