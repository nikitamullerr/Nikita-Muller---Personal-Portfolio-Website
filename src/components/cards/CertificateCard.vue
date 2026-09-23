<script setup>
import { usePortfolio } from "../../composables/usePortfolio.js";
defineProps({ certificate: { type: Object, required: true } });
const { t } = usePortfolio();
</script>

<template>
  <article class="glass">
    <span class="certificate-icon" aria-hidden="true">✧</span>
    <div>
      <h3>{{ t(certificate.title) }}</h3>
      <p>{{ t(certificate.place) }}</p>
    </div>
    <span class="eyebrow">{{ t(certificate.date) }}</span>
  </article>
</template>
