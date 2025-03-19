<script setup lang="ts">
import ModalApp from '../../components/elements/ModalApp.vue';
import { ref } from 'vue';
import { useDebtStore } from '@/stores';

const currentDate = new Date().toISOString().split('T')[0];

const props = defineProps<{ person: { id: string } }>()
const debtStore = useDebtStore()
const showAddDebtDialog = ref(false)
const debtName = ref('')
const debtValue = ref('')
const debtDate = ref('')

const openAddDebtDialog = () => {
  showAddDebtDialog.value = true
  debtName.value = ''
  debtValue.value = ''
  debtDate.value = currentDate
}

const addExpense = () => {
  const amount = Number(debtValue.value) || 0;

  if (!debtName.value.trim()) {
    alert('Preencha um nome válido');
    return;
  }

  debtStore.addDebt(props.person.id, debtName.value.trim(), amount)
  showAddDebtDialog.value = false;
}
</script>

<template>
  <button @click="openAddDebtDialog">Adicionar Gasto</button>

  <ModalApp :show="showAddDebtDialog" @close="showAddDebtDialog = false">
    <h2>Adicionar Gasto</h2>
    <input v-model="debtName" placeholder="Nome do gasto" />
    <input v-model="debtValue" type="number" placeholder="Valor" />
    <input v-model="debtDate" type="date"/>
    <button @click="addExpense">Adicionar</button>
  </ModalApp>
</template>
