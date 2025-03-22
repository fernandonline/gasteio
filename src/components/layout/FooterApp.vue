<script setup lang="ts">
  import GitHubIcon from '@/assets/svg/GitHub.vue'
</script>

<template>
  <div class="rodape">
      <GitHubIcon/>
      <span> / </span>
      <span> fernandonline </span>
  </div>
</template>

<style scoped>
.rodape {
  min-height: 8%;
  background: var(--primary-bg);
  width: 100%;
  color: var(--destaq-txt);
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.1em;
}

.rodape svg {
  width: .9em;
}

.rodape span {
  font-size: .7em;
}
</style>
