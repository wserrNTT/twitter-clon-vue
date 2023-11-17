<script setup lang="ts">
import { RouterView } from 'vue-router';
</script>

<template>
  <component :is="$route.meta.layout||'div'" class="default-layout">
    <RouterView />
  </component>
</template>

<style scoped>
.default-layout {
  height: 100vh;
}
</style>
