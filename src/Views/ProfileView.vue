<script lang="ts" setup>
import { useRoute, RouterView } from "vue-router"

const route = useRoute() 
</script>

<template>
  <span>{{ route.params.id }}'s Profile
    <router-view/>
  </span>
</template>
<style lang="scss" scoped>
span {
  color: #e7e9ea;
  font-size: 3rem;
}
</style>