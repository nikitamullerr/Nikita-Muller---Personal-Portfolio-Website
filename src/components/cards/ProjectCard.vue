<script setup>
import { usePortfolio } from "../../composables/usePortfolio.js";
defineProps({
  project: { type: Object, required: true },
  rank: { type: Number, required: true },
});
const emit = defineEmits(["select"]);
const { t } = usePortfolio();
</script>

<template>
  <div class="ranked-project">
    <span class="project-rank" aria-hidden="true">{{ rank }}</span>
    <article class="project-card">
      <button
        class="project-poster"
        type="button"
        :aria-label="`${t('More Info')}: ${project.title}`"
        @click="emit('select', project)"
      >
        <img
          v-if="project.screenshot && !project.screenshot.startsWith('TODO:')"
          :src="project.screenshot"
          :alt="`${project.title} project screenshot`"
          loading="lazy"
          decoding="async"
        />
        <span v-else class="poster-fallback-title">{{ project.title }}</span>
        <span class="poster-category">{{ t(project.category) }}</span>
      </button>
      <div class="project-hover-panel">
        <div class="project-hover-copy">
          <h3>{{ project.title }}</h3>
          <p v-if="!project.tagline.startsWith('TODO:')" class="project-tagline">
            {{ t(project.tagline) }}
          </p>
          <div class="project-tags">
            <span v-for="tag in project.tags" :key="tag">{{ t(tag) }}</span>
          </div>
        </div>
        <div class="project-actions">
          <a
            v-if="project.liveUrl && !project.liveUrl.startsWith('TODO:')"
            class="poster-play"
            :href="project.liveUrl"
            target="_blank"
            rel="noopener noreferrer"
            :aria-label="`${t('Live demo')}: ${project.title} (${t('Opens in a new tab')})`"
            @click.stop
          >{{ t("Live demo") }} <span aria-hidden="true">↗</span></a>
          <a
            v-if="project.githubUrl && !project.githubUrl.startsWith('TODO:')"
            class="poster-more"
            :href="project.githubUrl"
            target="_blank"
            rel="noopener noreferrer"
            :aria-label="`${t('GitHub')}: ${project.title} (${t('Opens in a new tab')})`"
            @click.stop
          >{{ t("GitHub") }} <span aria-hidden="true">↗</span></a>
        </div>
      </div>
    </article>
  </div>
</template>
