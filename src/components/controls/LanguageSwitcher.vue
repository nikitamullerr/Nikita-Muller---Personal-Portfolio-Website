<script setup>
import { usePortfolio } from "../../composables/usePortfolio.js";
const { t, languages, locale } = usePortfolio();
</script>

<template>
  <label class="language-control">
    <span class="sr-only">{{ t("Language") }}</span>
    <select v-model="locale" :aria-label="t('Language')">
      <option
        v-for="language in languages"
        :key="language.code"
        :value="language.code"
        :lang="language.code"
      >
        {{ language.label }}
      </option>
    </select>
  </label>
</template>
