<script setup lang="ts">
const props = defineProps<{
  disabled?: boolean;
}>();

const emit = defineEmits(["click"]);
</script>

<template>
  <circle
    class="btn"
    type="button"
    :disabled="props.disabled"
    @click="emit('click')"
  >
    <slot />
  </circle>

</template>

<style scoped>

.btn {
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
