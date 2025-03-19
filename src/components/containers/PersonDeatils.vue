<script setup lang="ts">
import { useRoute } from 'vue-router';
import { useDebtStore } from '@/stores';
import { ref, watchEffect } from 'vue';
import DebtForm from './DebtForm.vue';

const route = useRoute();
const debtStore = useDebtStore();

const personId = ref(route.params.id as string);
const person = ref(debtStore.getPersonById(personId.value));
const debts = ref(debtStore.getDebtsForPerson(personId.value));

watchEffect(() => {
  person.value = debtStore.getPersonById(personId.value);
  debts.value = debtStore.getDebtsForPerson(personId.value);
})
</script>

<template>
  <div>
    <h2>Gastos de {{ person?.name }}</h2>
    <p>Total: R$ {{ debtStore.getPersonTotal(personId) }}</p>

    <DebtForm v-if="person" :person="person"/>

    <ul>
      <li v-for="debt in debts" :key="debt.id">
        {{ debt.description }} - R$ {{ debt.amount }}
      </li>
    </ul>
  </div>
</template>
