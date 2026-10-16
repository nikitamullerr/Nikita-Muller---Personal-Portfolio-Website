<script setup>
import { nextTick, ref } from "vue";
import { usePortfolio } from "../../composables/usePortfolio.js";
import ProjectCard from "../cards/ProjectCard.vue";
import { projects } from "../../data/portfolio.js";

const { t } = usePortfolio();
const carousel = ref(null);
const projectDialog = ref(null);
const closeButton = ref(null);
const selectedProject = ref(null);

function hasProjectValue(value) {
  return Boolean(value) && !value.startsWith("TODO:");
}

function scrollCarousel(direction) {
  const firstCard = carousel.value?.querySelector(".ranked-project");
  if (!firstCard) return;
  const gap = Number.parseFloat(getComputedStyle(carousel.value).columnGap) || 0;
  carousel.value.scrollBy({
    left: direction * (firstCard.getBoundingClientRect().width + gap),
    behavior: "smooth",
  });
}

async function openProject(project) {
  selectedProject.value = project;
  await nextTick();
  if (projectDialog.value && !projectDialog.value.open) {
    projectDialog.value.showModal();
    closeButton.value?.focus();
  }
}

function closeProject() {
  if (projectDialog.value?.open) projectDialog.value.close();
}
</script>

<template>
  <section id="portfolio" class="scene">
    <div class="section-inner projects-inner">
      <div class="projects-heading-row">
        <div class="section-copy">
          <p class="eyebrow">{{ t("TOP 5 · SELECTED WORK") }}</p>
          <h2>{{ t("Top 5 projects") }}</h2>
        </div>
        <div class="carousel-arrows">
          <a
            class="text-link"
            href="https://github.com/nikitamullerr"
            target="_blank"
            rel="noopener noreferrer"
          >{{ t("Explore my GitHub") }} <span aria-hidden="true">↗</span></a>
          <button type="button" :aria-label="t('Previous projects')" @click="scrollCarousel(-1)">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m15 18-6-6 6-6" /></svg>
          </button>
          <button type="button" :aria-label="t('Next projects')" @click="scrollCarousel(1)">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9 18 6-6-6-6" /></svg>
          </button>
        </div>
      </div>
      <div
        ref="carousel"
        id="project-results"
        class="projects-grid"
        tabindex="0"
        :aria-label="t('Top 5 projects carousel')"
      >
        <ProjectCard
          v-for="(project, index) in projects"
          :key="project.title"
          :project="project"
          :rank="index + 1"
          @select="openProject"
        />
      </div>
    </div>

    <dialog
      ref="projectDialog"
      class="project-dialog"
      :aria-labelledby="selectedProject ? 'project-dialog-title' : undefined"
      @click.self="closeProject"
      @keydown.esc.prevent="closeProject"
      @cancel.prevent="closeProject"
      @close="selectedProject = null"
    >
      <template v-if="selectedProject">
        <button
          ref="closeButton"
          class="dialog-close"
          type="button"
          :aria-label="t('Close project details')"
          @click="closeProject"
        >×</button>
        <img
          v-if="hasProjectValue(selectedProject.screenshot)"
          class="dialog-poster"
          :src="selectedProject.screenshot"
          :alt="`${selectedProject.title} project screenshot`"
          loading="lazy"
          decoding="async"
        />
        <div v-else class="dialog-poster project-dialog-fallback" aria-hidden="true">
          {{ selectedProject.title }}
        </div>
        <div class="dialog-content">
          <p class="eyebrow">{{ t(selectedProject.category) }}</p>
          <h2 id="project-dialog-title">{{ t(selectedProject.title) }}</h2>
          <p v-if="hasProjectValue(selectedProject.tagline)" class="dialog-description">
            {{ t(selectedProject.tagline) }}
          </p>
          <div class="dialog-meta">
            <span v-if="selectedProject.match">{{ selectedProject.match }} {{ t("match") }}</span>
            <span v-if="selectedProject.rating" class="rating-badge">{{ selectedProject.rating }}</span>
            <span v-if="selectedProject.role">{{ t(selectedProject.role) }}</span>
          </div>

          <section
            v-if="hasProjectValue(selectedProject.caseStudy.problem)"
            class="case-study-section"
          >
            <h3>{{ t("The problem") }}</h3>
            <p class="dialog-description">{{ t(selectedProject.caseStudy.problem) }}</p>
          </section>
          <section
            v-if="hasProjectValue(selectedProject.caseStudy.built)"
            class="case-study-section"
          >
            <h3>{{ t("What I built") }}</h3>
            <p class="dialog-description">{{ t(selectedProject.caseStudy.built) }}</p>
          </section>
          <section v-if="selectedProject.tags.length" class="case-study-section">
            <h3>{{ t("Tech") }}</h3>
            <div class="project-tags dialog-tags">
              <span v-for="tag in selectedProject.tags" :key="tag">{{ t(tag) }}</span>
            </div>
          </section>
          <section
            v-if="hasProjectValue(selectedProject.caseStudy.learned)"
            class="case-study-section"
          >
            <h3>{{ t("What I learned") }}</h3>
            <p class="dialog-description">{{ t(selectedProject.caseStudy.learned) }}</p>
          </section>

          <div class="dialog-actions">
            <a
              v-if="hasProjectValue(selectedProject.liveUrl)"
              class="poster-play"
              :href="selectedProject.liveUrl"
              target="_blank"
              rel="noopener noreferrer"
            >{{ t("Live demo") }} <span aria-hidden="true">↗</span></a>
            <a
              v-if="hasProjectValue(selectedProject.githubUrl)"
              class="poster-more"
              :href="selectedProject.githubUrl"
              target="_blank"
              rel="noopener noreferrer"
            >{{ t("GitHub") }} <span aria-hidden="true">↗</span></a>
          </div>
        </div>
      </template>
    </dialog>
  </section>
</template>
