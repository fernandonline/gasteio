import { ref, onMounted } from "vue";

export function useTheme() {
  const theme = ref<"light" | "dark">(localStorage.getItem("theme") as "light" | "dark" || "light");

  const setTheme = (newTheme: "light" | "dark") => {
    theme.value = newTheme;
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  }

  onMounted(() => {
    setTheme(theme.value);
  });

  return { theme, setTheme };
}
