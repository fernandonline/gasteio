<script setup lang="ts">
import { useRoute } from 'vue-router';
import { useDebtStore, formatCurrency } from '@/stores';
import { ref, watchEffect, computed } from 'vue';
import DebtForm from '@/components/containers/DebtForm.vue';
import ButtonApp from '@/components/elements/ButtonApp.vue';
import TrashImg from '@/assets/svg/TrashImg.vue';
import ArrowReturn from '@/assets/svg/ArrowReturn.vue';
import type { DebtItem } from '@/stores/storeTypes';

const route = useRoute()
const debtStore = useDebtStore()
const categoryId = ref(route.params.id as string)
const category = ref(debtStore.getCategoryById(categoryId.value))
const debts = ref(debtStore.getDebtsForCategory(categoryId.value))

const groupedDebts = computed(() => {
  const groups: Record<string, DebtItem[]> = {};

  debts.value.forEach(debt => {
    const dateKey = debt.date || 'Sem data';
    if (!groups[dateKey]) {
      groups[dateKey] = [];
    }
    groups[dateKey].push(debt);
  });
  return Object.entries(groups)
    .sort(([dateA], [dateB]) => {
      const parseDate = (d: string) => {
        const [year, month, day] = d.split('-').map(Number)
        return new Date(year, month - 1, day, 12).getTime()
      }
      return parseDate(dateB) - parseDate(dateA)
    })
    .map(([date, items]) => ({ date, items }));
});

const formatDate = (dateString: string) => {
  const [year, month, day] = dateString.split('-').map(Number)
  const date = new Date(year, month - 1, day)
  return date.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })
}

const removeDebt = (debtId: string) => {
  debtStore.removeDebt(debtId);
};

watchEffect(() => {
  category.value = debtStore.getCategoryById(categoryId.value);
  debts.value = debtStore.getDebtsForCategory(categoryId.value);
})
</script>

<template>
  <div class="category-title">
    <DebtForm v-if="category" :category="category" />
    <h2>categorias / {{ category?.name }}</h2>
  </div>

  <section class="date-group" v-for="group in groupedDebts" :key="group.date">
    <span class="debt-date"> {{ formatDate(group.date) }} <hr/> </span>

    <div class="debt-container" v-for="debt in group.items" :key="debt.id">
      <ButtonApp class="debt-container_delete" @click="removeDebt(debt.id)">
        <TrashImg />
      </ButtonApp>
      <div class="debt-container_details">
        <span class="details-description">
          {{ debt.description }}
        </span>
        <span class="details-currency"> R$ {{ formatCurrency(debt.amount) }} </span>
      </div>
    </div>
  </section>

  <router-link to="/">
    <ButtonApp class="btn-return">
      <ArrowReturn />
    </ButtonApp>
  </router-link>
</template>

<style scoped>
.debt-section {

  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.debt-date {
  font-size: 1rem;
  color: var(--list-color);
  display: flex;
  align-items: center;
}

.debt-date hr {
  position:fixed;
  width: 60%;
  right: 20px;
  z-index: 1;
}

.date-group {
  width: 100%;
}

.debt-container {
  box-shadow: 0 0 12px var(--shadow-color);
  border-radius: 8px;
  width: 100%;
  background-color: var(--list-bg);
  display: flex;
  padding: .5rem;
  align-items: center;
  margin-bottom: 0.5rem
}

.debt-container_delete {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 5px;
}

.debt-container_details {
  color: var(--list-color);
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  padding: 6px 0px 6px 10px;
  font-size: 1.25rem;
}

.details-description {
  display: flex;
  flex-direction: column;
  text-overflow: ellipsis;
}

.details-currency {
  min-width: 25%;
  height: auto;
  font-weight: 600;

  @media screen and (min-width: 748px) {
    min-width: 15%;
  }
}

.btn-return {
  position: absolute;
  bottom: 6.7em;
  right: .8em;
  background: var(--primary-bg);
  color: var(--destaq-txt);
  font-size: 1.6em;
  border-radius: 50%;
  width: 2em;
  height: 2em;
  border: none;
  cursor: pointer;
  opacity: .8;
}
</style>
