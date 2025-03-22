<script setup lang="ts">
import { ref } from 'vue';
import ButtonApp from '../../components/elements/ButtonApp.vue';
import ModalApp from '../../components/elements/ModalApp.vue';
import { useDebtStore } from '../../stores';


const showAddDialog = ref(false)
const newCategoryName = ref('')
const debtStore = useDebtStore()

const openAddCategoryDialog = () => {
  showAddDialog.value = true
  newCategoryName.value = ''
}

const addCategory = () => {
  if (!newCategoryName.value.trim()) return;
  debtStore.addCategory(newCategoryName.value.trim())
  showAddDialog.value = false;
}
</script>

<template>

  <ModalApp :show="showAddDialog" @close="showAddDialog = false">
    <h2 class="modal-title"> Nova Categoria</h2>
    <input class="modal-title_input" v-model="newCategoryName" placeholder="Digite uma categoria" />
    <div class="modal-btn">
      <button class="modal-btn_cancel" @click="showAddDialog=false"> cancelar </button>
      <button class="modal-btn_accept" @click="addCategory">Adicionar</button>
    </div>
  </ModalApp>

  <ButtonApp class="btn-open_modal" @click="openAddCategoryDialog"> + </ButtonApp>
</template>

<style scoped>
.modal-btn {
  display: flex;
}

.modal-title {
  padding: 15px 10px 0;
}

.modal-title_input {
  padding: .8em;
  border-radius: 5px;
  margin: 10px 10px;
  border: none;
  font-size: 1em;
}

.btn-open_modal {
  background: var(--primary-bg);
}
</style>



