<script setup lang="ts">
import AddPerson from '../components/containers/AddPerson.vue';
import PersonList from '../components/containers/PersonList.vue';
import { useDebtStore } from '@/stores';

const debtStore = useDebtStore()

const removePerson = (personId: string) => {
  debtStore.removePerson(personId)
}
</script>

<template>
  <main>
    <AddPerson/>
    <PersonList :persons="debtStore.persons" @remove-person="removePerson" />
  </main>
</template>
