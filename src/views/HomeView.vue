<script setup lang="ts">
import Header from '@/components/HeaderApp.vue';
import AddPerson from '@/components/AddPerson.vue';
import PersonList from '@/components/PersonList.vue';
import { ref } from 'vue';

const persons = ref<{ id: number; name: string }[]>([])

const addPerson = (person: { id: number; name: string }) => {
  persons.value.push(person) // Atualiza a lista ao receber o evento
}
</script>

<template>
  <Header/>
  <main>
    <AddPerson @add-person="addPerson" />
    <PersonList :persons="persons" />
  </main>
</template>
