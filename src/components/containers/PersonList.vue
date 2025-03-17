<script setup lang="ts">
import ButtonApp from '../../components/elements/ButtonApp.vue';
import { useDebtStore } from '../../stores';
import { RouterLink } from 'vue-router';

const debtStore = useDebtStore()

defineProps<{ persons: { id: string; name: string }[] }>()

const emit = defineEmits(['remove-person'])

const removePerson = (personId: string) => {
  emit('remove-person', personId)
}
</script>

<template>
  <h2>Lista de Pessoas</h2>
  <div v-for="person in persons" :key="person.id" class="person-container">
    <router-link :to="`/person/${person.id}`" class="person-container_card">
      <span> {{ person.name }} </span>
      <span> R$ {{ debtStore.getPersonTotal(person.id) }} </span>
    </router-link>
    <ButtonApp class="btn-red" @click="removePerson(person.id)"> X </ButtonApp>
  </div>
</template>



<style scoped>
.person-container {
  display: flex;
}

.person-container_card {
  width: 100%;
  display: block;
  background-color: white;
  border: 2px solid black;
  padding: 10px;
  text-align: center;
  text-decoration: none;
  color: #000;
}

.person-container_card span {
  font-weight: 600;
}

.btn-red {
  background: red;
}
</style>
