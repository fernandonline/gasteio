<script setup lang="ts">
import { useDebtStore, formatCurrency } from '../../stores';
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute()
const debtStore = useDebtStore()

const personId = ref<string | null>(null);

watch(() => route.params.id, (newId) => {
  personId.value = newId as string;
});
</script>

<template>
  <header class="header">
    <h1> gasteio </h1>
    <div class="total-card">
      <span>Gasto total: R$ {{ formatCurrency(personId ? debtStore.getPersonTotal(personId).value : debtStore.totalDebts) }}</span>
    </div>
  </header>
</template>

<style scoped>
.header {
  background-color: rgb(0, 235, 125);
  height: 20%;
  padding: 10px;
}

.total-card {
  border: 1px solid white;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
}
</style>
