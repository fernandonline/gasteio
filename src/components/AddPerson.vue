<script setup lang="ts">
import ButtonApp from '@/components/ButtonApp.vue';
import ModalApp from '@/components/ModalApp.vue';
import { ref, defineEmits } from 'vue';

const showAddDialog = ref(false);
const newPersonName = ref('');
const emit = defineEmits(['add-person']); // Define o evento personalizado

const openAddPersonDialog = () => {
  showAddDialog.value = true;
  newPersonName.value = '';
};

const addPerson = () => {
  if (!newPersonName.value.trim()) return; // Evita nome vazio
  emit('add-person', { id: Date.now(), name: newPersonName.value.trim() }); // Emite o evento
  showAddDialog.value = false;
};
</script>

<template>
  <ButtonApp @click="openAddPersonDialog">Adicionar Pessoa</ButtonApp>

  <ModalApp :show="showAddDialog" @close="showAddDialog = false">
    <h2>Adicionar Pessoa</h2>
    <input v-model="newPersonName" placeholder="Nome da pessoa" />
    <button @click="addPerson">Adicionar</button>
  </ModalApp>
</template>
