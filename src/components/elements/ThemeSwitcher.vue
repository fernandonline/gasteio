<script setup lang="ts">
import { useTheme } from "../../stores/useTheme";
import LightSun from "@/assets/svg/LightSun.vue";
import DarkMoon from "@/assets/svg/DarkMoon.vue";

const { theme, setTheme } = useTheme();

const toggleTheme = () => {
  setTheme(theme.value === "dark" ? "light" : "dark");
};
</script>

<template>
  <button @click="toggleTheme">
    <DarkMoon v-if="theme === 'dark'" />
    <LightSun v-else />
  </button>
</template>

<style scoped>
button {
  border: none;
  background: var(--primary-bg);
  color: var(--text-color);
  cursor: pointer;
}
</style>
