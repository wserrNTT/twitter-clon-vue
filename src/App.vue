<script setup lang="ts">
import { RouterView, useRouter } from 'vue-router';
import LayoutEmpty from '@/layout/LayoutEmpty.vue';
import { watch } from "vue"
// Pinia
import { useLoginStore } from '@/store/login.store';

const userLogin = useLoginStore();
const router = useRouter()

watch(() => userLogin.getLogged, (currentState) => {
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