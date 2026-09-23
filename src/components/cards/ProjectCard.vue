<script setup>
import { usePortfolio } from "../../composables/usePortfolio.js";
defineProps({ project: { type: Object, required: true } });
const { t } = usePortfolio();
</script>

<template>
  <article class="project-card glass repository-card">
    <a
      :href="project.url"
      target="_blank"
      rel="noopener noreferrer"
      :aria-label="
        t('View on GitHub') +
        ' - ' +
        project.title +
        ' (' +
        t('Opens in a new tab') +
        ')'
      "
    >
      <div class="repository-card-header">
        <span class="repository-icon" aria-hidden="true">{{
          project.icon
        }}</span>
        <span class="eyebrow">{{ t(project.category) }}</span>
        <span class="repository-arrow" aria-hidden="true">↗</span>
      </div>
      <div class="project-details">
        <h3>{{ project.title }}</h3>
        <p>{{ t(project.description) }}</p>
        <p class="project-role">{{ t(project.role) }}</p>
        <div class="project-tags">
          <span v-for="tag in project.tags" :key="tag">{{ t(tag) }}</span>
        </div>
        <span class="repository-link"
          >{{ t("View on GitHub") }} <span aria-hidden="true">↗</span></span
        >
      </div>
    </a>
  </article>
</template>
