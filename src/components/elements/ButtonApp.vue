<script setup lang="ts">
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
  border: none;
  padding: 8px 16px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;
}
</style>
