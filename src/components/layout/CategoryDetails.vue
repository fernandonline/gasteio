<script setup lang="ts">
import { useRoute } from 'vue-router';
import { useDebtStore, formatCurrency } from '@/stores';
import { ref, watchEffect } from 'vue';
import DebtForm from '@/components/containers/DebtForm.vue';
import ButtonApp from '@/components/elements/ButtonApp.vue';
import TrashImg from '@/assets/svg/TrashImg.vue';

const route = useRoute()
const debtStore = useDebtStore()

const categoryId = ref(route.params.id as string)
const category = ref(debtStore.getCategoryById(categoryId.value))
const debts = ref(debtStore.getDebtsForCategory(categoryId.value))

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
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

    <div class="debt-container" v-for="debt in debts" :key="debt.id">

      <ButtonApp class="debt-container_delete" @click="removeDebt(debt.id)">
        <TrashImg/>
      </ButtonApp>

      <div class="debt-container_details">
        <span class="details-description">
          {{ debt.description }}
          <span class="details-date"> {{ formatDate(debt.date) }} </span>
        </span>
        <span class="details-currency"> R$ {{ formatCurrency(debt.amount) }} </span>
      </div>
    </div>

    <DebtForm v-if="category" :category="category"/>
</template>

<style scoped>
.debt-container {
  box-shadow: 0 0 12px var(--shadow-color);
  border-radius: 8px;
  width: 100%;
  background-color: var(--list-bg);
  display: flex;
  padding: .5rem;
  align-items: center;
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

.details-date {
  font-size: .7rem;
}

.details-currency {
  min-width: 25%;
  height: auto;
  font-weight: 600;

  @media screen and (min-width: 748px) {
    min-width: 15%;
  }
}
</style>
