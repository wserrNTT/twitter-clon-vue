<script lang="ts" setup>
import { useRoute } from "vue-router"

const route = useRoute() 
</script>

<template>
  <span>{{ route.params.id }}'s Profile</span>
</template>
<style lang="scss" scoped>
span {
  color: #e7e9ea;
  font-size: 3rem;
}
</style>