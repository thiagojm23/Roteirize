import { reactive, ref } from "vue";

const stored = localStorage.getItem("roteirize-theme");
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
const isDark = ref(stored ? stored === "dark" : prefersDark);
document.documentElement.classList.toggle("dark", isDark.value);

export function useTheme() {
  function setTheme(dark: boolean) {
    isDark.value = dark;
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem("roteirize-theme", dark ? "dark" : "light");
  }

  function toggle() {
    setTheme(!isDark.value);
  }

  return reactive({ isDark, setTheme, toggle });
}
