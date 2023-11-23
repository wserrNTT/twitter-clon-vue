<script lang="ts" setup>
// Vue
import { onMounted } from "vue";
// Pinia
import { useLoginStore } from "@/store/login.store";
// Vue-router
import { useRoute } from "vue-router"
// Utils
import { updateDocumentTitle } from "@/utils"

const route = useRoute()
const loginStore = useLoginStore();

onMounted(() => {
  updateDocumentTitle(`Listas creadas por @${loginStore.getUsername} / X`)
})
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