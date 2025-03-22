<script setup lang="ts">
import { onMounted } from 'vue';
import HeaderApp from './components/layout/HeaderApp.vue';
import { useDebtStore } from '@/stores/index.ts';
import FooterApp from './components/layout/FooterApp.vue';

const debtStore = useDebtStore()

onMounted(() => {
  debtStore.initStore()
})
</script>

<template>
  <HeaderApp/>
  <main>
    <RouterView/>
  </main>
  <FooterApp/>

</template>

<style scoped>
main {
  height: 100svh;
  background-color: var(--second-bg);
  padding: 3%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3svw;
  padding-top: 1rem;
  overflow-y: auto;
  scrollbar-width: none;
}
</style>
