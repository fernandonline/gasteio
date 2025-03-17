<script setup lang="ts">
import { useRoute } from 'vue-router';
import { useDebtStore } from '@/stores';

const route = useRoute();
const debtStore = useDebtStore();

const personId = route.params.id as string;
const person = debtStore.getPersonById(personId);
const debts = debtStore.getDebtsForPerson(personId);
</script>

<template>
  <div>
    <h2>Gastos de {{ person?.name }}</h2>
    <p>Total: R$ {{ debtStore.getPersonTotal(personId) }}</p>

    <ul>
      <li v-for="debt in debts" :key="debt.id">
        {{ debt.description }} - R$ {{ debt.amount }}
      </li>
    </ul>
  </div>
</template>
