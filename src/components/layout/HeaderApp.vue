<script setup lang="ts">
import { useDebtStore, formatCurrency } from '../../stores';
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import ThemeSwitcher from '../elements/ThemeSwitcher.vue';

const route = useRoute()
const debtStore = useDebtStore()

const personId = ref<string | null>(null);

watch(() => route.params.id, (newId) => {
  personId.value = newId as string;
});
</script>

<template>
  <header class="header">

    <div class="header-title">
      <h1> gasteio </h1>
      <ThemeSwitcher/>
    </div>


    <div class="header-total">
      <span>Gasto total: R$ {{ formatCurrency(personId ? debtStore.getPersonTotal(personId).value : debtStore.totalDebts) }}</span>
    </div>
  </header>
</template>

<style scoped>
.header {
  background-color: var(--header-bg);
  color: var(--header-text);
  height: 30%;
  display: flex;
  flex-direction: column;
  align-items: center;

}

.header-title {
  border: 1px solid white;
  width: 100%;
  display: flex;
  justify-content: space-around;
  padding: .5rem;
}

.header-total {
  border: 1px solid white;
  width: 100%;
  height: 68%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
}
</style>
