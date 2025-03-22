<script setup lang="ts">
import { onMounted } from 'vue'

onMounted(() => {
  console.error(
    "404 Error: User attempted to access non-existent route"
  )
})
</script>

<template>
      <h2> 404 </h2>
      <p>Página não encontrada</p>
      <p>
        A página que você está procurando não existe ou foi removida.
      </p>
</template>
