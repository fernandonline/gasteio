<script setup lang="ts">
import ModalApp from '../../components/elements/ModalApp.vue';
import { computed, ref } from 'vue';
import { useDebtStore } from '@/stores';
import ButtonApp from '../elements/ButtonApp.vue';

const currentDate = () => {
  const now = new Date()
  const year = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const day = String(now.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

const props = defineProps<{ category: { id: string } }>()
const debtStore = useDebtStore()
const showAddDebtDialog = ref(false)
const debtName = ref('')
const debtValue = ref('')
const debtDate = ref('')

const openAddDebtDialog = () => {
  showAddDebtDialog.value = true
  debtName.value = ''
  debtValue.value = ''
  debtDate.value = currentDate()
}

const formattedDebtValue = computed({
  get: () => {
    if (!debtValue.value) return ''
    const onlyNumbers = debtValue.value.replace(/\D/g, '')
    const numberValue = parseFloat(onlyNumbers) / 100
    return new Intl.NumberFormat('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(numberValue)
  },

  set: (newValue) => {
    debtValue.value = newValue.replace(/\D/g, '');
  }
})

const addDebt = () => {
  const amount = parseFloat(debtValue.value) / 100
  if (!debtName.value.trim()) {
    alert('Preencha um nome válido')
    return
  }
  debtStore.addDebt(props.category.id, debtName.value.trim(), amount, debtDate.value)
  showAddDebtDialog.value = false
}
</script>

<template>
  <ButtonApp class="btn-open_modal" @click="openAddDebtDialog"> + </ButtonApp>

  <ModalApp :show="showAddDebtDialog" @close="showAddDebtDialog = false">
    <h2 class="modal-title">Adicionar Gasto</h2>
    <input class="modal-title_input" v-model="debtName" placeholder="Titulo" />
    <input class="modal-title_input" v-model="formattedDebtValue" type="tel" inputmode="decimal" placeholder="R$"/>
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
