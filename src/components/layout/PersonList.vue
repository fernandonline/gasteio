<script setup lang="ts">
import TrashImg from '@/assets/svg/trashImg.vue';
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
  <div v-for="person in persons" :key="person.id" class="category-container">
    <div>
      <ButtonApp class="category-container_delete" @click="removePerson(person.id)">
        <TrashImg/>
      </ButtonApp>
    </div>

      <router-link :to="`/person/${person.id}`" class="category-container_card">
        <span> {{ person.name }} </span>
        <span class="currency"> R$ {{ formatCurrency(debtStore.getPersonTotal(person.id).value) }} </span>
    </router-link>
  </div>
</template>



<style scoped>

.category-container {
  box-shadow: 0 0 12px var(--shadow-color);
  border-radius: 8px;
  width: 100%;
  background-color: var(--list-bg);
  display: flex;
  padding: .5rem;
  align-items: center;
}

.category-container_delete {
  display: flex;
  justify-content: center;
  align-items: center;
}

.category-container_card {
  text-decoration: none;
  color: var(--list-color);
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0px 10px 10px;
  font-size: 1.25rem;
  text-overflow: ellipsis;
}

.currency {
  min-width: 35%;
  height: auto;
  font-weight: 600;
}
</style>
