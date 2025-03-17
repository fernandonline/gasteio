<script setup lang="ts">
import ButtonApp from '@/components/ButtonApp.vue';

defineProps<{ persons: { id: string; name: string }[] }>()

const emit = defineEmits(['remove-person'])

const removePerson = (personId: string) => {
  emit('remove-person', personId)
}
</script>

<template>
  <h2>Lista de Pessoas</h2>
  <div v-for="person in persons" :key="person.id" class="person-card">
    <ul>
      <li>
        {{ person.name }}
        <ButtonApp class="red" @click="removePerson(person.id)">[X]</ButtonApp>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.red {
  background: red;
}

.person-card ul {
  color: white;
  background-color: black;
  border: 2px solid green;
  margin: 5px;
}
</style>
