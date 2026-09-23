<script setup>
import { usePortfolio } from "../../composables/usePortfolio.js";
defineProps({ technology: { type: Object, required: true } });
const { t } = usePortfolio();
</script>

<template>
  <article class="glass technology-card">
    <span class="tech-icon" aria-hidden="true">{{ technology.icon }}</span>
    <div>
      <h3>{{ t(technology.title) }}</h3>
      <p>{{ t(technology.text) }}</p>
    </div>
  </article>
</template>
