<script setup lang="ts">
import { useRoute } from 'vue-router';
import { useDebtStore, formatCurrency } from '@/stores';
import { ref, watchEffect } from 'vue';
import DebtForm from '../containers/DebtForm.vue';
import ButtonApp from '@/components/elements/ButtonApp.vue';

const route = useRoute()
const debtStore = useDebtStore()

const personId = ref(route.params.id as string)
const person = ref(debtStore.getPersonById(personId.value))
const debts = ref(debtStore.getDebtsForPerson(personId.value))

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
  person.value = debtStore.getPersonById(personId.value);
  debts.value = debtStore.getDebtsForPerson(personId.value);
})
</script>

<template>
  <div>
    <h2>Gastos de {{ person?.name }}</h2>
    <p>Total: R$ {{ formatCurrency(debtStore.getPersonTotal(personId).value) }}</p>

    <DebtForm v-if="person" :person="person"/>

    <ul>
      <li v-for="debt in debts" :key="debt.id">
        {{ debt.description }} - R$ {{ formatCurrency(debt.amount) }} | {{ formatDate(debt.date) }}
        <ButtonApp class="btn-red" @click="removeDebt(debt.id)"> X </ButtonApp>
      </li>
    </ul>
  </div>
</template>

<style scoped>

</style>
