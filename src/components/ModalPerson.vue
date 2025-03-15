<script setup lang="ts">
import ModalApp from '@/components/ModalApp.vue';
import { ref } from 'vue';

const showAddExpenseDialog = ref(false);
const expenseName = ref('');
const expenseValue = ref('');

const openAddExpenseDialog = () => {
  showAddExpenseDialog.value = true;
  expenseName.value = '';
  expenseValue.value = '';
};

const addExpense = () => {
  console.log("Gasto adicionado:", expenseName.value, expenseValue.value);
  showAddExpenseDialog.value = false;
};
</script>

<template>
  <button @click="openAddExpenseDialog">Adicionar Gasto</button>

  <ModalApp :show="showAddExpenseDialog" @close="showAddExpenseDialog = false">
    <h2>Adicionar Gasto</h2>
    <input v-model="expenseName" placeholder="Nome do gasto" />
    <input v-model="expenseValue" type="number" placeholder="Valor" />
    <button @click="addExpense">Adicionar</button>
  </ModalApp>
</template>
