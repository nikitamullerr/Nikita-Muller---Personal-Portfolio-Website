<script setup>
import { usePortfolio } from "../../composables/usePortfolio.js";
import SkillGroup from "../cards/SkillGroup.vue";
import { skillGroups } from "../../data/portfolio.js";
const { t } = usePortfolio();

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
      <div
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
