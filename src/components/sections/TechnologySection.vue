<script setup>
import { ref } from "vue";
import { usePortfolio } from "../../composables/usePortfolio.js";
import SkillGroup from "../cards/SkillGroup.vue";
import { skillGroups } from "../../data/portfolio.js";
const { t } = usePortfolio();
const toolkitCarousel = ref(null);

function scrollToolkit(direction) {
  const firstCard = toolkitCarousel.value?.querySelector(".toolkit-card");
  if (!firstCard) return;
  const gap = Number.parseFloat(getComputedStyle(toolkitCarousel.value).columnGap) || 0;
  toolkitCarousel.value.scrollBy({
    left: direction * (firstCard.getBoundingClientRect().width + gap),
    behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ? "auto"
      : "smooth",
  });
}
</script>

<template>
  <section id="technology" data-nav="technology" class="scene toolkit-section">
    <div class="section-inner">
      <div class="section-heading-row">
        <div class="section-copy">
          <p class="eyebrow">{{ t("MY DEVELOPER TOOLKIT") }}</p>
          <h2>{{ t("My developer toolkit") }}</h2>
        </div>
        <p>{{ t("Always adding to the collection") }}</p>
      </div>
      <div class="carousel-arrows toolkit-arrows">
        <button type="button" :aria-label="t('Previous toolkit cards')" @click="scrollToolkit(-1)">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m15 18-6-6 6-6" /></svg>
        </button>
        <button type="button" :aria-label="t('Next toolkit cards')" @click="scrollToolkit(1)">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9 18 6-6-6-6" /></svg>
        </button>
      </div>
      <div
        ref="toolkitCarousel"
        class="toolkit-grid"
        tabindex="0"
        :aria-label="t('Developer toolkit carousel')"
      >
        <article
          v-for="(group, index) in skillGroups"
          :key="group.name"
          class="toolkit-card"
        >
          <span class="toolkit-symbol" aria-hidden="true">{{
            ["</>", ">_", "▤"][index]
          }}</span>
          <SkillGroup :group="group" />
        </article>
      </div>
    </div>
  </section>
</template>
