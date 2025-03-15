<script setup lang="ts">
import { defineProps, defineEmits } from "vue";

const props = defineProps<{
  disabled?: boolean;
}>();

const emit = defineEmits(["click"]);
</script>

<template>
  <button
    class="btn"
    type="button"
    :disabled="props.disabled"
    @click="emit('click')">
    <slot />
  </button>

</template>

<style scoped>
.btn {
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  transition: background-color 0.3s;
}
</style>
