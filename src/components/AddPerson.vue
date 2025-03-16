<script setup lang="ts">
import ButtonApp from '@/components/ButtonApp.vue';
import ModalApp from '@/components/ModalApp.vue';
import { ref } from 'vue';
import { useDebtStore } from '@/stores';

const showAddDialog = ref(false)
const newPersonName = ref('')
const debtStore = useDebtStore()

const openAddPersonDialog = () => {
  showAddDialog.value = true
  newPersonName.value = ''
}

const addPerson = () => {
  if (!newPersonName.value.trim()) return
  debtStore.addPerson(newPersonName.value.trim())
  showAddDialog.value = false
}
</script>

<template>

  <ButtonApp @click="openAddPersonDialog">Adicionar Pessoa</ButtonApp>

  <ModalApp :show="showAddDialog" @close="showAddDialog = false">
    <h2>Adicionar Pessoa</h2>
    <input v-model="newPersonName" placeholder="Nome da pessoa" />
    <button @click="addPerson">Adicionar</button>
  </ModalApp>

</template>
