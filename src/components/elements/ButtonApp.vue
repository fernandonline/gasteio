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
  background-color: transparent;
  cursor: pointer;
}
</style>
