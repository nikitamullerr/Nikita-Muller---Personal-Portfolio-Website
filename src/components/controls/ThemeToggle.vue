<script setup>
import { usePortfolio } from "../../composables/usePortfolio.js";
const { theme, themeLabel, toggleTheme } = usePortfolio();
</script>

<template>
  <button
    class="theme-toggle"
    type="button"
    @click="toggleTheme"
    :aria-label="themeLabel"
    :title="themeLabel"
  >
    <svg
      v-if="theme === 'dark'"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="1.7"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="4" />
      <path
        d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5"
      />
    </svg>
    <svg
      v-else
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="1.7"
      aria-hidden="true"
    >
      <path d="M20.5 14a9 9 0 0 1-10.5-10.5A9 9 0 1 0 20.5 14Z" />
    </svg>
  </button>
</template>
