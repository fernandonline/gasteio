<script setup lang="ts">
import HeaderApp from '@/components/HeaderApp.vue';
import AddPerson from '@/components/AddPerson.vue';
import PersonList from '@/components/PersonList.vue';
import { ref } from 'vue';

const persons = ref<{ id: string; name: string }[]>([]);

const addPerson = (person: { id: string; name: string }) => {
  persons.value.push(person)
};

const removePerson = (personId: string) => {
  persons.value = persons.value.filter((p) => p.id !== personId)
};
</script>

<template>
  <HeaderApp />
  <main>
    <!-- Escuta o evento add-person e chama a função addPerson -->
    <AddPerson @add-person="addPerson" />
    <PersonList :persons="persons" @remove-person="removePerson" />
  </main>
</template>
