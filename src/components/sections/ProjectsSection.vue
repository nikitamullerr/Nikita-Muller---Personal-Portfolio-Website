<script setup>
import { usePortfolio } from "../../composables/usePortfolio.js";
import ProjectCard from "../cards/ProjectCard.vue";
import ProjectFilters from "../projects/ProjectFilters.vue";
import { projects } from "../../data/portfolio.js";
import { useProjectFilters } from "../../composables/useProjectFilters.js";
const { t } = usePortfolio();
const {
  projectSearch,
  selectedTechnology,
  technologyFilters,
  filteredProjects,
  clearFilters,
} = useProjectFilters(t);
</script>

<template>
  <section id="portfolio" class="scene">
    <div class="section-inner projects-heading">
      <div class="section-copy">
        <p class="eyebrow">{{ t("04 / SELECTED WORK") }}</p>
        <h2>
          <span>{{ t("Selected") }}</span
          >{{ t("Projects") }}
        </h2>
        <p>
          {{
            t(
              "Putting business systems knowledge and development skills into practice through e-commerce, Python applications, data integration, and HR management.",
            )
          }}
        </p>
        <a
          class="text-link"
          href="https://github.com/nikitamullerr"
          target="_blank"
          rel="noopener noreferrer"
          >{{ t("Explore my GitHub") }} <span aria-hidden="true">↗</span></a
        >
      </div>
    </div>
    <div class="section-inner additional-projects">
      <ProjectFilters
        v-model:search="projectSearch"
        v-model:technology="selectedTechnology"
        :technology-filters="technologyFilters"
        :result-count="filteredProjects.length"
        :total-count="projects.length"
      />

      <TransitionGroup
        name="project"
        tag="div"
        id="project-results"
        class="projects-grid"
      >
        <ProjectCard
          v-for="project in filteredProjects"
          :key="project.url"
          :project="project"
        />
      </TransitionGroup>
      <div v-if="filteredProjects.length === 0" class="empty-projects glass">
        <p>
          {{ t("No projects found. Try another search or clear the filters.") }}
        </p>
        <button type="button" class="utility-button" @click="clearFilters">
          {{ t("Clear filters") }}
        </button>
      </div>
    </div>
  </section>
</template>
