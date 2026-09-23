<script setup>
import { usePortfolio } from "../../composables/usePortfolio.js";
defineProps({ item: { type: Object, required: true } });
const { t } = usePortfolio();
</script>

<template>
  <article class="glass">
    <span class="eyebrow">{{ t(item.date) }}</span>
    <h3>{{ t(item.title) }}</h3>
    <h4>{{ t(item.place) }}</h4>
    <p>{{ t(item.text) }}</p>
  </article>
</template>
