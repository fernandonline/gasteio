<script setup lang="ts">
import AddPerson from '../components/containers/PersonForm.vue';
import PersonList from '../components/containers/PersonList.vue';
import { useDebtStore } from '@/stores';

const debtStore = useDebtStore()

const removePerson = (personId: string) => {
  debtStore.removePerson(personId)
}
</script>

<template>
    <AddPerson/>
    <PersonList :persons="debtStore.persons" @remove-person="removePerson" />
</template>
