<script lang="ts" setup>
// Pinia
import { useLoginStore } from '@/store/login.store';
// Vue-router
import { useRoute } from 'vue-router';
// Composables
import { useTitle } from '@/composables';

const route = useRoute();
const loginStore = useLoginStore();

useTitle(`Listas creadas por @${loginStore.data.userName} / X`);
</script>

<template>
  <span>{{ route.params.id }}'s Lists</span>
</template>
<style lang="scss" scoped>
span {
  color: #e7e9ea;
  font-size: 3rem;
}
</style>
