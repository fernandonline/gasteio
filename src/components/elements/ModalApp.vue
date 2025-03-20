<script setup lang="ts">
const props = defineProps<{ show: boolean }>()
</script>

<template>
  <div v-if="props.show" class="modal-overlay">
    <div class="modal-content">
      <slot></slot>
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
  background: var(--primary-bg);
  color: var(--destaq-txt);
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  gap: .5em
}
</style>
