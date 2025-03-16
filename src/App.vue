<script setup lang="ts">
import HomeView from '@/views/HomeView.vue';
import { onMounted } from 'vue';
import { useDebtStore } from '@/stores/index.ts';

const debtStore = useDebtStore()

onMounted(() => {
  debtStore.initStore()
})
</script>

<template>
  <HomeView/>
</template>

<style scoped>

</style>
