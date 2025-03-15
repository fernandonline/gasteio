<script setup lang="ts">
import { defineProps, defineEmits } from "vue";

const { show } = defineProps<{ show: boolean }>();
const emit = defineEmits(["close"]);

</script>

<template>
  <div v-if="show" class="modal-overlay">
    <div class="modal-content">
      <slot></slot>
      <button @click="emit('close')">Fechar</button>
    </div>
  </div>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 8px;
}
</style>
