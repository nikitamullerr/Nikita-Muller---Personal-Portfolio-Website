<script setup>
import { usePortfolio } from "../../composables/usePortfolio.js";
import JourneyTypeIcon from "./JourneyTypeIcon.vue";

defineProps({
  item: { type: Object, required: true },
  seasonNumber: { type: Number, default: 0 },
  isMostRecent: { type: Boolean, default: false },
});
const emit = defineEmits(["select"]);
const { t } = usePortfolio();

function badgeLabel(type) {
  if (type === "education") return t("EDU");
  return type === "volunteer" ? t("VOLUNTEER") : t("WORK");
}
</script>

<template>
  <article v-if="item.type === 'coming-soon'" class="season-card coming-soon-card">
    <div class="coming-soon-icon" aria-hidden="true">
      <JourneyTypeIcon :type="item.type" />
    </div>
    <h3>{{ t(item.title) }}</h3>
    <p>{{ t("The next chapter") }}</p>
  </article>
  <button
    v-else
    class="season-card"
    :class="`season-card-${item.type}`"
    type="button"
    :aria-label="`${t('More info')}: ${t(item.title)}`"
    @click="emit('select', item)"
  >
    <span class="season-poster">
      <span class="season-number" aria-hidden="true">S{{ seasonNumber }}</span>
      <JourneyTypeIcon :type="item.type" />
      <span v-if="isMostRecent" class="season-recent">{{ t("Most recent") }}</span>
    </span>
    <span class="season-card-content">
      <span class="season-metadata">
        <span>{{ t(item.dateRange) }}</span>
        <span class="season-type-badge">{{ badgeLabel(item.type) }}</span>
      </span>
      <span class="season-title">{{ t(item.title) }}</span>
      <span class="season-organisation">{{ t(item.organisation) }}</span>
      <span class="season-description">{{ t(item.description) }}</span>
      <span v-if="item.award" class="season-award-badge">
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M8 4h8v5a4 4 0 0 1-8 0V4Zm0 2H5v2a4 4 0 0 0 4 4m7-6h3v2a4 4 0 0 1-4 4m-3 1v4m-4 4h8m-6-4h4l2 4H8l2-4Z" />
        </svg>
        <span>{{ t(item.award) }}</span>
      </span>
      <span class="season-more-info">
        <span>{{ t("More info") }}</span>
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="m9 18 6-6-6-6" />
        </svg>
      </span>
    </span>
  </button>
</template>
