<script setup lang="ts">
import { ref } from 'vue';
import ButtonApp from '../../components/elements/ButtonApp.vue';
import ModalApp from '../../components/elements/ModalApp.vue';
import { useDebtStore } from '../../stores';


const showAddDialog = ref(false)
const newPersonName = ref('')
const debtStore = useDebtStore()

const openAddPersonDialog = () => {
  showAddDialog.value = true
  newPersonName.value = ''
}

const addPerson = () => {
  if (!newPersonName.value.trim()) return;
  debtStore.addPerson(newPersonName.value.trim())
  showAddDialog.value = false;
}
</script>

<template>

  <ModalApp :show="showAddDialog" @close="showAddDialog = false">
    <h2>Adicionar Categoria</h2>
    <input v-model="newPersonName" placeholder="Digite uma categoria" />
    <div class="modal-btn">
      <button @click="showAddDialog=false"> cancelar </button>
      <button @click="addPerson">Adicionar</button>
    </div>
  </ModalApp>

  <ButtonApp class="btn-open_modal" @click="openAddPersonDialog">Adicionar Categoria</ButtonApp>
</template>

<style scoped>
.modal-btn {
  border: 1px solid white;
  display: flex;
}

.modal-btn button {
  flex: 1;

}

.btn-open_modal {
  position: absolute;
  bottom: 5em;
  right: .5em;
  background: var(--header-bg);
  color: var(--header-text);
}
</style>



