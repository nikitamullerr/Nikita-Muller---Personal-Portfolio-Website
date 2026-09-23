<script setup>
import { usePortfolio } from "../../composables/usePortfolio.js";
const projectSearch = defineModel("search", { type: String, default: "" });
const selectedTechnology = defineModel("technology", {
  type: String,
  default: "All projects",
});
defineProps({
  technologyFilters: { type: Array, required: true },
  resultCount: { type: Number, required: true },
  totalCount: { type: Number, required: true },
});
const { t } = usePortfolio();
</script>

<template>
  <div class="project-controls">
    <label class="project-search">
      <span>{{ t("Search projects") }}</span>
      <input
        v-model="projectSearch"
        type="search"
        :placeholder="t('Search by project or technology')"
        aria-controls="project-results"
        autocomplete="off"
      />
    </label>
    <div
      class="filter-chips"
      role="group"
      :aria-label="t('Filter by technology')"
    >
      <button
        v-for="technology in technologyFilters"
        :key="technology"
        type="button"
        :aria-pressed="selectedTechnology === technology"
        @click="selectedTechnology = technology"
      >
        {{ t(technology) }}
      </button>
    </div>
    <p class="results-count" role="status">
      {{ resultCount }} / {{ totalCount }} {{ t("projects shown") }}
    </p>
  </div>
</template>
