<script setup lang="ts">
import { onMounted } from 'vue';
import HeaderApp from './components/layout/HeaderApp.vue';
import { useDebtStore } from '@/stores/index.ts';

const debtStore = useDebtStore()

onMounted(() => {
  debtStore.initStore()
})
</script>

<template>
  <HeaderApp/>
  <RouterView/>
</template>

<style scoped>

</style>
