<script setup lang="ts">
import {useDebtStore} from '@/stores';
import ButtonApp from '@/components/ButtonApp.vue';

const debtStore = useDebtStore()

const removePerson = (personId: string) => {
  debtStore.removePerson(personId)
}
</script>

<template>
  <h2>Lista de Pessoas</h2>
  <div v-for="person in debtStore.persons" :key="person.id" class="person-card">
    <ul>
      <li>{{ person.name }}</li>
    </ul>
    <ButtonApp class="red" @click="removePerson(person.id)">[X]</ButtonApp>
  </div>
</template>

<style scoped>
.red {
  background: red;
}
</style>
