<script setup lang="ts">
import { RouterView } from 'vue-router';
import LayoutEmpty from '@/layout/LayoutEmpty.vue';
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
