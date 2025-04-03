<script setup lang="ts">
import { useDebtStore, formatCurrency } from '../../stores';
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import ThemeSwitcher from '../elements/ThemeSwitcher.vue';

const route = useRoute()
const debtStore = useDebtStore()

const categoryId = ref<string | null>(null);

watch(() => route.params.id, (newId) => {
  categoryId.value = newId as string;
})
</script>

<template>
  <header class="header">

    <div class="header-title">
      <h1> gasteio </h1>
      <ThemeSwitcher/>
    </div>

    <div class="header-total">
      <div class="header-total_container">

        <span class="header-total_text"> gastos totais:</span>
        <span class="header-total_value">
          R$ {{ formatCurrency(categoryId ? debtStore.getCategoryTotal(categoryId).value : debtStore.totalDebts) }}
        </span>

      </div>
    </div>
  </header>
</template>

<style scoped>
.header {
  background: var(--primary-bg);
  color: var(--destaq-txt);
  min-height: 25vh;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.header-title {
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: .8rem;
}

.header-total {
  width: 100%;
  height: 67%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.header-total_container {
  display: flex;
  flex-direction: row;
  align-items: center;
  border: 2px solid var(--destaq-txt);
  border-radius: 28px;
  min-width: 14rem;
  height: 5rem;
  justify-content: space-evenly;
  padding: .5rem;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
}

.header-total_text {
  font-size: .8rem;
  width: 40%;
}

.header-total_value {
  font-size: 1.5rem;
  font-weight: 400;
  width: 60%;
  text-align: end;
}
</style>
