<script setup lang="ts">
import ButtonApp from '../../components/elements/ButtonApp.vue';
import { useDebtStore, formatCurrency } from '../../stores';
import { RouterLink } from 'vue-router';

const debtStore = useDebtStore()

defineProps<{ persons: { id: string; name: string }[] }>()

const emit = defineEmits(['remove-person'])

const removePerson = (personId: string) => {
  emit('remove-person', personId)
}
</script>

<template>
  <div v-for="person in persons" :key="person.id" class="person-container">
    <router-link :to="`/person/${person.id}`" class="person-container_card">
      <span> {{ person.name }} </span>
      <span> R$ {{ formatCurrency(debtStore.getPersonTotal(person.id).value) }} </span>
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
  color: var(--text);
}

.person-container_card span {
  font-weight: 600;
}

.btn-red {
  background: red;
}
</style>
