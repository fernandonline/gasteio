<template>
  <button @click="toggleTheme">
    {{ theme === "dark" ? "🌙 Dark" : "☀️ Light" }}
  </button>
</template>

<script setup lang="ts">
import { useTheme } from "../../stores/useTheme";

const { theme, setTheme } = useTheme();

const toggleTheme = () => {
  setTheme(theme.value === "dark" ? "light" : "dark");
};
</script>

<style scoped>
button {
  padding: 10px;
  border: none;
  background: var(--bg-color);
  color: var(--text-color);
  cursor: pointer;
  font-size: 16px;
  border-radius: 5px;
}
</style>
