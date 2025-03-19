<script setup lang="ts">
import { useRoute } from 'vue-router';
import { useDebtStore } from '../stores';
import { ref, watch } from 'vue';

const route = useRoute();
const debtStore = useDebtStore();

const personId = ref(route.params.id as string);
const person = ref(debtStore.getPersonById(personId.value));
const debts = ref(debtStore.getDebtsForPerson(personId.value));

watch(() => route.params.id, (newId) => {
  personId.value = newId as string
  person.value = debtStore.getPersonById(personId.value)
  debts.value = debtStore.getDebtsForPerson(personId.value)
})
</script>

<template>
  <div>
    <h2>Gastos de {{ person?.name }}</h2>
    <p>Total: R$ {{ debtStore.getPersonTotal(personId) }} </p>

    <ul>
      <li v-for="debt in debts" :key="debt.id">
        {{ debt.description }} - R$ {{ debt.amount }}
      </li>
    </ul>

    <router-link to="/">Voltar</router-link>
  </div>
</template>
