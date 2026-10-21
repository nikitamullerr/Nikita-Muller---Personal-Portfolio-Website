<script setup>
import { usePortfolio } from "../../composables/usePortfolio.js";
defineProps({
  certificate: { type: Object, required: true },
  isNew: { type: Boolean, default: false },
});
const emit = defineEmits(["select"]);
const { t } = usePortfolio();
</script>

<template>
  <article class="certificate-card">
    <button
      class="certificate-poster"
      :class="`certificate-poster--${certificate.issuerKey}`"
      type="button"
      :aria-label="`${t('View details')}: ${t(certificate.title)}`"
      @click="emit('select', certificate)"
    >
      <img class="certificate-preview" :src="certificate.image" alt="" aria-hidden="true" />
      <span v-if="isNew" class="certificate-new-badge">{{ t("NEW") }}</span>
      <span class="certificate-monogram" aria-hidden="true">{{ certificate.issuerMonogram }}</span>
      <span class="certificate-poster-copy">
        <span class="certificate-poster-title">{{ t(certificate.title) }}</span>
        <span class="certificate-poster-issuer">
          {{ t(certificate.issuer) }} <span aria-hidden="true">·</span> {{ t(certificate.issueDate) }}
        </span>
      </span>
      <span class="certificate-category">{{ t(certificate.category) }}</span>
      <span class="certificate-view-details">{{ t("View details") }} <span aria-hidden="true">↗</span></span>
    </button>
  </article>
</template>
