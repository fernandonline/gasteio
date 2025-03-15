<script setup lang="ts">
defineProps<{ persons: { id: number; name: string }[] }>(); // Recebe a lista
</script>

<template>
  <h2>Lista de Pessoas</h2>
  <div v-for="person in persons" :key="person.id" class="person-card">
    <ul>
      <li>{{ person.name }}</li>
    </ul>
  </div>
</template>
