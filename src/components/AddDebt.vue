<script setup lang="ts">
import ModalApp from '@/components/ModalApp.vue';
import { ref } from 'vue';
import { useDebtStore } from '@/stores'; // Importa a store

const debtStore = useDebtStore(); // Usa a store
const showAddExpenseDialog = ref(false);
const expenseName = ref('');
const expenseValue = ref('');
const selectedPersonId = ref(''); // ID da pessoa para vincular o gasto

const openAddExpenseDialog = (personId: string) => {
  showAddExpenseDialog.value = true;
  expenseName.value = '';
  expenseValue.value = '';
  selectedPersonId.value = personId; // Armazena o ID da pessoa
};

const addExpense = () => {
  if (!expenseName.value.trim() || !expenseValue.value || !selectedPersonId.value) return

  debtStore.addDebt(selectedPersonId.value, expenseName.value.trim(), parseFloat(expenseValue.value)); // Adiciona à store
  showAddExpenseDialog.value = false
}
</script>

<template>

  <button @click="openAddExpenseDialog(person.id)">Adicionar Gasto</button>

  <ModalApp :show="showAddExpenseDialog" @close="showAddExpenseDialog = false">
    <h2>Adicionar Gasto</h2>
    <input v-model="expenseName" placeholder="Nome do gasto" />
    <input v-model="expenseValue" type="number" placeholder="Valor" />
    <button @click="addExpense">Adicionar</button>
  </ModalApp>

</template>
