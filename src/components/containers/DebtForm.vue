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

const addDebt = () => {
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
  <button class="btn-open_modal" @click="openAddDebtDialog"> + </button>

  <ModalApp :show="showAddDebtDialog" @close="showAddDebtDialog = false">
    <h2 class="modal-title">Adicionar Gasto</h2>
    <input class="modal-title_input" v-model="debtName" placeholder="Titulo" />
    <input class="modal-title_input" v-model="debtValue" type="number" placeholder="R$" />
    <input class="modal-title_input" v-model="debtDate" type="date"/>

    <div class="modal-btn">
      <button class="modal-btn_cancel" @click="showAddDebtDialog=false"> cancelar </button>
      <button class="modal-btn_accept" @click="addDebt">Adicionar</button>
    </div>
  </ModalApp>
</template>

<style scoped>
.modal-title {
  padding: 15px 10px 0;
}

.modal-title_input {
  padding: .8em;
  border-radius: 5px;
  margin: 3px 10px;
  border: none;
  font-size: 1em;
}

.modal-btn {
  display: flex;
}


</style>
